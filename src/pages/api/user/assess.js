import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import AssessResponseModel from "@/models/assess/AssessResModel";
await dbConnect();
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user } = session;
    const { role ,id } = user;
    if (role === 'User') {
      if(req.method === 'POST') {
        const {assessId,name,dob} = await req.body;
        if(assessId && name && dob){
         const assessRes = await new AssessResponseModel({
            assessId,
            name,
            dob,
            createrUserId:id
         }).save()
         return res.status(201).json({message: "Assessment Link Generate Successfully, Copy Link" , link:assessRes._id })
        }
        else{
         return res.status(400).json({ error: `All field Required` });
        }
      }
      if(req.method == "GET"){
        const { page, filter, search } = await req.query;
        console.log( page, filter, search);
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

        
        const assess = await AssessResponseModel.find(conditions).populate('assessId', 'title category')
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: Number(filter)})
          .exec()
        const totalAssess = await AssessResponseModel.countDocuments(conditions);
        return res.status(200).json({
          success: true,
          allAssess: assess,
          currentPage: pageNumber,
          totalAssess: totalAssess,
          totalPages: Math.ceil(totalAssess / pageSize),
        });
      }
      if (req.method === "PUT") {
        const {_id, name} = await req.body
        try {
          if (_id && name ) {
            await AssessResponseModel.updateOne({_id},{
              $set:{
                name
              }
            })
            return res.status(200).json({message: "User Details Update Successfully"})
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
            await AssessResponseModel.deleteOne({_id})
            return res.status(200).json({message: "Assessment deleted successfully"})
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