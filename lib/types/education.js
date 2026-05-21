/**
 * @typedef {'estudiante' | 'profesor' | 'admin'} UserRole
 */

/**
 * @typedef {'texto' | 'video' | 'proyecto'} LessonType
 */

/**
 * @typedef {'pending' | 'approved' | 'rejected'} AssignmentStatus
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} slug
 * @property {boolean} published
 * @property {string} createdBy
 * @property {import('firebase/firestore').Timestamp} createdAt
 * @property {import('firebase/firestore').Timestamp} updatedAt
 * @property {number} order
 */

/**
 * @typedef {Object} Module
 * @property {string} id
 * @property {string} courseId
 * @property {string} title
 * @property {string} description
 * @property {number} order
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} courseId
 * @property {string} moduleId
 * @property {string} title
 * @property {LessonType} type
 * @property {string} [content] - Markdown para tipo texto
 * @property {string} [videoUrl] - YouTube/Vimeo para tipo video
 * @property {string} [projectDescription] - Instrucciones para tipo proyecto
 * @property {number} order
 */

/**
 * @typedef {Object} Assignment
 * @property {string} id
 * @property {string} courseId
 * @property {string} moduleId
 * @property {string} lessonId
 * @property {string} userId
 * @property {string} submissionUrl
 * @property {AssignmentStatus} status
 * @property {import('firebase/firestore').Timestamp} submittedAt
 * @property {import('firebase/firestore').Timestamp} [reviewedAt]
 * @property {Object} [feedback]
 * @property {string} feedback.text
 * @property {string} feedback.reviewedBy
 */

/**
 * @typedef {Object} CourseProgress
 * @property {string} courseId
 * @property {string[]} completedLessonIds
 * @property {string[]} unlockedLessonIds
 * @property {string} [currentLessonId]
 */

export {};
