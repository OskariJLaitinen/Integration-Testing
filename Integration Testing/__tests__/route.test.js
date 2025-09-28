const request = require("supertest");
const { app } = require("../index");

/**
 * Integration tests for the /hex-to-rgb route.
 *
 * @group integration
 */
describe("GET /hex-to-rgb", () => {
  test("returns rgb for valid hex", async () => {
    const res = await request(app).get("/hex-to-rgb?hex=FF5733");
    expect(res.statusCode).toBe(200);
    expect(res.body.rgb).toEqual({ r: 255, g: 87, b: 51 });
  });

  test("returns error if hex missing", async () => {
    const res = await request(app).get("/hex-to-rgb");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Missing hex parameter");
  });

  test("returns error if hex invalid", async () => {
    const res = await request(app).get("/hex-to-rgb?hex=ZZZZZZ");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid hex code");
  });
});
