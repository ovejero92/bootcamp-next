# Product Context: Bootcamp Platform

## ¿Qué estamos construyendo?

Plataforma de bootcamp online (estilo CoderHouse) con rutas de aprendizaje estructuradas. Los usuarios tienen roles de **Estudiante**, **Profesor** y **Administrador**.

## Usuarios principales

1. **Estudiantes:** Aprenden con un plan claro, ven progreso, entregan proyectos y reciben feedback.
2. **Profesores:** Crean contenido (cursos → módulos → lecciones), revisan entregas y califican.
3. **Administradores:** Gestionan usuarios, carreras comerciales y operaciones generales.

## Objetivos clave

- Experiencia de aprendizaje clara y progresiva (desbloqueo por lección).
- Automatizar entregas y feedback de proyectos.
- Escalar a cientos de estudiantes con Firebase.

## Roadmap

- **Fase 1 (Base):** Usuarios, roles, carreras comerciales, panel admin — *implementado en el repo original*.
- **Fase 2 (Educativo):** Cursos, módulos, lecciones (texto/video/proyecto), entregas y corrección — *implementado en `/plataforma/cursos` y `/admin/educacion`*.
- **Fase 3 (Comunidad):** Foros, webinars en vivo, pagos integrados — *pendiente*.

## Flujo educativo

`Curso → Módulo → Lección → Entrega (si es proyecto) → Feedback → Desbloqueo de la siguiente lección`
