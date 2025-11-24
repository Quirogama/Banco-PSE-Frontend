# Cómo correr el frontend Banco-PSE

## Requisitos previos
- Node.js v18 o superior
- npm (v9 o superior)

## Pasos para ejecutar el frontend

1. **Instala las dependencias**

   Abre una terminal en la carpeta `frontend` y ejecuta:
   
   ```bash
   npm install
   ```

2. **Configura las variables de entorno**

   Si tienes un archivo `.env.local`, verifica que las variables estén correctas. Ejemplo:
   ```env
   NEXT_PUBLIC_SISTEMA_TURISMO_URL=https://sistema-turismo.com
   # O la URL que corresponda a tu backend
   ```

3. **Inicia el servidor de desarrollo**

   En la misma terminal, ejecuta:
   
   ```bash
   npm run dev
   ```

   Esto iniciará el frontend en modo desarrollo en `http://localhost:3001` (o el puerto configurado).

4. **Accede a la aplicación**

   Abre tu navegador y visita:
   
   [http://localhost:3001](http://localhost:3001)

---

## Solución de problemas
- Si ves errores de dependencias, asegúrate de tener la versión correcta de Node.js y npm.
- Si el frontend no conecta con el backend, revisa las variables de entorno y la configuración de CORS en el backend.
- Para cualquier error, revisa la consola de la terminal y la consola del navegador.

---

## Scripts útiles
- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la aplicación para producción
- `npm run start` — Inicia la app en modo producción (después de `npm run build`)

---

## Contacto
Para soporte técnico, contacta al equipo de desarrollo o revisa la documentación interna.
