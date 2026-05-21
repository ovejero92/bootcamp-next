'use client';

import { useState, useTransition } from 'react';
import { createCourse } from '@/app/actions/courses';
import { createModule } from '@/app/actions/modules';
import { createLesson } from '@/app/actions/lessons';
import { getIdToken } from '@/lib/auth/client-token';

export default function CourseBuilder({ onCreated }) {
  const [step, setStep] = useState('course');
  const [courseId, setCourseId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  const [courseForm, setCourseForm] = useState({ title: '', description: '', published: true });
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', order: 1 });
  const [lessonForm, setLessonForm] = useState({
    title: '',
    type: 'texto',
    content: '',
    videoUrl: '',
    projectDescription: '',
    order: 1,
  });

  const run = (fn) => {
    setError('');
    startTransition(async () => {
      try {
        const idToken = await getIdToken();
        await fn(idToken);
      } catch (e) {
        setError(e.message || 'Error');
      }
    });
  };

  return (
    <div className="max-w-xl space-y-6">
      {error && <p className="text-red-600">{error}</p>}

      {step === 'course' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(async (idToken) => {
              const res = await createCourse({ idToken, ...courseForm });
              setCourseId(res.courseId);
              setStep('module');
            });
          }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold">1. Crear curso</h3>
          <input
            className="w-full rounded border p-2"
            placeholder="Título del curso"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <textarea
            className="w-full rounded border p-2"
            placeholder="Descripción"
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={courseForm.published}
              onChange={(e) => setCourseForm({ ...courseForm, published: e.target.checked })}
            />
            Publicado (visible para estudiantes)
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-indigo-900 px-4 py-2 text-white"
          >
            Crear curso
          </button>
        </form>
      )}

      {step === 'module' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(async (idToken) => {
              const res = await createModule({
                idToken,
                courseId,
                ...moduleForm,
                order: Number(moduleForm.order),
              });
              setModuleId(res.moduleId);
              setStep('lesson');
            });
          }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold">2. Crear módulo</h3>
          <input
            className="w-full rounded border p-2"
            placeholder="Título del módulo"
            value={moduleForm.title}
            onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
            required
          />
          <input
            type="number"
            className="w-full rounded border p-2"
            placeholder="Orden"
            value={moduleForm.order}
            onChange={(e) => setModuleForm({ ...moduleForm, order: e.target.value })}
          />
          <button type="submit" disabled={pending} className="rounded bg-indigo-900 px-4 py-2 text-white">
            Crear módulo
          </button>
        </form>
      )}

      {step === 'lesson' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(async (idToken) => {
              await createLesson({
                idToken,
                courseId,
                moduleId,
                ...lessonForm,
                order: Number(lessonForm.order),
              });
              onCreated?.(courseId);
              setLessonForm({
                title: '',
                type: 'texto',
                content: '',
                videoUrl: '',
                projectDescription: '',
                order: Number(lessonForm.order) + 1,
              });
            });
          }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold">3. Crear lección</h3>
          <input
            className="w-full rounded border p-2"
            placeholder="Título de la lección"
            value={lessonForm.title}
            onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            required
          />
          <select
            className="w-full rounded border p-2"
            value={lessonForm.type}
            onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value })}
          >
            <option value="texto">Texto (Markdown)</option>
            <option value="video">Video (YouTube/Vimeo)</option>
            <option value="proyecto">Proyecto (entrega)</option>
          </select>
          {lessonForm.type === 'texto' && (
            <textarea
              className="h-40 w-full rounded border p-2 font-mono text-sm"
              placeholder="Contenido en Markdown"
              value={lessonForm.content}
              onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
            />
          )}
          {lessonForm.type === 'video' && (
            <input
              className="w-full rounded border p-2"
              placeholder="URL del video"
              value={lessonForm.videoUrl}
              onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
            />
          )}
          {lessonForm.type === 'proyecto' && (
            <textarea
              className="h-32 w-full rounded border p-2"
              placeholder="Descripción del proyecto"
              value={lessonForm.projectDescription}
              onChange={(e) => setLessonForm({ ...lessonForm, projectDescription: e.target.value })}
            />
          )}
          <button type="submit" disabled={pending} className="rounded bg-green-700 px-4 py-2 text-white">
            Agregar lección
          </button>
          <p className="text-sm text-gray-500">
            Podés agregar más lecciones al mismo módulo. Cuando termines, andá a Entregas para corregir proyectos.
          </p>
        </form>
      )}
    </div>
  );
}
