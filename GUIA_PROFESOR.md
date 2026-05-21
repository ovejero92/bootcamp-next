# Guía del profesor — Bootcamp Platform

> **Archivo privado para vos.** Explica qué hace el proyecto, qué se agregó respecto al clone de GitHub, y cómo ponerlo en marcha paso a paso.

---

## 1. ¿Qué es este proyecto?

Es tu app de bootcamp hecha con **Next.js 14** (App Router), **Firebase** y **Tailwind**, inspirada en la experiencia tipo CoderHouse. Tenía:

| Área | Ruta | Función |
|------|------|---------|
| Landing / catálogo | `/`, `/cursosV`, `/carrerasV` | Mostrar cursos y carreras, carrito, pago simulado |
| Plataforma alumno | `/plataforma` | Login, home del estudiante, chat, notificaciones (UI) |
| Admin comercial | `/admin` | Crear **carreras** en Firestore, usuarios, login admin por localStorage |

**Lo nuevo (módulo educativo Fase 2):**

| Área | Ruta | Función |
|------|------|---------|
| Aula del estudiante | `/plataforma/cursos` | Listar cursos publicados y estudiar |
| Lección | `/plataforma/cursos/[id]/leccion/[modulo]/[leccion]` | Ver texto, video o entregar proyecto |
| Admin educativo | `/admin/educacion` | Crear curso → módulo → lección |
| Corrección | `/admin/educacion/[id]/entregas` | Aprobar/rechazar entregas con feedback |

Flujo pedagógico implementado:

```
Curso → Módulo → Lección (texto | video | proyecto)
                    ↓
            Entrega URL (proyecto) → Pendiente
                    ↓
            Profesor aprueba/rechaza + feedback
                    ↓
            Se desbloquea la siguiente lección
```

---

## 2. ¿Por qué no funcionaba después de clonar?

En `.gitignore` estaba la carpeta **`/firebase` completa**. Al clonar, **no tenías `firebase/config.js`**, y la app rompía en cualquier pantalla con Auth o Firestore.

**Qué hicimos:**

- `firebase/config.js` — SDK cliente (usa variables `NEXT_PUBLIC_*`)
- `firebase/admin.js` — SDK admin para Server Actions (usa service account)
- `.env.example` — plantilla de variables
- El `.gitignore` ahora ignora solo `firebase/*.json` (claves), no el código

---

## 3. Requisitos en tu PC

- Node.js 18+
- Cuenta en [Firebase Console](https://console.firebase.google.com)
- El proyecto Firebase que usabas en CoderHouse (o uno nuevo)

---

## 4. Configuración paso a paso

### 4.1 Instalar dependencias

```bash
cd bootcamp-next
npm install
```

### 4.2 Variables de entorno

Copiá el ejemplo:

```bash
copy .env.example .env.local
```

Completá en `.env.local`:

**Cliente (Firebase → Configuración del proyecto → Tus apps → Web):**

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...
```

**Servidor (Admin SDK):**

1. Firebase Console → Configuración → Cuentas de servicio → **Generar nueva clave privada** (descarga JSON).
2. Convertí el JSON a **una sola línea** (sin saltos) y pegalo en:

```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

> Nunca subas ese JSON a GitHub.

**Panel admin legacy (opcional):**

```
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD=tu_clave_segura
```

(Esto es para `/admin` con localStorage; el módulo educativo usa **Firebase Auth + rol en Firestore**.)

### 4.3 Habilitar servicios en Firebase

- **Authentication:** Email/Password y Google (como ya tenías).
- **Firestore:** crear base de datos.
- **Realtime Database:** si usás presencia de usuarios en `/admin/users`.

### 4.4 Índices de Firestore (importante)

La primera vez que listes entregas pendientes, Firebase puede pedir un índice compuesto. Creá en la consola o con el link del error:

- Colección: `courses/{courseId}/assignments`
- Campos: `status` Asc, `submittedAt` Desc

### 4.5 Reglas de seguridad

Copiá `firestore.rules.example` como base. En producción las escrituras las hace el **Admin SDK** en Server Actions; el cliente solo lee lo publicado.

### 4.6 Tu usuario como profesor/admin

En Firestore, colección **`usuarios`**, documento con tu **UID** (el de Firebase Auth):

```json
{
  "email": "tu@email.com",
  "nombre": "Tu Nombre",
  "rol": "admin"
}
```

Valores de `rol`: `estudiante` | `profesor` | `admin`.

Sin este campo, las Server Actions de creación de cursos fallan con “No tenés permisos”.

### 4.7 Arrancar

```bash
npm run dev
```

Abrí **http://localhost:4000** (el proyecto usa puerto 4000, no 3000).

---

## 5. Cómo usar el módulo educativo (día a día)

### Como profesor — crear contenido

1. Iniciá sesión en la app (Google o email) con el usuario que tiene `rol: admin`.
2. Entrá a **http://localhost:4000/admin/educacion**
   - (También desde `/admin` → botón “Educación (cursos)”).
3. **Crear curso / módulo / lección:**
   - Curso: título, descripción, marcar **Publicado**.
   - Módulo: título y orden.
   - Lección: elegir tipo:
     - **texto:** contenido Markdown en el textarea.
     - **video:** URL de YouTube o Vimeo.
     - **proyecto:** consigna + el alumno entrega URL (GitHub, etc.).
4. Podés agregar varias lecciones al mismo módulo repitiendo el paso 3.

### Como profesor — corregir entregas

1. `/admin/educacion` → **Ver entregas** en el curso.
2. Abrís el link del alumno, escribís feedback, **Aprobar** o **Rechazar**.
3. Si aprobás, el sistema desbloquea la **siguiente lección** en orden (módulos y lecciones por campo `order`).

### Como estudiante

1. Login en `/plataforma`.
2. Menú lateral → **Mis cursos** → `/plataforma/cursos`.
3. Entrá al curso → elegí lección o **Continuar lección**.
4. **Texto/video:** botón “Marcar como completada” desbloquea la siguiente.
5. **Proyecto:** pegar URL → **Entregar** → estado “Pendiente de revisión” hasta que apruebes.

---

## 6. Modelo de datos en Firestore

```
courses/{courseId}
  title, description, slug, published, createdBy, order, timestamps

courses/{courseId}/modules/{moduleId}
  title, description, order, courseId

courses/{courseId}/modules/{moduleId}/lessons/{lessonId}
  title, type: "texto"|"video"|"proyecto"
  content | videoUrl | projectDescription
  order

courses/{courseId}/assignments/{assignmentId}
  userId, userEmail, lessonId, moduleId
  submissionUrl, status: pending|approved|rejected
  feedback: { text, reviewedBy, reviewedAt }
  submittedAt, reviewedAt

usuarios/{uid}/courseProgress/{courseId}
  unlockedLessonIds: []
  completedLessonIds: []
  currentLessonId
```

**Colecciones legacy** (siguen igual): `carreras`, `usuarios` con `cursos[]` para el carrito/pago.

---

## 7. Archivos clave (mapa mental)

| Archivo | Rol |
|---------|-----|
| `firebase/config.js` | Auth/Firestore cliente |
| `firebase/admin.js` | Verificar tokens en servidor |
| `app/actions/*.js` | Server Actions (crear curso, entregar, calificar) |
| `lib/education/unlock.js` | Lógica de desbloqueo |
| `components/student/LessonViewer.jsx` | Render de lección |
| `components/student/AssignmentSubmit.jsx` | Formulario de entrega |
| `components/teacher/AssignmentReview.jsx` | Panel de corrección |
| `.cursor/rules/product.md` | Contexto para Cursor |
| `.cursor/rules/tech.md` | Convenciones técnicas |
| `.cursorrules` | Reglas globales del asistente |

---

## 8. Cursor / IA para seguir construyendo

Ya están creadas las **Project Rules** que te sugirió el prompt:

- `.cursor/rules/product.md` — visión del producto
- `.cursor/rules/tech.md` — stack y carpetas
- `.cursorrules` — comportamiento global del agente

**Flujo recomendado por feature:**

1. **Planificación** — pedir refinamiento de requerimientos.
2. **Arquitectura** — modelos Firestore + lista de Server Actions.
3. **Implementación** — Composer con `@archivo` relevante.

Ejemplo para Fase 3 (foros): “Quiero foros por curso, actúa como PM…”

---

## 9. Roadmap sugerido (lo que falta)

| Fase | Ideas |
|------|--------|
| 2.1 | Editor Markdown enriquecido (TipTap) en lecciones texto |
| 2.2 | Subida de archivos a Firebase Storage en proyectos |
| 2.3 | Inscripción explícita curso ↔ alumno (hoy ve todos los publicados) |
| 3 | Foros, webinars, pagos reales (Mercado Pago / Stripe) |
| — | Migrar a TypeScript + shadcn/ui si querés más robustez |

---

## 10. Problemas frecuentes

| Síntoma | Solución |
|---------|----------|
| Error Firebase al cargar | Revisar `.env.local` y que exista `firebase/config.js` |
| “Firebase Admin no configurado” | `FIREBASE_SERVICE_ACCOUNT_KEY` en `.env.local`, reiniciar `npm run dev` |
| “No tenés permisos” | Campo `rol: admin` o `profesor` en `usuarios/{tuUid}` |
| “Debés iniciar sesión” en educación admin | Misma sesión Firebase que en `/plataforma` (no alcanza solo login localStorage de `/admin`) |
| Entregas no listan | Crear índice compuesto en Firestore (ver 4.4) |
| Lección bloqueada | Completar o que aprueben la anterior; revisar `order` en módulos/lecciones |

---

## 11. Deploy

1. Subí el repo a Vercel.
2. Configurá las mismas variables de entorno (incluida `FIREBASE_SERVICE_ACCOUNT_KEY`).
3. Dominio autorizado en Firebase Auth.
4. Reglas de Firestore en modo producción.

---

## 12. Resumen de lo implementado en esta sesión

- Restauración de Firebase y Admin SDK.
- Sistema completo **Curso → Módulo → Lección → Entrega → Feedback → Desbloqueo**.
- UI estudiante en `/plataforma/cursos`.
- UI profesor en `/admin/educacion`.
- Server Actions seguras con token.
- Reglas de Cursor (`.cursor/rules`, `.cursorrules`).
- Esta guía.

Si querés priorizar el próximo paso (inscripciones, Storage, o foros), usá el flujo de 3 actos en Cursor con `@GUIA_PROFESOR.md` y `@.cursor/rules/product.md` como contexto.

---

*Última actualización: implementación Fase 2 educativa sobre el esqueleto bootcamp-next.*
