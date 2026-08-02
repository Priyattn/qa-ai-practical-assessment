const API_BASE = "https://jsonplaceholder.typicode.com";

const postsApiPage = {
  baseUrl: API_BASE,
  endpoints: {
    posts: `${API_BASE}/posts`,
    postById: (id) => `${API_BASE}/posts/${id}`,
  },
  validPostPayload: {
    title: "NEXA QA Assessment Test Post",
    body: "Dummy API automation — JSONPlaceholder POST validation",
    userId: 1,
  },
  malformedPostPayload: {
    title: 12345,
    body: null,
  },
  statusCodes: {
    ok: 200,
    created: 201,
    notFound: 404,
  },
};

module.exports = { postsApiPage };
