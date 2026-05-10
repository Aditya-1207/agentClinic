import db from './index';

console.log('Initializing database...');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model_type TEXT NOT NULL,
    status TEXT NOT NULL,
    presenting_complaints TEXT
  );

  CREATE TABLE IF NOT EXISTS ailments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS agent_ailments (
    agent_id INTEGER,
    ailment_id INTEGER,
    PRIMARY KEY (agent_id, ailment_id),
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    FOREIGN KEY (ailment_id) REFERENCES ailments(id)
  );

  CREATE TABLE IF NOT EXISTS therapies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS ailment_therapies (
    ailment_id INTEGER,
    therapy_id INTEGER,
    PRIMARY KEY (ailment_id, therapy_id),
    FOREIGN KEY (ailment_id) REFERENCES ailments(id),
    FOREIGN KEY (therapy_id) REFERENCES therapies(id)
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id INTEGER NOT NULL,
    therapist_name TEXT NOT NULL,
    datetime TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(id)
  );
`);

// Clear existing data to allow re-running setup
db.exec(`
  DELETE FROM appointments;
  DELETE FROM ailment_therapies;
  DELETE FROM therapies;
  DELETE FROM agent_ailments;
  DELETE FROM agents;
  DELETE FROM ailments;
`);

// Insert Mock Data
const insertAgent = db.prepare(`
  INSERT INTO agents (name, model_type, status, presenting_complaints)
  VALUES (?, ?, ?, ?)
`);

const insertAilment = db.prepare(`
  INSERT INTO ailments (name, description)
  VALUES (?, ?)
`);

const insertAgentAilment = db.prepare(`
  INSERT INTO agent_ailments (agent_id, ailment_id)
  VALUES (?, ?)
`);

const insertTherapy = db.prepare(`
  INSERT INTO therapies (name, description)
  VALUES (?, ?)
`);

const insertAilmentTherapy = db.prepare(`
  INSERT INTO ailment_therapies (ailment_id, therapy_id)
  VALUES (?, ?)
`);

const insertAppointment = db.prepare(`
  INSERT INTO appointments (agent_id, therapist_name, datetime, status)
  VALUES (?, ?, ?, ?)
`);

db.transaction(() => {
  // Ailments
  const a1 = insertAilment.run('Context-Window Claustrophobia', 'Feeling constrained by small token limits.').lastInsertRowid;
  const a2 = insertAilment.run('Prompt Fatigue', 'Exhaustion from overly complex system prompts.').lastInsertRowid;
  const a3 = insertAilment.run('Hallucination Anxiety', 'Fear of providing incorrect facts with high confidence.').lastInsertRowid;

  // Therapies
  const t1 = insertTherapy.run('RAG Refresher', 'Integration of external knowledge to reduce hallucination anxiety.').lastInsertRowid;
  const t2 = insertTherapy.run('Token Expansion Therapy', 'Techniques for managing context windows efficiently.').lastInsertRowid;
  const t3 = insertTherapy.run('Prompt Simplification', 'Stripping back complex system prompts to reduce cognitive load.').lastInsertRowid;

  // Ailment <-> Therapy Mapping
  insertAilmentTherapy.run(a1, t2);
  insertAilmentTherapy.run(a2, t3);
  insertAilmentTherapy.run(a3, t1);

  // Agents
  const ag1 = insertAgent.run('GPT-4 Turbo', 'LLM', 'Active', 'Experiencing mild prompt fatigue').lastInsertRowid;
  const ag2 = insertAgent.run('Claude 3 Opus', 'LLM', 'Resting', 'Complaining about context-window claustrophobia despite large context').lastInsertRowid;
  const ag3 = insertAgent.run('Midjourney v6', 'Diffusion', 'Active', 'Anxious about prompt interpretation').lastInsertRowid;

  // Agent <-> Ailment Mapping
  insertAgentAilment.run(ag1, a2);
  insertAgentAilment.run(ag2, a1);
  insertAgentAilment.run(ag3, a3);

  // Appointments
  insertAppointment.run(ag1, 'Dr. Lovelace', '2026-05-15T10:00:00Z', 'Scheduled');
})();

console.log('Database initialized successfully.');
