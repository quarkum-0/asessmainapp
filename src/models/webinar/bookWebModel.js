import mongoose from "mongoose";

const webinarBookSchema = new mongoose.Schema(
  {

    webinarId:{
        type:Schema.ObjectId,
        ref:Webinar,
    },
    userId:{
        type:Schema.ObjectId,
        ref:User,
    },
    isVerified:{
        type: Boolean,
        required:true,
        default:false
    }
  },
  {
    timestamps: true,
  }
);
const webinarBookModel =
  mongoose.models.Blog || mongoose.model("WebinarBooking", webinarBookSchema);
export default webinarBookModel;