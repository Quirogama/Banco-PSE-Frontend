# 🏦 Banco PSE - Sistema de Procesamiento de Pagos Frontend

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://reactjs.org/)

Sistema frontend para el procesamiento seguro de pagos del Banco PSE, diseñado para integrarse con sistemas externos de turismo.

## 🎯 Descripción

Este proyecto implementa el frontend del sistema Banco PSE que permite:
- Recibir redirecciones desde sistemas externos (ej: sistema de turismo)
- Autenticar usuarios para procesar pagos
- Validar y procesar transacciones de forma segura
- Redirigir de vuelta al sistema original con confirmación

## ✨ Características

- ✅ **Interfaz moderna y responsive** - Compatible con móviles y desktop
- ✅ **Validación de formularios** - Validación en tiempo real
- ✅ **Manejo de errores robusto** - Feedback claro al usuario
- ✅ **Integración con backend** - API REST con Axios
- ✅ **TypeScript** - Tipado estático para mayor seguridad
- ✅ **Diseño profesional** - UI/UX optimizada para pagos

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Backend del Banco PSE corriendo

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/Quirogama/Banco-PSE-Frontend.git
cd Banco-PSE-Frontend/frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:3001**

### Probar el Sistema

1. Asegúrate que el backend esté corriendo en `http://localhost:3000`
2. Accede a: `http://localhost:3001/pago/1`
3. Usa estas credenciales de prueba:
   - Email: `juan.perez@email.com`
   - Contraseña: `password123`

## 📁 Estructura del Proyecto

```
Banco-PSE-Frontend/
├── frontend/                    # Aplicación Next.js
│   ├── src/
│   │   ├── app/                # App Router (páginas)
│   │   │   ├── layout.tsx     # Layout principal
│   │   │   ├── page.tsx       # Página de inicio
│   │   │   └── pago/
│   │   │       └── [id]/
│   │   │           └── page.tsx  # ⭐ Página principal de pago
│   │   ├── components/
│   │   │   └── ui/            # Componentes reutilizables
│   │   │       ├── Alert.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── services/          # Servicios de API
│   │   │   ├── api.ts
│   │   │   └── pagoService.ts
│   │   ├── types/             # Tipos TypeScript
│   │   │   └── pago.ts
│   │   └── styles/            # Estilos CSS
│   │       └── globals.css
│   ├── .env.local             # Variables de entorno (desarrollo)
│   ├── .env.production        # Variables de entorno (producción)
│   ├── package.json
│   └── tsconfig.json
├── INICIO-RAPIDO.md           # 🚀 Guía de inicio rápido
├── IMPLEMENTACION-COMPLETA.md # 📋 Resumen de implementación
├── INTEGRACION-SISTEMA-TURISMO.md # 🔗 Guía de integración
├── FLUJO-VISUAL.md            # 📊 Diagrama de flujo
└── README.md                  # Este archivo
```

## 🔌 Integración con Sistema de Turismo

### 1. Crear un Pago

```javascript
// Desde tu sistema de turismo
const response = await fetch('http://localhost:3000/api/pagos/crear', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idUsuario: 1,
    monto: 150000,
    descripcion: 'Paquete turístico a Cartagena'
  })
});

const { pago } = await response.json();
```

### 2. Redirigir al Banco

```javascript
window.location.href = `http://localhost:3001/pago/${pago.id}`;
```

### 3. Recibir Confirmación

El banco redirigirá a:
```
https://tu-sistema.com/confirmacion?pagoId=123&estado=exitoso
```

**Ver guía completa:** [INTEGRACION-SISTEMA-TURISMO.md](./INTEGRACION-SISTEMA-TURISMO.md)

## 👤 Usuarios de Prueba

| Email | Contraseña | Saldo |
|-------|------------|-------|
| juan.perez@email.com | password123 | $500,000 COP |
| maria.garcia@email.com | password123 | $750,000 COP |
| carlos.rodriguez@email.com | password123 | $1,000,000 COP |

## 🔧 Tecnologías

- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP
- **CSS Custom** - Estilos personalizados

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [INICIO-RAPIDO.md](./INICIO-RAPIDO.md) | Guía de inicio rápido |
| [frontend/README.md](./frontend/README.md) | Documentación técnica del frontend |
| [INTEGRACION-SISTEMA-TURISMO.md](./INTEGRACION-SISTEMA-TURISMO.md) | Guía de integración con ejemplos |
| [FLUJO-VISUAL.md](./FLUJO-VISUAL.md) | Diagrama visual del flujo completo |
| [IMPLEMENTACION-COMPLETA.md](./IMPLEMENTACION-COMPLETA.md) | Resumen de implementación |

## 🧪 Testing

### Ejecutar Tests (cuando estén disponibles)
```bash
npm test
```

### Casos de Prueba Manuales

1. ✅ **Pago exitoso** - Usuario con saldo suficiente
2. ❌ **Saldo insuficiente** - Monto mayor al saldo
3. ❌ **Credenciales incorrectas** - Email/contraseña inválidos
4. ❌ **Pago ya procesado** - Estado "completado"
5. ❌ **Pago no encontrado** - ID inexistente

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa el archivo `.env.local`
- Verifica la configuración de CORS en el backend

### Error: "Credenciales incorrectas"
- Usa los usuarios de prueba documentados
- Verifica que la base de datos tenga los usuarios cargados

### El pago no se procesa
- Verifica que el usuario tenga saldo suficiente
- Verifica que el pago esté en estado "pendiente"
- Revisa los logs del backend

## 🔐 Seguridad

- ✅ Validación de inputs en el cliente
- ✅ Timeout de 10 segundos en peticiones
- ✅ Interceptor de errores HTTP
- ✅ No se almacenan credenciales
- ✅ Variables de entorno para configuración
- ⚠️ **Recomendado:** Usar HTTPS en producción

## 🌐 Producción

### Build
```bash
cd frontend
npm run build
npm start
```

### Variables de Entorno
```env
NEXT_PUBLIC_API_URL=https://banco-pse.com/api
NEXT_PUBLIC_SISTEMA_TURISMO_URL=https://sistema-turismo.com
```

### Docker (Opcional)
```bash
docker build -t banco-pse-frontend ./frontend
docker run -p 3001:3001 banco-pse-frontend
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Contacto

- **Repositorio Backend:** [Banco-PSE-Backend](https://github.com/Quirogama/Banco-PSE-Backend)
- **Issues:** [GitHub Issues](https://github.com/Quirogama/Banco-PSE-Frontend/issues)

## 🎉 Estado del Proyecto

✅ **Completamente implementado y listo para usar**

- ✅ Todos los componentes implementados
- ✅ Integración con backend funcional
- ✅ Documentación completa
- ✅ Estilos responsive
- ✅ Manejo de errores robusto
- ✅ Validaciones de formulario
- ✅ Variables de entorno configuradas

---

**Desarrollado siguiendo las especificaciones de ESPECIFICACIONES-FRONTEND.md** ✨
