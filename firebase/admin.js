import admin from 'firebase-admin';

function initAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || projectId,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.initializeApp({ projectId });
  }

  throw new Error(
    'Firebase Admin no configurado. Define FIREBASE_SERVICE_ACCOUNT_KEY en .env.local'
  );
}

export function getAdminDb() {
  initAdmin();
  return admin.firestore();
}

export function getAdminAuth() {
  initAdmin();
  return admin.auth();
}

export async function verifyIdToken(idToken) {
  if (!idToken) {
    throw new Error('No autorizado: falta token de sesión');
  }
  return getAdminAuth().verifyIdToken(idToken);
}
