import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  admin: {type: Boolean, required: true, default: false}
});

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);