'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/firebase/admin';
import { requireUser, requireRole } from '@/lib/auth/server';
import { modulesRef } from '@/lib/education/paths';

export async function createModule({ idToken, courseId, title, description, order }) {
  const user = await requireUser(idToken);
  requireRole(user, ['profesor', 'admin']);

  const db = getAdminDb();
  const ref = modulesRef(db, courseId).doc();

  await ref.set({
    courseId,
    title,
    description: description || '',
    order: order ?? Date.now(),
    createdAt: FieldValue.serverTimestamp(),
  });

  return { success: true, moduleId: ref.id };
}

export async function listModules({ idToken, courseId }) {
  await requireUser(idToken);
  const db = getAdminDb();
  const snap = await modulesRef(db, courseId).orderBy('order', 'asc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
