import express from "express";
import path from "path";
import cors from "cors";
import { renderHomePage } from "./views/home";
import { renderLayout } from "./views/layout";
import db from "./db";

export const app = express();

app.use(cors());

// Serve static files (CSS, images, etc.) from public/
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req, res) => {
  const content = renderHomePage();
  res.send(renderLayout("AgentClinic", content));
});

// --- API Endpoints ---

app.get("/api/agents", (_req, res) => {
  try {
    const agents = db.prepare("SELECT * FROM agents").all();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

app.get("/api/agents/:id", (req, res) => {
  try {
    const agent = db.prepare("SELECT * FROM agents WHERE id = ?").get(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    
    // Get related ailments
    const ailments = db.prepare(`
      SELECT ailments.* FROM ailments
      JOIN agent_ailments ON ailments.id = agent_ailments.ailment_id
      WHERE agent_ailments.agent_id = ?
    `).all(req.params.id);

    res.json({ ...agent, ailments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agent details" });
  }
});

app.get("/api/ailments", (_req, res) => {
  try {
    const ailments = db.prepare("SELECT * FROM ailments").all();
    res.json(ailments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ailments" });
  }
});
