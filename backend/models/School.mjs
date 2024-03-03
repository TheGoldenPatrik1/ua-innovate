import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  school: {type: String, required: true}
});

export default mongoose.model('School', schoolSchema);