# 🏦 Banco PSE - Frontend

Sistema de procesamiento de pagos seguro para Banco PSE. Este frontend se integra con el sistema de turismo externo para procesar pagos de forma segura.

## 🚀 Características

- ✅ Procesamiento seguro de pagos
- ✅ Autenticación de usuarios
- ✅ Interfaz responsive (móvil y desktop)
- ✅ Validación de formularios
- ✅ Manejo de errores robusto
- ✅ Redirección automática al sistema de turismo
- ✅ Diseño moderno con feedback visual

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend del Banco PSE corriendo en `http://localhost:3000`

## 🛠️ Instalación

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**

Archivo `.env.local` ya está configurado:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SISTEMA_TURISMO_URL=https://sistema-turismo.com
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```
El frontend estará disponible en: `http://localhost:3001`

### Modo Producción
```bash
npm run build
npm start
```

## 📱 Uso

### Flujo de Pago

1. **El sistema de turismo crea un pago** llamando al backend:
```javascript
const response = await fetch('http://localhost:3000/api/pagos/crear', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idUsuario: 1,
    monto: 150000,
    descripcion: 'Pago de paquete turístico a Cartagena'
  })
});

const { pago } = await response.json();
```

2. **Redirección al frontend del banco**:
```javascript
window.location.href = `http://localhost:3001/pago/${pago.id}`;
```

3. **Usuario autentica y completa el pago** en la interfaz del banco

4. **Redirección de vuelta** al sistema de turismo con confirmación

### 👤 Usuarios de Prueba

| Email | Contraseña | Saldo |
|-------|------------|-------|
| juan.perez@email.com | password123 | $500,000 COP |
| maria.garcia@email.com | password123 | $750,000 COP |
| carlos.rodriguez@email.com | password123 | $1,000,000 COP |

## 🏗️ Estructura del Proyecto

```
src/
├── app/                         # App Router de Next.js
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   └── pago/[id]/
│       └── page.tsx            # Página de procesamiento de pago
├── components/
│   └── ui/                     # Componentes reutilizables
│       ├── Alert.tsx           # Alertas
│       ├── Button.tsx          # Botones
│       ├── Input.tsx           # Inputs
│       └── LoadingSpinner.tsx  # Spinner de carga
├── services/
│   ├── api.ts                  # Configuración de Axios
│   ├── pagoService.ts          # Servicio de pagos
│   └── index.ts                # Exportaciones
├── types/
│   └── pago.ts                 # Tipos TypeScript
└── styles/
    └── globals.css             # Estilos globales
```

## 🔌 API Endpoints Utilizados

### GET `/api/pagos/:id`
Obtiene información de un pago.

**Respuesta:**
```json
{
  "id": 1,
  "idUsuario": 1,
  "monto": 150000,
  "descripcion": "Pago de paquete turístico",
  "estado": "pendiente"
}
```

### POST `/api/pagos/procesar`
Procesa un pago con autenticación.

**Request:**
```json
{
  "pagoId": 1,
  "email": "juan.perez@email.com",
  "contrasena": "password123"
}
```

## 🎨 Componentes Principales

### PagoPage (`/pago/[id]`)
- Carga información del pago
- Muestra formulario de autenticación
- Procesa el pago
- Muestra confirmación
- Redirige al sistema de turismo

### Componentes UI
- **Input**: Campo con validación
- **Button**: Botón con estados de carga
- **Alert**: Mensajes de error/éxito
- **LoadingSpinner**: Indicador de carga

## 🧪 Testing

### Casos de Prueba

1. **✅ Pago exitoso** - Usuario con saldo suficiente
2. **❌ Saldo insuficiente** - Pago mayor al saldo
3. **❌ Credenciales incorrectas** - Email/contraseña inválidos
4. **❌ Pago ya procesado** - Estado "completado"
5. **❌ Pago no encontrado** - ID inexistente

## 📚 Tecnologías

- **Next.js 16** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP
- **CSS Custom** - Estilos personalizados

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- Verificar que el backend esté corriendo
- Verificar la URL en `.env.local`

### Error: "Credenciales incorrectas"
- Usar usuarios de prueba documentados
- Verificar que la base de datos tenga los usuarios

### El pago no se procesa
- Verificar que el usuario tenga saldo suficiente
- Verificar que el pago esté en estado "pendiente"

---

**🎉 ¡Frontend listo para integrarse con el backend!**
