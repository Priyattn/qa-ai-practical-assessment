/**
 * Practice Software Testing API endpoint definitions.
 * Docs: https://api.practicesoftwaretesting.com/api/documentation
 * @module toolshopApiPage
 */
const toolshopApiPage = {
  /** @type {{ login: string, products: string, productById: (id: string) => string, carts: string, cartById: (id: string) => string, addToCart: (cartId: string) => string, invoices: string, usersMe: string }} */
  endpoints: {
    login: "/users/login",
    products: "/products",
    /** @param {string} id - Product ULID */
    productById: (id) => `/products/${id}`,
    carts: "/carts",
    /** @param {string} id - Cart ULID */
    cartById: (id) => `/carts/${id}`,
    /** @param {string} cartId - Cart ULID */
    addToCart: (cartId) => `/carts/${cartId}`,
    invoices: "/invoices",
    usersMe: "/users/me",
  },
  /** @type {{ ok: number, created: number, unauthorized: number, notFound: number }} */
  statusCodes: {
    ok: 200,
    created: 201,
    unauthorized: 401,
    notFound: 404,
  },
};

module.exports = { toolshopApiPage };
