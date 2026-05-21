'use client';

import { auth } from '@/firebase/config';

/**
 * Obtiene el ID token del usuario actual para Server Actions.
 */
export async function getIdToken() {
  if (!auth) {
    throw new Error('Firebase no está configurado. Revisá .env.local');
  }
  const current = auth.currentUser;
  if (!current) {
    throw new Error('Debés iniciar sesión');
  }
  return current.getIdToken();
}
