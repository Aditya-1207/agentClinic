import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "./app";

describe("Express App", () => {
  it("GET / should return the home page HTML", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("Welcome to AgentClinic");
    expect(response.text).toContain("A wellness clinic for AI agents");
  });
});

describe("API Endpoints", () => {
  it("GET /api/agents should return a list of agents", async () => {
    const response = await request(app).get("/api/agents");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("model_type");
  });

  it("GET /api/agents/1 should return a single agent with ailments", async () => {
    const response = await request(app).get("/api/agents/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("ailments");
    expect(Array.isArray(response.body.ailments)).toBe(true);
  });

  it("GET /api/agents/999 should return 404", async () => {
    const response = await request(app).get("/api/agents/999");
    expect(response.status).toBe(404);
  });

  it("GET /api/ailments should return a list of ailments", async () => {
    const response = await request(app).get("/api/ailments");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("description");
  });
});
