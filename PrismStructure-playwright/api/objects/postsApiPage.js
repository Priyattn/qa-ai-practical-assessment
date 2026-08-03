/**
 * JSONPlaceholder posts API endpoint definitions (dummy API — not NEXA backend).
 * @module postsApiPage
 */
const API_BASE = "https://jsonplaceholder.typicode.com";

const postsApiPage = {
  /** @type {string} Base URL for JSONPlaceholder */
  baseUrl: API_BASE,
  /** @type {{ posts: string, postById: (id: number) => string }} */
  endpoints: {
    posts: `${API_BASE}/posts`,
    /** @param {number} id - Post id */
    postById: (id) => `${API_BASE}/posts/${id}`,
  },
  /** @type {{ title: string, body: string, userId: number }} */
  validPostPayload: {
    title: "NEXA QA Assessment Test Post",
    body: "Dummy API automation — JSONPlaceholder POST validation",
    userId: 1,
  },
  /** @type {{ title: number, body: null }} */
  malformedPostPayload: {
    title: 12345,
    body: null,
  },
  /** @type {{ ok: number, created: number, notFound: number }} */
  statusCodes: {
    ok: 200,
    created: 201,
    notFound: 404,
  },
};

module.exports = { postsApiPage };
