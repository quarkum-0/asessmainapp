import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    therapistId:{
        type:Schema.ObjectId,
        ref:User,
        index:true,
    },
    userId:{
        type:Schema.ObjectId,
        ref:User,
        index:true,
    },
    status:{
      type: String,
      required:true,
    },
    time:{
        type: String,
        required:true,
    },
    mode:{
        type: String,
        required:true,
        default:"Video"
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const bookingModel =
  mongoose.models.Blog || mongoose.model("Booking", bookingSchema);
export default bookingModel;