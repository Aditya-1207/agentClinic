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
