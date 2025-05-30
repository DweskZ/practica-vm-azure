# Práctica VM Azure – Dashboard Ambiental

Este repositorio contiene la versión adaptada del proyecto **Dashboard Ambiental** para ejecutarse de forma funcional en una máquina virtual (VM) de Azure, utilizando Express, Vite y PostgreSQL vía Docker Compose.

---

## 🔧 ¿Qué se hizo?

- Se desplegó una VM Ubuntu en Azure.
- Se instaló:
  - Node.js 18 (reemplazando Node 12 que venía por defecto)
  - Docker y Docker Compose
- Se ajustaron los puertos para acceso desde la red externa (3000 para backend, 5173 para frontend).
- Se clonó este proyecto y se adaptó para su ejecución en entorno de producción en la VM.

---

## ⚠️ Sobre el script `setup-app.sh`

Inicialmente se intentó automatizar todo con un script llamado `setup-app.sh`.  
Sin embargo, **falló por varias razones**:

- La versión de Node.js era incompatible (v12).
- No se estaban usando IPs públicas ni `0.0.0.0` en `listen()`.
- Docker no tenía permisos ni se había configurado correctamente.

**Por tanto, la configuración final fue realizada de forma manual y controlada, paso a paso.**

---
Los procesos fueron lanzados con nohup, pero se recomienda usar pm2 para producción.

En caso de reinicio de la VM, deberás relanzar los procesos o usar pm2 save y pm2 startup.

La base de datos corre como contenedor Docker con persistencia.

## 🚀 Cómo levantar el proyecto manualmente (ya configurado)

### 1. Iniciar la base de datos

```bash
cd ~/Dashboard_Ambiental
docker-compose up -d


cd ~/Dashboard_Ambiental/backend
nohup npm install
nohup npm run start > ../backend.log 2>&1 &

cd ~/Dashboard_Ambiental/frontend
nohup npm install
nohup npm run dev -- --host 0.0.0.0 > ../frontend.log 2>&1 &


