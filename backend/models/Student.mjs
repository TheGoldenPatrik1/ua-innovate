import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  school: {type: String, required: true},
  major: {type: String, required: true},
  job_type: {type: String, required: true, enum: ["Internship", "Full-Time"]},
  categories: {type: [String], required: true},
  location_prefs: {type: [String], required: true},
  grad_date: {type: String, required: true},
  phone: {type: String, required: true},
  linkedin: {type: String, required: false},
  interview_status: {type: String, required: true, enum: [
    "Pending Review", "First Round", "Final Round", "Offer Sent", "Hired"]},
  technical_score: {type: Number, required: false},
  behavioral_score: {type: Number, required: false},
  comments: {type: String, required: false},
  resume: {type: String, required: false}
});

export default mongoose.model('Student', studentSchema);