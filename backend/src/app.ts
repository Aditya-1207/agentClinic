import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { renderHomePage } from "./views/home";
import { renderLayout } from "./views/layout";
import db from "./db";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

app.get("/api/therapies", (_req, res) => {
  try {
    const therapies = db.prepare("SELECT * FROM therapies").all();
    res.json(therapies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch therapies" });
  }
});

app.post("/api/appointments", (req, res) => {
  try {
    const { agent_id, therapist_name, datetime } = req.body;
    
    // Basic validation
    if (!agent_id || !therapist_name || !datetime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check scheduling conflict
    const conflict = db.prepare(`
      SELECT * FROM appointments 
      WHERE therapist_name = ? AND datetime = ? AND status != 'Cancelled'
    `).get(therapist_name, datetime);

    if (conflict) {
      return res.status(409).json({ error: "Therapist is already booked at this time" });
    }

    // Insert
    const result = db.prepare(`
      INSERT INTO appointments (agent_id, therapist_name, datetime, status)
      VALUES (?, ?, ?, 'Scheduled')
    `).run(agent_id, therapist_name, datetime);

    const appointment = db.prepare("SELECT * FROM appointments WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

app.get("/api/dashboard/summary", (_req, res) => {
  try {
    const agentsCount = db.prepare("SELECT COUNT(*) as count FROM agents").get() as { count: number };
    const ailmentsCount = db.prepare("SELECT COUNT(*) as count FROM ailments").get() as { count: number };
    const appointmentsCount = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Scheduled'").get() as { count: number };

    res.json({
      agents: agentsCount.count,
      ailments: ailmentsCount.count,
      appointments: appointmentsCount.count
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});
