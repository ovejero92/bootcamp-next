'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listCourses } from '@/app/actions/courses';
import { getIdToken } from '@/lib/auth/client-token';
import { useAuthContext } from '@/app/components/context/AuthContext';

export default function MisCursosPage() {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const idToken = await getIdToken();
        const data = await listCourses({ idToken, includeDrafts: false });
        setCourses(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (user?.logged) load();
  }, [user]);

  if (loading) {
    return <p className="p-5">Cargando cursos...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-xl font-black">Mis cursos</h1>
      <p className="mt-1 text-gray-600">Accedé al contenido de tu bootcamp</p>

      {courses.length === 0 ? (
        <p className="mt-6 text-gray-500">
          Todavía no hay cursos publicados. Tu profesor debe crear y publicar contenido.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/plataforma/cursos/${course.id}`}
                className="block rounded-lg border border-violet-300 bg-gray-800 p-4 text-white hover:bg-gray-700"
              >
                <h2 className="font-bold">{course.title}</h2>
                <p className="mt-1 text-sm text-gray-300">{course.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
