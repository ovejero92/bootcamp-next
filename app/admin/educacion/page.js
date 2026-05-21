'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listCourses } from '@/app/actions/courses';
import { getIdToken } from '@/lib/auth/client-token';
import CourseBuilder from '@/components/admin/education/CourseBuilder';

export default function EducacionAdminPage() {
  const [courses, setCourses] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [authNote, setAuthNote] = useState('');

  const reloadCourses = async () => {
    try {
      const idToken = await getIdToken();
      const data = await listCourses({ idToken, includeDrafts: true });
      setCourses(data);
      setAuthNote('');
    } catch (e) {
      setAuthNote(
        'Iniciá sesión en la plataforma (misma sesión Firebase) con un usuario que tenga rol "admin" o "profesor" en Firestore (campo rol).'
      );
    }
  };

  useEffect(() => {
    reloadCourses();
  }, []);

  return (
    <div className="container m-auto mt-6 max-w-3xl px-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl">Educación — Cursos del bootcamp</h2>
        <Link href="/admin" className="text-blue-600 underline">
          ← Panel admin
        </Link>
      </div>

      {authNote && <p className="mt-4 rounded bg-amber-100 p-3 text-sm">{authNote}</p>}

      <button
        type="button"
        onClick={() => setShowBuilder(!showBuilder)}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        {showBuilder ? 'Ocultar creador' : '+ Crear curso / módulo / lección'}
      </button>

      {showBuilder && (
        <div className="mt-6">
          <CourseBuilder
            onCreated={() => {
              setShowBuilder(false);
              reloadCourses();
            }}
          />
        </div>
      )}

      <ul className="mt-8 space-y-3">
        {courses.map((c) => (
          <li key={c.id} className="flex items-center justify-between rounded border p-4">
            <div>
              <p className="font-bold">{c.title}</p>
              <p className="text-sm text-gray-500">{c.published ? 'Publicado' : 'Borrador'}</p>
            </div>
            <Link
              href={`/admin/educacion/${c.id}/entregas`}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Ver entregas
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
