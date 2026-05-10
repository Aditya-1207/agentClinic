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

  it("GET /api/agents/:id should return a single agent with ailments", async () => {
    // First get all agents to find a valid ID
    const agentsRes = await request(app).get("/api/agents");
    const validId = agentsRes.body[0].id;

    const response = await request(app).get(`/api/agents/${validId}`);
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

  it("GET /api/therapies should return a list of therapies", async () => {
    const response = await request(app).get("/api/therapies");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/dashboard/summary should return system counts", async () => {
    const response = await request(app).get("/api/dashboard/summary");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("agents");
    expect(response.body).toHaveProperty("ailments");
    expect(response.body).toHaveProperty("appointments");
  });

  it("POST /api/appointments should book an appointment", async () => {
    // Get valid agent id
    const agentsRes = await request(app).get("/api/agents");
    const validId = agentsRes.body[0].id;

    const payload = {
      agent_id: validId,
      therapist_name: "Dr. Turing",
      datetime: "2026-06-01T10:00:00Z"
    };
    
    const response = await request(app)
      .post("/api/appointments")
      .send(payload);
      
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "Scheduled");
    expect(response.body).toHaveProperty("therapist_name", "Dr. Turing");
  });

  it("POST /api/appointments should return 409 on conflict", async () => {
    const agentsRes = await request(app).get("/api/agents");
    const validId = agentsRes.body[1].id || agentsRes.body[0].id;

    const payload = {
      agent_id: validId,
      therapist_name: "Dr. Turing", // Same therapist
      datetime: "2026-06-01T10:00:00Z" // Same time
    };
    
    const response = await request(app)
      .post("/api/appointments")
      .send(payload);
      
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });
});
