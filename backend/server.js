const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// In-memory store
let leads = [];

app.use(cors());
app.use(express.json());

// POST /api/leads → Save new lead
app.post("/api/leads", (req, res) => {
  const { name, email, status, notes } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }
  const lead = { name, email, status, notes };
  leads.push(lead);
  res.status(201).json({ message: "Lead added", lead });
});

// GET /api/leads → Get all leads
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

app.listen(PORT, () => {
  console.log(`✅ Backend live at http://localhost:${PORT}`);
});
