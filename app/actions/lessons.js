'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/firebase/admin';
import { requireUser, requireRole } from '@/lib/auth/server';
import { lessonsRef } from '@/lib/education/paths';

/**
 * @param {Object} params
 * @param {'texto' | 'video' | 'proyecto'} params.type
 */
export async function createLesson({
  idToken,
  courseId,
  moduleId,
  title,
  type,
  content,
  videoUrl,
  projectDescription,
  order,
}) {
  const user = await requireUser(idToken);
  requireRole(user, ['profesor', 'admin']);

  const db = getAdminDb();
  const ref = lessonsRef(db, courseId, moduleId).doc();

  await ref.set({
    courseId,
    moduleId,
    title,
    type,
    content: content || '',
    videoUrl: videoUrl || '',
    projectDescription: projectDescription || '',
    order: order ?? Date.now(),
    createdAt: FieldValue.serverTimestamp(),
  });

  return { success: true, lessonId: ref.id };
}

export async function listLessons({ idToken, courseId, moduleId }) {
  await requireUser(idToken);
  const db = getAdminDb();
  const snap = await lessonsRef(db, courseId, moduleId).orderBy('order', 'asc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getLesson({ idToken, courseId, moduleId, lessonId }) {
  await requireUser(idToken);
  const db = getAdminDb();
  const snap = await lessonsRef(db, courseId, moduleId).doc(lessonId).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}
