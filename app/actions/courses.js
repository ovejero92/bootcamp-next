'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/firebase/admin';
import { requireUser, requireRole } from '@/lib/auth/server';
import { COLLECTIONS } from '@/lib/education/paths';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Crea un curso educativo (bootcamp).
 */
export async function createCourse({ idToken, title, description, published = false }) {
  const user = await requireUser(idToken);
  requireRole(user, ['profesor', 'admin']);

  const db = getAdminDb();
  const ref = db.collection(COLLECTIONS.courses).doc();
  const now = FieldValue.serverTimestamp();

  await ref.set({
    title,
    description: description || '',
    slug: slugify(title),
    published,
    createdBy: user.uid,
    order: Date.now(),
    createdAt: now,
    updatedAt: now,
  });

  return { success: true, courseId: ref.id };
}

/**
 * Lista cursos publicados o todos (admin/profesor).
 */
export async function listCourses({ idToken, includeDrafts = false }) {
  const user = await requireUser(idToken);
  const db = getAdminDb();

  if (includeDrafts) {
    requireRole(user, ['profesor', 'admin']);
  }

  let query = db.collection(COLLECTIONS.courses).orderBy('order', 'desc');

  if (!includeDrafts) {
    query = query.where('published', '==', true);
  }

  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
