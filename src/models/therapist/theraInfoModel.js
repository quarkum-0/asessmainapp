import mongoose from "mongoose";

const TherapistInfoSchema = new mongoose.Schema(
  {
    fullName:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    expierience:{
        type: String,
        required: true,
    },
    expertise:{
        type: String,
        required: true,
    },
    kyc:{
        type: String,
        required: true,
        default: 'submit'
    },
    remark:{
        type: String,
        required: true,
    },
    resume:{
        type: String,
    },
    bio:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    perHourFee:{
        solo:{
            type: Number,
            required: true,
        },
        couple:{
            type: Number,
            required: true,
        },
        child:{
            type: Number,
            required: true,
        }

    }
  },
  {
    timestamps: true,
  }
);
const therapistInfo =
  mongoose.models.Blog || mongoose.model("Therapist", TherapistInfoSchema);
export default therapistInfo;