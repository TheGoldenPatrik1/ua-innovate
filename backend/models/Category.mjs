import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {type: String, required: true},
  category: {type: String, required: true}
});

export default mongoose.model('Category', categorySchema);