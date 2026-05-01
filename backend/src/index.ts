import express from "express";
import path from "path";
import { renderHomePage } from "./views/home";
import { renderLayout } from "./views/layout";

const app = express();
const PORT = 3001;

// Serve static files (CSS, images, etc.) from public/
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req, res) => {
  const content = renderHomePage();
  res.send(renderLayout("AgentClinic", content));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
