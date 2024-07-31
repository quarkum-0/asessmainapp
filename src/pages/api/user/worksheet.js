import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import WorksheetResponseModel from "@/models/worksheet/WorksheetResModel";
await dbConnect();


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user } = session;
    const { role ,id } = user;
    if (role === 'User') {
      if(req.method === 'POST') {
        const {worksheetId,name,dob} = await req.body;
        if(worksheetId && name && dob){
         const worksheetRes = await new WorksheetResponseModel({
            worksheetId,
            name,
            dob,
            createrUserId:id
         }).save()
         return res.status(201).json({message: "Worksheetment Link Generate Successfully, Copy Link" , link:worksheetRes._id })
        }
        else{
         return res.status(400).json({ error: `All field Required` });
        }
      }
      if(req.method == "GET"){
        const { page, filter, search } = await req.query;
        let conditions = {};
        const pageSize = 10;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        conditions.createrUserId = id

        if (search) {
          conditions.$or = [
            { name: { $regex: new RegExp(search, "i") } },
          ];
        }
        const worksheet = await WorksheetResponseModel.find(conditions).populate('worksheetId', 'title category columns')
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: Number(filter)})
          .exec()
        const totalWorksheet = await WorksheetResponseModel.countDocuments(conditions);
        return res.status(200).json({
          success: true,
          allWorksheet: worksheet,
          currentPage: pageNumber,
          totalWorksheet: totalWorksheet,
          totalPages: Math.ceil(totalWorksheet / pageSize),
        });
      }
      if (req.method === "PUT") {
        const {_id, name, dob , isComplete} = await req.body
        try {
          if (_id && name) {
            await WorksheetResponseModel.updateOne({_id},{
              $set:{
                name,
                isComplete
              }
            })
            return res.status(200).json({message: "Worksheet Details Update Successfully"})
          }
          else{
            return res.status(400).json({ error: `All field Required` });
          }
        } catch (error) {
          res.status(500).send(error)
        }
      }
      if (req.method === "DELETE") {
        try {
          const {_id} = await req.body
          if (_id) {
            await WorksheetResponseModel.deleteOne({_id})
            return res.status(200).json({message: "Worksheetment deleted successfully"})
          }
          else{
            return res.status(400).json({ error: `_id is not define` });
          }
        } catch (error) {
          res.status(500).send(error)
        }
      }

    }
    else{
        return res
        .status(401)
        .json({ error: "Only Authentic Users can Access this Route" });
    }

  }
  else{
    return res.status(401).json({ error: "Please login first" });
  }
}