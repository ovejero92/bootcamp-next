'use client';

import { useState, useTransition } from 'react';
import { gradeAssignment } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';

export default function AssignmentReview({ courseId, assignment, onGraded }) {
  const [feedback, setFeedback] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const submit = (status) => {
    setError('');
    startTransition(async () => {
      try {
        const idToken = await getIdToken();
        await gradeAssignment({
          idToken,
          courseId,
          assignmentId: assignment.id,
          status,
          feedbackText: feedback,
        });
        onGraded?.();
      } catch (e) {
        setError(e.message || 'Error al calificar');
      }
    });
  };

  return (
    <div className="rounded-lg border border-gray-600 bg-white p-4 shadow">
      <p className="text-sm text-gray-500">{assignment.userEmail}</p>
      <a
        href={assignment.submissionUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 block text-blue-600 underline"
      >
        Ver entrega
      </a>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Escribí tu feedback..."
        className="mt-3 w-full rounded border p-2 text-sm"
        rows={3}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => submit('approved')}
          className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Aprobar
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => submit('rejected')}
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
