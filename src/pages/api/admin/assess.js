import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import  AssessModel from "@/models/assess/AssessModel";
await dbConnect();
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user } = session;
    const { role, email } = user;
    if (role === "Admin") {
      if (req.method === "POST") {
        const {
          title,
          description,
          category,
          image,
          questions,
          options,
          range,
        } = await req.body;
        if (
          title &&
          description &&
          category &&
          image &&
          questions &&
          options &&
          range
        ) {
          const createAssess = await new  AssessModel({
            title,
            description,
            category,
            image,
            questions,
            options,
            range,
          }).save();
          return res
            .status(201)
            .json({ message: "Assessment Created Successfully", createAssess });
        } else {
          return res.status(400).json({ error: `All field Required` });
        }
      }
      if (req.method === "GET") {
        const { page, filter, search } = await req.query;
        let conditions = {};
        const pageSize = 10;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        // Filter
        if (filter) {
          conditions.category = filter;
        }
        if (search) {
          conditions.$or = [
            { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive search for name
            { description: { $regex: new RegExp(search, "i") } }, // Case-insensitive search for email
            { options: { $regex: new RegExp(search, "i") } },
            { questions: { $regex: new RegExp(search, "i") } },
          ];
        }
        const assess = await  AssessModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalAssess = await  AssessModel.countDocuments(conditions);
        res.status(200).json({
          success: true,
          allAssess: assess,
          currentPage: pageNumber,
          totalAssess: totalAssess,
          totalPages: Math.ceil(totalAssess / pageSize),
        });
      }
      if (req.method === "PUT") {
        try {
          const {
            _id,
            title,
            description,
            category,
            image,
            questions,
            options,
            range,
          } = await req.body;
          if (_id &&
            title &&
            description &&
            category &&
            image &&
            questions &&
            options &&
            range
          ) {
            const updateAssess = await  AssessModel.updateOne({_id},{
              $set: {title,
              description,
              category,
              image,
              questions,
              options,
              range
            }
            })
            return res
              .status(200)
              .json({ message: "Assessment Updated Successfully", updateAssess });
          } else {
            return res.status(400).json({ error: `All field Required` });
          }
        } catch (error) {
          return res
            .status(500)
            .json({ error: `Internal Server Error` }, error);
        }
      }
      if (req.method === "DELETE") {
        try {
          const { _id } = await req.body;
          await  AssessModel.deleteOne({_id});
          return res.status(200).json({message: "Assessment Deleted Successfully"})
        } catch (error) {
          return res
            .status(500)
            .json({ error: `Internal Server Error` }, error);
        }
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
    } else {
      return res
        .status(401)
        .json({ error: "Only Admin can Access this Route" });
    }
  } else {
    return res.status(401).json({ error: "Please login first" });
  }
}
