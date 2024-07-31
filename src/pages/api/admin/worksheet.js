import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import WorksheetModel from "@/models/worksheet/WorksheetModel";
await dbConnect();
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user } = session;
    const { role } = user;
    if (role === "Admin") {
      if (req.method === "POST") {
        const {
          title,
          description,
          category,
          image,
          pdf,
          columns,
          isOneTime
        } = await req.body;

        if (
          title &&
          description &&
          category &&
          image &&
          pdf &&
          columns 
        ) {
          const createWorksheet = await WorksheetModel({
            title,
            description,
            category,
            image,
            pdf,
            columns,
            isOneTime
          }).save();
          return res
            .status(201)
            .json({ message: "Worksheetment Created Successfully", createWorksheet });
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
            { columns:{title: { $regex: new RegExp(search, "i") }} }
          ];
        }
        const worksheet = await WorksheetModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalWorksheet = await WorksheetModel.countDocuments(conditions);
        res.status(200).json({
          success: true,
          allWorksheet: worksheet,
          currentPage: pageNumber,
          totalWorksheet: totalWorksheet,
          totalPages: Math.ceil(totalWorksheet / pageSize),
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
            pdf,
            columns,
            isOneTime
          } = await req.body;
          if (_id &&
            title &&
            description &&
            category &&
            image &&
            pdf &&
            columns 
          ) {
            const updateWorksheet = await WorksheetModel.updateOne({_id},{
              $set: {title,
              description,
              category,
              image,
              pdf,
              columns,
              isOneTime
            }
            })
            return res
              .status(200)
              .json({ message: "Worksheetment Updated Successfully", updateWorksheet });
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
          await WorksheetModel.deleteOne({_id});
          return res.status(200).json({message: "Worksheetment Deleted Successfully"})
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
