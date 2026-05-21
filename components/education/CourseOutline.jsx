'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export default function CourseOutline({
  courseId,
  modules,
  lessonsByModule,
  unlockedLessonIds = [],
  completedLessonIds = [],
  activeLessonId,
}) {
  return (
    <nav className="space-y-4">
      {modules.map((mod) => (
        <div key={mod.id}>
          <h3 className="font-bold text-lime-200">{mod.title}</h3>
          <ul className="mt-2 space-y-1">
            {(lessonsByModule[mod.id] || []).map((lesson) => {
              const unlocked = unlockedLessonIds.includes(lesson.id);
              const completed = completedLessonIds.includes(lesson.id);
              const active = activeLessonId === lesson.id;

              return (
                <li key={lesson.id}>
                  <Link
                    href={
                      unlocked
                        ? `/plataforma/cursos/${courseId}/leccion/${mod.id}/${lesson.id}`
                        : '#'
                    }
                    className={cn(
                      'block rounded px-2 py-1 text-sm',
                      active && 'bg-violet-700 text-white',
                      !active && unlocked && 'text-gray-200 hover:bg-gray-700',
                      !unlocked && 'cursor-not-allowed text-gray-500'
                    )}
                  >
                    {completed ? '✓ ' : unlocked ? '○ ' : '🔒 '}
                    {lesson.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
