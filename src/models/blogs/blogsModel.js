import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured:{
      type: Boolean,
      default: false,
      index:true
    },
  },
  {
    timestamps: true,
  }
);
const blogModel =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default blogModel;