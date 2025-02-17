const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// TODO: Add authentication middleware if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/payload", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const payloadSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  smokingStatus: String,
  payloadType: String,
  result: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Payload = mongoose.model("Payload", payloadSchema);

// Route to fetch all payloads
app.get("/api/payloads", async (req, res) => {
  const payloads = await Payload.find().sort({ createdAt: -1 });
  res.json(payloads);
});

// Route to fetch a single payload by ID
app.get("/api/payloads/:id", async (req, res) => {
  const payload = await Payload.findById(req.params.id);
  res.json(payload);
});

// Route to create a new payload
app.post("/api/payloads", async (req, res) => {
  const { name, dob, smokingStatus, payloadType } = req.body;
  const newPayload = new Payload({ name, dob, smokingStatus, payloadType });
  await newPayload.save();

  // Simulate asynchronous payload processing (e.g. using cloud functions, containerized jobs, etc.)
  setTimeout(async () => {
    newPayload.result = `Processed with ${payloadType}`;
    await newPayload.save();
  });

  res.json(newPayload);
});

// Optional routes for file upload, cloud integration, etc.
// e.g. app.post("api/upload");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
