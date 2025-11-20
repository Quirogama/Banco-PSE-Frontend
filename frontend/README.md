# Frontend (Next.js) — Estructura base

Descripción breve de dónde colocar archivos y convenciones mínimas para este proyecto.

Estructura recomendada dentro de `src/`:

- `components/`
  - `ui/` : componentes visuales reutilizables (botones, inputs, badges, etc.)
  - `forms/` : formularios compuestos por campos y validaciones
  - `layouts/` : layouts de página (header, footer, containers)
- `pages/` : rutas de Next.js. Mantener páginas y subrutas aquí.
- `services/` : cliente HTTP (`axios`), adaptadores y funciones para llamar a la API
- `hooks/` : hooks personalizados reutilizables (`useApi`, `useAuth`, etc.)
- `styles/` : estilos globales, tokens y módulos CSS
- `utils/` : utilidades puras y helpers

Convenciones mínimas:
- Componentes: `PascalCase.tsx` para componentes React.
- Archivos estáticos: `kebab-case` (p. ej. `colors.css`).
- Exponer servicios desde `services/index.ts`.
- Variables de entorno: usar `NEXT_PUBLIC_` para valores expuestos al cliente.

Comandos útiles:

```powershell
npm install
npm run dev
```

Próximos pasos sugeridos:
- Implementar `services/api.ts` con la configuración `axios`.
- Añadir `src/pages/_app.tsx` para importar estilos globales.
- Crear ejemplos de componentes en `components/` para guiar al equipo.
