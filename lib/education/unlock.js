/**
 * Ordena lecciones por módulo y devuelve la siguiente lección a desbloquear.
 * @param {{ moduleId: string, lessonId: string, order: number, moduleOrder: number }[]} orderedLessons
 * @param {string} currentLessonId
 */
export function getNextLesson(orderedLessons, currentLessonId) {
  const index = orderedLessons.findIndex((l) => l.lessonId === currentLessonId);
  if (index === -1 || index >= orderedLessons.length - 1) {
    return null;
  }
  return orderedLessons[index + 1];
}

/**
 * @param {{ moduleId: string, lessonId: string, order: number, moduleOrder: number }[]} orderedLessons
 */
export function getFirstLesson(orderedLessons) {
  if (!orderedLessons.length) return null;
  return orderedLessons[0];
}

/**
 * @param {string[]} unlockedLessonIds
 * @param {string} lessonId
 */
export function isLessonUnlocked(unlockedLessonIds, lessonId) {
  return unlockedLessonIds.includes(lessonId);
}
