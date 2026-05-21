import { verifyIdToken } from '@/firebase/admin';
import { getAdminDb } from '@/firebase/admin';
import { COLLECTIONS } from '@/lib/education/paths';

/**
 * Valida el token de Firebase enviado desde el cliente en Server Actions.
 * @param {string} idToken
 */
export async function requireUser(idToken) {
  const decoded = await verifyIdToken(idToken);
  const db = getAdminDb();
  const userSnap = await db.collection(COLLECTIONS.users).doc(decoded.uid).get();
  const data = userSnap.exists ? userSnap.data() : {};
  const role = data.rol || 'estudiante';

  return {
    uid: decoded.uid,
    email: decoded.email || data.email || '',
    role,
    nombre: data.nombre || '',
  };
}

/**
 * @param {import('@/lib/auth/server').requireUser extends Function ? Awaited<ReturnType<typeof requireUser>> : never} user
 * @param {string[]} allowedRoles
 */
export function requireRole(user, allowedRoles) {
  if (!user.role || !allowedRoles.includes(user.role)) {
    throw new Error('No tenés permisos para esta acción');
  }
}
