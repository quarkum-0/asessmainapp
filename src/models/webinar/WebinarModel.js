import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
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
    price:{
    type: Number,
      required: true,
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
    time: {
        type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url:{
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
const webinarModel =
  mongoose.models.Blog || mongoose.model("Webinar", webinarSchema);
export default webinarModel;