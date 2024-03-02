import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
  id: {type: String, required: true},
  major: {type: String, required: true}
});

export default mongoose.model('Major', majorSchema);