export const COLLECTIONS = {
  courses: 'courses',
  modules: 'modules',
  lessons: 'lessons',
  assignments: 'assignments',
  users: 'usuarios',
  progress: 'courseProgress',
};

export function courseRef(db, courseId) {
  return db.collection(COLLECTIONS.courses).doc(courseId);
}

export function modulesRef(db, courseId) {
  return courseRef(db, courseId).collection(COLLECTIONS.modules);
}

export function lessonsRef(db, courseId, moduleId) {
  return modulesRef(db, courseId).doc(moduleId).collection(COLLECTIONS.lessons);
}

export function assignmentsRef(db, courseId) {
  return courseRef(db, courseId).collection(COLLECTIONS.assignments);
}

export function progressRef(db, userId, courseId) {
  return db
    .collection(COLLECTIONS.users)
    .doc(userId)
    .collection(COLLECTIONS.progress)
    .doc(courseId);
}
