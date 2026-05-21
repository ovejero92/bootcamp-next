'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { listModules } from '@/app/actions/modules';
import { listLessons, getLesson } from '@/app/actions/lessons';
import { getCourseProgress } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';
import CourseOutline from '@/components/education/CourseOutline';
import LessonViewer from '@/components/student/LessonViewer';

export default function LeccionPage() {
  const { courseId, moduleId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessonsByModule, setLessonsByModule] = useState({});
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const idToken = await getIdToken();
        const [lessonData, mods, prog] = await Promise.all([
          getLesson({ idToken, courseId, moduleId, lessonId }),
          listModules({ idToken, courseId }),
          getCourseProgress({ idToken, courseId }),
        ]);
        setLesson(lessonData);
        setModules(mods);
        setProgress(prog);

        const lessonsMap = {};
        for (const mod of mods) {
          lessonsMap[mod.id] = await listLessons({
            idToken,
            courseId,
            moduleId: mod.id,
          });
        }
        setLessonsByModule(lessonsMap);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, moduleId, lessonId]);

  if (loading) return <p className="p-5 text-white">Cargando lección...</p>;
  if (!lesson) {
    return (
      <p className="p-5 text-white">
        Lección no encontrada.{' '}
        <Link href={`/plataforma/cursos/${courseId}`} className="text-lime-300 underline">
          Volver al curso
        </Link>
      </p>
    );
  }

  const unlocked = (progress?.unlockedLessonIds || []).includes(lessonId);

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gray-950 p-5 md:flex-row">
      <aside className="w-full md:w-72">
        <Link href={`/plataforma/cursos/${courseId}`} className="text-sm text-lime-300">
          ← Volver
        </Link>
        <CourseOutline
          courseId={courseId}
          modules={modules}
          lessonsByModule={lessonsByModule}
          unlockedLessonIds={progress?.unlockedLessonIds || []}
          completedLessonIds={progress?.completedLessonIds || []}
          activeLessonId={lessonId}
        />
      </aside>
      <main className="flex-1 rounded-lg bg-gray-900 p-6">
        <LessonViewer
          courseId={courseId}
          moduleId={moduleId}
          lesson={lesson}
          unlocked={unlocked}
        />
      </main>
    </div>
  );
}
