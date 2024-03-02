import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  email: {type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  school: {type: String, required: true},
  major: {type: String, required: true},
  job_type: {type: String, required: true},
  categories: {type: [String], required: true},
  location_prefs: {type: [String], required: true},
  grad_date: {type: String, required: true},
  phone: {type: Number, required: true},
  linkedin: {type: String, required: false},
  interview_status: {type: String, required: true},
  interest: {type: Number, required: false},
  comments: {type: String, required: false}
});

export default mongoose.model('Student', studentSchema);