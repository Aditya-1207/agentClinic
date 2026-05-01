import express from "express";
import path from "path";
import { renderHomePage } from "./views/home";
import { renderLayout } from "./views/layout";

export const app = express();

// Serve static files (CSS, images, etc.) from public/
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req, res) => {
  const content = renderHomePage();
  res.send(renderLayout("AgentClinic", content));
});
