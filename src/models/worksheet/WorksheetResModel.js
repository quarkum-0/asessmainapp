import mongoose,{Schema} from "mongoose";
import User from "./user";
import Worksheet from "./worksheet";
const worksheetResponseSchema = new mongoose.Schema({
    createrUserId:{
       type:Schema.ObjectId,
       ref:User,
       index:true,
       required:true
    },
    name:{
       type:String,
       required:true
    },
    dob:{
       type:String,
       required:true
    },
    worksheetId:{
       type:Schema.ObjectId,
       ref:Worksheet,
       index:true,
       required:true
    },
    isTherapist : {
        type:Boolean,
        default:false,
        required:true
    },
    therapistId:{
        type:Schema.ObjectId,
        ref:User,
        index:true,
    },
    isComplete:{
       type:Boolean,
       default:false,
       required:true
    },
    columns: [
        {
         answers: [
            {
              type: String,
            },
          ],
          date:{
            type:String,
          }
        },
      ],
   
   },
   {timestamps:true}
   )
   const WorksheetResponseModel = mongoose.models.WorksheetResponse || mongoose.model("WorksheetResponse", worksheetResponseSchema);
   export default WorksheetResponseModel;