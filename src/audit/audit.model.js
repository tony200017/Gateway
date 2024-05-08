const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  microservice: String,
  url: String,
  method: String,
  statusCode: Number,
  userId: String,
  userAgent: String,
  result: Object,
  success: Boolean,
  headers: Object,
  params: Object,
  body: Object,
});

const Audit = mongoose.model("Audit", auditSchema);

module.exports = Audit;
