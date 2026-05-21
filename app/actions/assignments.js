'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/firebase/admin';
import { requireUser, requireRole } from '@/lib/auth/server';
import { assignmentsRef, progressRef } from '@/lib/education/paths';
import { getOrCreateProgress, getOrderedLessons, getUserAssignment } from '@/lib/education/queries';
import { getNextLesson, isLessonUnlocked } from '@/lib/education/unlock';

export async function submitAssignment({
  idToken,
  courseId,
  moduleId,
  lessonId,
  submissionUrl,
}) {
  const user = await requireUser(idToken);

  if (!submissionUrl?.trim()) {
    throw new Error('Debés ingresar la URL de tu proyecto');
  }

  const db = getAdminDb();
  const progress = await getOrCreateProgress(db, user.uid, courseId);

  if (!isLessonUnlocked(progress.unlockedLessonIds || [], lessonId)) {
    throw new Error('Esta lección aún no está desbloqueada');
  }

  const existing = await getUserAssignment(db, courseId, user.uid, lessonId);
  if (existing && existing.status === 'pending') {
    return { success: true, assignmentId: existing.id, status: 'pending' };
  }
  if (existing && existing.status === 'approved') {
    return { success: true, assignmentId: existing.id, status: 'approved' };
  }

  const ref = assignmentsRef(db, courseId).doc();
  await ref.set({
    courseId,
    moduleId,
    lessonId,
    userId: user.uid,
    userEmail: user.email,
    submissionUrl: submissionUrl.trim(),
    status: 'pending',
    submittedAt: FieldValue.serverTimestamp(),
    feedback: null,
  });

  return { success: true, assignmentId: ref.id, status: 'pending' };
}

export async function getAssignmentForLesson({ idToken, courseId, lessonId }) {
  const user = await requireUser(idToken);
  const db = getAdminDb();
  return getUserAssignment(db, courseId, user.uid, lessonId);
}

export async function listPendingAssignments({ idToken, courseId }) {
  const user = await requireUser(idToken);
  requireRole(user, ['profesor', 'admin']);

  const db = getAdminDb();
  const snap = await assignmentsRef(db, courseId)
    .where('status', '==', 'pending')
    .orderBy('submittedAt', 'desc')
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function gradeAssignment({
  idToken,
  courseId,
  assignmentId,
  status,
  feedbackText,
}) {
  const user = await requireUser(idToken);
  requireRole(user, ['profesor', 'admin']);

  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('Estado de corrección inválido');
  }

  const db = getAdminDb();
  const assignmentRef = assignmentsRef(db, courseId).doc(assignmentId);
  const assignmentSnap = await assignmentRef.get();

  if (!assignmentSnap.exists) {
    throw new Error('Entrega no encontrada');
  }

  const assignment = assignmentSnap.data();

  await assignmentRef.update({
    status,
    reviewedAt: FieldValue.serverTimestamp(),
    feedback: {
      text: feedbackText || '',
      reviewedBy: user.uid,
      reviewedAt: new Date().toISOString(),
    },
  });

  if (status === 'approved') {
    const ordered = await getOrderedLessons(db, courseId);
    const flat = ordered.map((l) => ({
      moduleId: l.moduleId,
      lessonId: l.lessonId,
      order: l.order,
      moduleOrder: l.moduleOrder,
    }));

    const next = getNextLesson(flat, assignment.lessonId);
    const progressRefDoc = progressRef(db, assignment.userId, courseId);
    const progressSnap = await progressRefDoc.get();
    const progress = progressSnap.exists
      ? progressSnap.data()
      : { unlockedLessonIds: [], completedLessonIds: [] };

    const completed = new Set(progress.completedLessonIds || []);
    completed.add(assignment.lessonId);

    const unlocked = new Set(progress.unlockedLessonIds || []);
    unlocked.add(assignment.lessonId);
    if (next) {
      unlocked.add(next.lessonId);
    }

    await progressRefDoc.set(
      {
        courseId,
        completedLessonIds: Array.from(completed),
        unlockedLessonIds: Array.from(unlocked),
        currentLessonId: next?.lessonId || assignment.lessonId,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  return { success: true, status };
}

export async function markTextOrVideoComplete({ idToken, courseId, lessonId }) {
  const user = await requireUser(idToken);
  const db = getAdminDb();
  const progress = await getOrCreateProgress(db, user.uid, courseId);

  if (!isLessonUnlocked(progress.unlockedLessonIds || [], lessonId)) {
    throw new Error('Lección bloqueada');
  }

  const ordered = await getOrderedLessons(db, courseId);
  const flat = ordered.map((l) => ({
    moduleId: l.moduleId,
    lessonId: l.lessonId,
    order: l.order,
    moduleOrder: l.moduleOrder,
  }));

  const next = getNextLesson(flat, lessonId);
  const completed = new Set(progress.completedLessonIds || []);
  completed.add(lessonId);

  const unlocked = new Set(progress.unlockedLessonIds || []);
  unlocked.add(lessonId);
  if (next) unlocked.add(next.lessonId);

  await progressRef(db, user.uid, courseId).set(
    {
      completedLessonIds: Array.from(completed),
      unlockedLessonIds: Array.from(unlocked),
      currentLessonId: next?.lessonId || lessonId,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return { success: true };
}

export async function getCourseProgress({ idToken, courseId }) {
  const user = await requireUser(idToken);
  const db = getAdminDb();
  return getOrCreateProgress(db, user.uid, courseId);
}
