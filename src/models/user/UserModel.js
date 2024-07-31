import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: "User",
      index: true,
    },
  },
  {
    timestamp: true,
  }
);
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;