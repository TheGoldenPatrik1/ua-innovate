import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
});

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);