const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req,res) => {
  res.json({
    name:"SecureNation",
    status:"online",
    message:"Digital safety services are operational"
  });
});

app.post("/api/report", (req,res) => {
  const { type, description } = req.body || {};
  if (!type || !description) {
    return res.status(400).json({success:false,message:"Please provide incident type and description."});
  }
  res.json({
    success:true,
    message:"Incident report received successfully.",
    reference:"SN-" + Date.now().toString().slice(-8)
  });
});

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SecureNation running on port ${PORT}`);
});
