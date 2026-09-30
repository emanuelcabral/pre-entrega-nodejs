/**
 * Pre-Entrega de Proyecto de Node JS — Talento Tech
 * Gestión de productos desde la terminal
 * API: https://jsonplaceholder.typicode.com
 *
 * Uso:
 *   npm run start GET products
 *   npm run start GET products/<id>
 *   npm run start POST products <title> <price> <category>
 *   npm run start DELETE products/<id>
 */

const API_URL = "https://jsonplaceholder.typicode.com";

const args = process.argv.slice(2);
const [method, resource, ...rest] = args;

async function getAllProducts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const products = await response.json();
  console.log("Lista de productos:\n");
  console.log(products);
}

async function getProductById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const product = await response.json();
  console.log(`Producto #${id}:\n`);
  console.log(product);
}

async function createProduct(title, price, category) {
  const body = {
    title,
    price: Number(price),
    category,
    body: `${category} - precio: ${price}`,
    userId: 1,
  };

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const newProduct = await response.json();
  console.log("Producto creado:\n");
  console.log(newProduct);
}

async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const result = await response.json();
  console.log(`Producto #${id} eliminado:\n`);
  console.log(result);
}

async function main() {
  try {
    if (!method || !resource) {
      console.log(`
Uso incorrecto. Comandos disponibles:

  npm run start GET products
  npm run start GET products/<id>
  npm run start POST products <title> <price> <category>
  npm run start DELETE products/<id>

Ejemplos:
  npm run start GET products
  npm run start GET products/15
  npm run start POST products T-Shirt-Rex 300 remeras
  npm run start DELETE products/7
`);
      process.exit(1);
    }

    const upperMethod = method.toUpperCase();

    if (upperMethod === "GET") {
      if (resource === "products") {
        await getAllProducts();
      } else if (resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        if (!id) throw new Error("Debes indicar un productId");
        await getProductById(id);
      } else {
        throw new Error(`Recurso no reconocido: ${resource}`);
      }
    } else if (upperMethod === "POST") {
      if (resource !== "products") {
        throw new Error("Para crear debes usar: POST products <title> <price> <category>");
      }
      const [title, price, category] = rest;
      if (!title || !price || !category) {
        throw new Error("Faltan datos. Uso: POST products <title> <price> <category>");
      }
      await createProduct(title, price, category);
    } else if (upperMethod === "DELETE") {
      if (!resource.startsWith("products/")) {
        throw new Error("Uso: DELETE products/<id>");
      }
      const id = resource.split("/")[1];
      if (!id) throw new Error("Debes indicar un productId");
      await deleteProduct(id);
    } else {
      throw new Error(`Método no soportado: ${method}. Usa GET, POST o DELETE`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
