# 🏋️‍♂️ Gym API – Gestión de Actividades

Este proyecto forma parte de la plataforma de administración del gimnasio **Unicatólicos Reloaded GYM**, enfocado en la **gestión de actividades**.

Permite crear, listar, actualizar, eliminar y asignar entrenadores a actividades mediante una API REST construida en **Node.js** y conectada a una base de datos **PostgreSQL en Supabase**.

## 🚀 Tecnologías utilizadas

- Node.js + Express
- PostgreSQL (Supabase)
- Insomnia (pruebas de endpoints)
- Dotenv para gestión de variables de entorno

## 📦 Funcionalidades principales

- Listar todas las actividades (`GET /activities`)
- Crear nueva actividad (`POST /activities`)
- Obtener actividad por ID (`GET /activities/:id`)
- Actualizar actividad (`PUT /activities/:id`)
- Eliminar actividad (`DELETE /activities/:id`)
- Asignar entrenador a actividad (`PUT /activities/:id/assign-trainer/:trainerId`)
- Ver asistentes (`GET /activities/:id/attendees`)

## 👥 Participantes del grupo

- **Yury Moreno - 408093**
- **Michael Sánchez - 408016**
- **Kevin Manrique - 407925**

