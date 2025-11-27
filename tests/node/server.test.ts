import request from "supertest";
import { app } from "../../src/node/server";

describe("GET /ping", () => {
  it("returns pong", async () => {
    const res = await request(app).get("/ping");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "pong");
    expect(res.body).toHaveProperty("timestamp");
  });
});

describe("POST /echo", () => {
  it("echoes JSON body", async () => {
    const payload = { hello: "world" };

    const res = await request(app)
      .post("/echo")
      .send(payload)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("received");
    expect(res.body.received).toEqual(payload);
    expect(res.body).toHaveProperty("timestamp");
  });
});

describe("GET /sum", () => {
  it("returns the sum of valid numbers", async () => {
    const res = await request(app).get("/sum?a=5&b=7");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      a: 5,
      b: 7,
      result: 12,
    });
  });

  it("returns 400 for invalid numbers", async () => {
    const res = await request(app).get("/sum?a=foo&b=3");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});