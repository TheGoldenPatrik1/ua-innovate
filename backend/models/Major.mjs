import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
  major: {type: String, required: true}
});

export default mongoose.model('Major', majorSchema);