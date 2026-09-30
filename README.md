# Pre-Entrega de Proyecto de Node JS — Talento Tech

Gestión de productos desde la terminal consumiendo la API [JSONPlaceholder](https://jsonplaceholder.typicode.com).

**Autor:** Emanuel Cabral

---

## Requisitos

- Node.js (v18 o superior recomendado)

## Instalación

```bash
cd pre-entrega-nodejs-emanuel-cabral
```

No requiere dependencias externas (usa `fetch` nativo de Node).

## Configuración

- `"type": "module"` en `package.json` (ES Modules)
- Script `start` configurado

## Uso

```bash
npm run start <MÉTODO> <recurso> [argumentos]
```

### Comandos disponibles

#### 1. Consultar todos los productos
```bash
npm run start GET products
```

#### 2. Consultar un producto específico
```bash
npm run start GET products/<productId>
```
**Ejemplo:**
```bash
npm run start GET products/15
```

#### 3. Crear un producto nuevo
```bash
npm run start POST products <title> <price> <category>
```
**Ejemplo:**
```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

#### 4. Eliminar un producto
```bash
npm run start DELETE products/<productId>
```
**Ejemplo:**
```bash
npm run start DELETE products/7
```

---

## Estructura del proyecto

```
pre-entrega-nodejs-emanuel-cabral/
├── index.js        # Punto de entrada y lógica principal
├── package.json    # Configuración de Node y scripts
└── README.md       # Este archivo
```

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución
- **ES Modules** — import/export nativo
- **process.argv** — captura de comandos de terminal
- **fetch** — peticiones HTTP asíncronas
- **Destructuring** — manejo de argumentos y datos

## API

Base URL: `https://jsonplaceholder.typicode.com`

| Método | Endpoint     | Descripción               |
|--------|--------------|---------------------------|
| GET    | `/posts`     | Lista todos los productos |
| GET    | `/posts/:id` | Obtiene un producto       |
| POST   | `/posts`     | Crea un producto          |
| DELETE | `/posts/:id` | Elimina un producto       |

> Los comandos de terminal usan el recurso `products` según el enunciado.
> Internamente se consumen los endpoints `/posts` de JSONPlaceholder.

---

**Talento Tech · Back-End / Node.js**
