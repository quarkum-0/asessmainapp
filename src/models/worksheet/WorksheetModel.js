import mongoose from "mongoose";

const WorkSheetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    pdf: { type: String, required: true },
    category: { type: String, required: true },
    isOneTime: {
      type: Boolean,
      required: true,
    },
    columns: [
      {
        title: {
          type: String,
          required: true,
        },
        questions: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WorksheetModel =
  mongoose.models.Worksheet || mongoose.model("Worksheet", WorkSheetSchema);
export default WorksheetModel;
 