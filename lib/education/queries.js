import {
  assignmentsRef,
  lessonsRef,
  modulesRef,
  progressRef,
} from '@/lib/education/paths';
import { getFirstLesson } from '@/lib/education/unlock';

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {string} courseId
 */
export async function getOrderedLessons(db, courseId) {
  const modulesSnap = await modulesRef(db, courseId).orderBy('order', 'asc').get();
  const ordered = [];

  for (const moduleDoc of modulesSnap.docs) {
    const lessonsSnap = await lessonsRef(db, courseId, moduleDoc.id)
      .orderBy('order', 'asc')
      .get();

    lessonsSnap.docs.forEach((lessonDoc) => {
      ordered.push({
        moduleId: moduleDoc.id,
        moduleOrder: moduleDoc.data().order ?? 0,
        lessonId: lessonDoc.id,
        order: lessonDoc.data().order ?? 0,
        ...lessonDoc.data(),
      });
    });
  }

  return ordered.sort((a, b) => {
    if (a.moduleOrder !== b.moduleOrder) return a.moduleOrder - b.moduleOrder;
    return a.order - b.order;
  });
}

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {string} userId
 * @param {string} courseId
 */
export async function getOrCreateProgress(db, userId, courseId) {
  const ref = progressRef(db, userId, courseId);
  const snap = await ref.get();

  if (snap.exists) {
    return { id: snap.id, ...snap.data() };
  }

  const ordered = await getOrderedLessons(db, courseId);
  const first = getFirstLesson(
    ordered.map((l) => ({
      moduleId: l.moduleId,
      lessonId: l.lessonId,
      order: l.order,
      moduleOrder: l.moduleOrder,
    }))
  );

  const initial = {
    courseId,
    completedLessonIds: [],
    unlockedLessonIds: first ? [first.lessonId] : [],
    currentLessonId: first?.lessonId || null,
    updatedAt: new Date(),
  };

  await ref.set(initial);
  return initial;
}

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {string} courseId
 * @param {string} userId
 * @param {string} lessonId
 */
export async function getUserAssignment(db, courseId, userId, lessonId) {
  const snap = await assignmentsRef(db, courseId)
    .where('userId', '==', userId)
    .where('lessonId', '==', lessonId)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}
