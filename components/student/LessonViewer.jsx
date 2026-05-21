'use client';

import { useTransition } from 'react';
import { markTextOrVideoComplete } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';
import AssignmentSubmit from './AssignmentSubmit';

function VideoEmbed({ url }) {
  if (!url) return null;
  let embedUrl = url;
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v');
    embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes('vimeo.com')) {
    const id = url.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${id}`;
  }

  return (
    <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        title="Video de la lección"
        className="h-full w-full"
        allowFullScreen
      />
    </div>
  );
}

function MarkdownContent({ content }) {
  return (
    <div className="prose prose-invert mt-4 max-w-none whitespace-pre-wrap text-gray-100">
      {content}
    </div>
  );
}

export default function LessonViewer({ courseId, moduleId, lesson, unlocked }) {
  const [pending, startTransition] = useTransition();

  if (!unlocked) {
    return (
      <div className="rounded-lg border border-gray-600 bg-gray-800 p-6 text-center text-gray-300">
        🔒 Completá la lección anterior para desbloquear este contenido.
      </div>
    );
  }

  const handleComplete = () => {
    startTransition(async () => {
      const idToken = await getIdToken();
      await markTextOrVideoComplete({ idToken, courseId, lessonId: lesson.id });
    });
  };

  return (
    <article>
      <h2 className="text-2xl font-black text-white">{lesson.title}</h2>
      <span className="mt-2 inline-block rounded bg-violet-700 px-2 py-0.5 text-xs uppercase text-white">
        {lesson.type}
      </span>

      {lesson.type === 'texto' && <MarkdownContent content={lesson.content} />}
      {lesson.type === 'video' && <VideoEmbed url={lesson.videoUrl} />}
      {lesson.type === 'proyecto' && (
        <>
          <div className="prose prose-invert mt-4 whitespace-pre-wrap text-gray-200">
            {lesson.projectDescription}
          </div>
          <AssignmentSubmit
            courseId={courseId}
            moduleId={moduleId}
            lessonId={lesson.id}
          />
        </>
      )}

      {(lesson.type === 'texto' || lesson.type === 'video') && (
        <button
          type="button"
          onClick={handleComplete}
          disabled={pending}
          className="mt-6 rounded-md bg-lime-400 px-6 py-2 font-semibold text-gray-900 disabled:opacity-50"
        >
          {pending ? 'Guardando...' : 'Marcar como completada'}
        </button>
      )}
    </article>
  );
}
