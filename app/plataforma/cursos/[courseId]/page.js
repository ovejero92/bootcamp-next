'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { listModules } from '@/app/actions/modules';
import { listLessons } from '@/app/actions/lessons';
import { getCourseProgress } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';
import CourseOutline from '@/components/education/CourseOutline';
import Link from 'next/link';

export default function CursoPlataformaPage() {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [lessonsByModule, setLessonsByModule] = useState({});
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const idToken = await getIdToken();
        const mods = await listModules({ idToken, courseId });
        setModules(mods);

        const lessonsMap = {};
        for (const mod of mods) {
          lessonsMap[mod.id] = await listLessons({
            idToken,
            courseId,
            moduleId: mod.id,
          });
        }
        setLessonsByModule(lessonsMap);

        const prog = await getCourseProgress({ idToken, courseId });
        setProgress(prog);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  if (loading) return <p className="p-5 text-white">Cargando curso...</p>;

  const firstUnlocked = progress?.currentLessonId;
  let startLink = null;
  if (firstUnlocked) {
    for (const mod of modules) {
      const lesson = (lessonsByModule[mod.id] || []).find((l) => l.id === firstUnlocked);
      if (lesson) {
        startLink = `/plataforma/cursos/${courseId}/leccion/${mod.id}/${lesson.id}`;
        break;
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gray-950 p-5 md:flex-row">
      <aside className="w-full md:w-72 md:shrink-0">
        <h1 className="text-lg font-black text-white">Contenido del curso</h1>
        <CourseOutline
          courseId={courseId}
          modules={modules}
          lessonsByModule={lessonsByModule}
          unlockedLessonIds={progress?.unlockedLessonIds || []}
          completedLessonIds={progress?.completedLessonIds || []}
          activeLessonId={progress?.currentLessonId}
        />
      </aside>
      <main className="flex-1 rounded-lg bg-gray-900 p-6 text-white">
        <h2 className="text-2xl font-black">Bienvenido al aula</h2>
        <p className="mt-2 text-gray-300">
          Elegí una lección del menú o continuá donde lo dejaste.
        </p>
        {startLink && (
          <Link
            href={startLink}
            className="mt-6 inline-block rounded-md bg-lime-400 px-6 py-2 font-semibold text-gray-900"
          >
            Continuar lección
          </Link>
        )}
      </main>
    </div>
  );
}
