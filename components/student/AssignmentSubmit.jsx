'use client';

import { useEffect, useState, useTransition } from 'react';
import { getAssignmentForLesson, submitAssignment } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';
import { cn } from '@/lib/utils/cn';

const STATUS_LABELS = {
  pending: 'Entregado — pendiente de revisión',
  approved: 'Aprobado',
  rejected: 'Rechazado — podés volver a entregar',
};

export default function AssignmentSubmit({ courseId, moduleId, lessonId }) {
  const [url, setUrl] = useState('');
  const [assignment, setAssignment] = useState(null);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    async function load() {
      try {
        const idToken = await getIdToken();
        const data = await getAssignmentForLesson({ idToken, courseId, lessonId });
        setAssignment(data);
        if (data?.submissionUrl) setUrl(data.submissionUrl);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [courseId, lessonId]);

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      try {
        const idToken = await getIdToken();
        const result = await submitAssignment({
          idToken,
          courseId,
          moduleId,
          lessonId,
          submissionUrl: url,
        });
        setAssignment({ status: result.status, submissionUrl: url });
      } catch (e) {
        setError(e.message || 'Error al entregar');
      }
    });
  };

  const status = assignment?.status;
  const isLocked = status === 'pending' || status === 'approved';

  return (
    <div className="mt-6 rounded-lg border border-violet-400/40 bg-gray-900 p-5">
      <h3 className="text-lg font-bold text-lime-200">Entrega del proyecto</h3>
      <p className="mt-1 text-sm text-gray-300">
        Pegá la URL de tu repositorio (GitHub, GitLab, Vercel, etc.)
      </p>

      {status && (
        <p
          className={cn(
            'mt-3 rounded px-3 py-2 text-sm font-medium',
            status === 'approved' && 'bg-green-900/50 text-green-200',
            status === 'pending' && 'bg-amber-900/50 text-amber-200',
            status === 'rejected' && 'bg-red-900/50 text-red-200'
          )}
        >
          {STATUS_LABELS[status]}
        </p>
      )}

      {assignment?.feedback?.text && (
        <div className="mt-3 rounded bg-gray-800 p-3 text-sm text-white">
          <p className="font-semibold text-violet-300">Feedback del profesor:</p>
          <p className="mt-1 whitespace-pre-wrap">{assignment.feedback.text}</p>
        </div>
      )}

      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLocked || pending}
        placeholder="https://github.com/tu-usuario/tu-proyecto"
        className="mt-4 w-full rounded border border-gray-600 bg-gray-800 p-3 text-white disabled:opacity-60"
      />

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLocked || pending || !url.trim()}
        className="mt-4 w-full rounded-md bg-lime-400 px-4 py-2 font-semibold text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? 'Enviando...' : 'Entregar'}
      </button>
    </div>
  );
}
