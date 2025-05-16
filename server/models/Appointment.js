const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  date: String, // تنسيق YYYY-MM-DD
  time: String, // مثل "10:00"
  status: { type: String, enum: ["confirmed", "pending", "canceled", "failed"], default: "pending" },
  type: String,
  phone: String,
  doctor: String,
  notes: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);