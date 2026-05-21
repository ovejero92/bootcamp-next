'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { listPendingAssignments } from '@/app/actions/assignments';
import { getIdToken } from '@/lib/auth/client-token';
import AssignmentReview from '@/components/teacher/AssignmentReview';

export default function EntregasPage() {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const idToken = await getIdToken();
      const data = await listPendingAssignments({ idToken, courseId });
      setAssignments(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  return (
    <div className="container m-auto mt-6 max-w-2xl px-4">
      <Link href="/admin/educacion" className="text-blue-600 underline">
        ← Volver a cursos
      </Link>
      <h2 className="mt-4 text-2xl font-bold">Entregas pendientes</h2>
      {error && <p className="mt-2 text-red-600">{error}</p>}

      <div className="mt-6 space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500">No hay entregas pendientes.</p>
        ) : (
          assignments.map((a) => (
            <AssignmentReview
              key={a.id}
              courseId={courseId}
              assignment={a}
              onGraded={load}
            />
          ))
        )}
      </div>
    </div>
  );
}
