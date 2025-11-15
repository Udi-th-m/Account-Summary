const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// serve frontend from /public
app.use(express.static(path.join(__dirname, "public")));

// load data file
function loadData() {
  const raw = fs.readFileSync(path.join(__dirname, "data.json"));
  return JSON.parse(raw);
}

// API: list companies
app.get("/api/companies", (req, res) => {
  const data = loadData();
  const companies = data.companies.map(c => ({ id: c.id, name: c.name }));
  res.json({ companies });
});

// API: get accounts for a company
app.get("/api/companies/:companyId/accounts", (req, res) => {
  const { companyId } = req.params;
  const data = loadData();
  const company = data.companies.find(c => c.id === companyId);
  if (!company) return res.status(404).json({ error: "Company not found" });
  const accounts = company.accounts.map(a => ({ id: a.id, name: a.name, balance: a.balance }));
  res.json({ accounts });
});

// API: get account detail (balance + transactions)
app.get("/api/companies/:companyId/accounts/:accountId", (req, res) => {
  const { companyId, accountId } = req.params;
  const data = loadData();
  const company = data.companies.find(c => c.id === companyId);
  if (!company) return res.status(404).json({ error: "Company not found" });
  const account = company.accounts.find(a => a.id === accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });
  res.json({ account });
});

// fallback to index.html for SPA-like behavior
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
