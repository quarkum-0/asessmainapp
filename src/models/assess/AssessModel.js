import mongoose from "mongoose";

const assessSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: String,
        required: true,
      },
    ],
    options: [
      {
        type: String,
        required: true,
      },
    ],

    range: [
      {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const AssessModel = mongoose.models.Assess || mongoose.model("Assess", assessSchema);
export default AssessModel;
