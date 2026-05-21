# Tech Stack & Convenciones

## Stack

- **Framework:** Next.js 14 (App Router), JavaScript (JSDoc para tipos).
- **Backend de datos:** Firebase Auth, Firestore, Realtime Database, Storage.
- **Servidor:** Server Actions + Firebase Admin SDK (`firebase-admin`).
- **Estilos:** Tailwind CSS + utilidad `cn()` en `lib/utils/cn.js`.
- **Calidad:** ESLint (eslint-config-next).

## Estructura de carpetas

```
app/                    # Rutas App Router
  actions/              # Server Actions (mutaciones seguras)
  api/                  # Route Handlers REST (legacy: pago, cursos)
  plataforma/           # Área estudiante autenticado
  admin/                # Panel administración
components/
  student/              # UI estudiante (entregas, lecciones)
  teacher/              # UI profesor (corrección)
  education/            # Compartido (outline del curso)
  admin/education/      # Formularios de contenido
lib/
  auth/                 # requireUser, getIdToken
  education/            # paths, unlock, queries
  types/                # JSDoc typedefs
  utils/
firebase/
  config.js             # SDK cliente (solo NEXT_PUBLIC_*)
  admin.js              # SDK admin (solo servidor)
```

## Patrón de datos

- **Lectura inicial:** Client Components llaman Server Actions con `idToken` de Firebase.
- **Mutaciones:** Server Actions en `app/actions/*` validan token con Admin SDK.
- **Firestore educativo:**
  - `courses/{courseId}`
  - `courses/{courseId}/modules/{moduleId}`
  - `courses/{courseId}/modules/{moduleId}/lessons/{lessonId}`
  - `courses/{courseId}/assignments/{assignmentId}`
  - `usuarios/{uid}/courseProgress/{courseId}`

## Firebase

- Cliente: `firebase/config.js` — nunca importar en código que exponga secretos.
- Admin: `firebase/admin.js` — requiere `FIREBASE_SERVICE_ACCOUNT_KEY` en `.env.local`.
- Roles: campo `rol` en documento `usuarios/{uid}`: `estudiante` | `profesor` | `admin`.

## Estado

- UI local: `useState` / `useTransition`.
- Sesión: `AuthContext` (cliente).
- Progreso del curso: Firestore `courseProgress`.

## Estilos

- Tailwind utility-first.
- `cn('clase-base', condición && 'clase-extra')` para clases condicionales.
- Componentes en PascalCase: `AssignmentSubmit.jsx`.

## Convenciones de código

- Server Actions: `'use server'` al inicio del archivo, primer parámetro objeto con `idToken`.
- Errores: lanzar `Error` con mensaje en español para el usuario.
- No commitear `.env.local` ni JSON de service account.
