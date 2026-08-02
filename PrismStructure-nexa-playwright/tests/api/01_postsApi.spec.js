const { test, expect } = require("@playwright/test");
const { postsApiPage } = require("../../api/objects/postsApiPage");
const postPayload = require("../../api/testdata/postPayload.json");

/**
 * API-DUMMY — JSONPlaceholder contract validation (independent of NEXA UI).
 */
test.describe("JSONPlaceholder - Posts API", () => {
  /** TC-API-01 — RA1: GET /posts returns 200 and non-empty array */
  test("TC-API-01: GET /posts returns list @smoke @regression", async ({ request }) => {
    const response = await request.get(postsApiPage.endpoints.posts);
    expect(response.status()).toBe(postsApiPage.statusCodes.ok);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("title");
    console.log(`TC-API-01 Passed: GET /posts returned ${body.length} posts`);
  });

  /** TC-API-02 — RA2: GET /posts/{id} returns matching id */
  test("TC-API-02: GET /posts/{id} returns matching resource @smoke @regression", async ({ request }) => {
    const postId = 1;
    const response = await request.get(postsApiPage.endpoints.postById(postId));
    expect(response.status()).toBe(postsApiPage.statusCodes.ok);

    const body = await response.json();
    expect(body.id).toBe(postId);
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");
    console.log(`TC-API-02 Passed: GET /posts/${postId} returned id=${body.id}`);
  });

  /** TC-API-03 — RA3: GET /posts/{invalid-id} returns 404 */
  test("TC-API-03: GET /posts/{invalid-id} returns 404 @regression", async ({ request }) => {
    const response = await request.get(postsApiPage.endpoints.postById(99999));
    expect(response.status()).toBe(postsApiPage.statusCodes.notFound);
    console.log("TC-API-03 Passed: Invalid post ID returned 404");
  });

  /** TC-API-04 — RA4: POST /posts with valid payload returns 201 */
  test("TC-API-04: POST /posts with valid payload returns 201 @smoke @regression", async ({ request }) => {
    const response = await request.post(postsApiPage.endpoints.posts, {
      data: postPayload.validPost,
    });
    expect(response.status()).toBe(postsApiPage.statusCodes.created);

    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(body.title).toBe(postPayload.validPost.title);
    expect(body.body).toBe(postPayload.validPost.body);
    expect(body.userId).toBe(postPayload.validPost.userId);
    console.log(`TC-API-04 Passed: POST /posts returned id=${body.id}`);
  });

  /** TC-API-05 — RA5: POST /posts with malformed payload avoids 5xx */
  test("TC-API-05: POST /posts malformed payload no 5xx @regression", async ({ request }) => {
    const response = await request.post(postsApiPage.endpoints.posts, {
      data: postPayload.malformedPost,
    });
    expect(response.status()).toBeLessThan(500);
    console.log(`TC-API-05 Passed: Malformed POST returned status ${response.status()}`);
  });
});
