import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import webinarModel from "@/models/webinar/WebinarModel";
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
          slug,
          price,
          description,
          category,
          image,
          date,
          time,
          url,
          featured
        } = await req.body;
        if (
          title &&
          description &&
          category &&
          image &&
          slug &&
          price &&
          date &&
          time &&
          url &&
          featured
        ) {
          const createWebinar = await new  webinarModel({
            title,
          slug,
          description,
          category,
          price,
          image,
          date,
          time,
          url,
          featured
          }).save();
          return res
            .status(201)
            .json({ message: "Webinar Created Successfully", createWebinar });
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
        const webinar = await  webinarModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalWebinar = await  webinarModel.countDocuments(conditions);
        res.status(200).json({
          success: true,
          allWebinar: webinar,
          currentPage: pageNumber,
          totalWebinar: totalWebinar,
          totalPages: Math.ceil(totalWebinar / pageSize),
        });
      }
      if (req.method === "PUT") {
        try {
          const {
            _id,
           title,
          slug,
          description,
          category,
          image,
          price,
          date,
          time,
          url,
          featured
          } = await req.body;
          if (_id &&
            title &&
            description &&
            category &&
            image &&
            slug &&
            price &&
            date &&
            time &&
            url &&
            featured
          ) {
            const updateWebinar = await  webinarModel.updateOne({_id},{
              $set: {title,
                slug,
                description,
                category,
                image,
                price,
                date,
                time,
                url,
                featured
            }
            })
            return res
              .status(200)
              .json({ message: "Webinar Updated Successfully", updateWebinar });
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
          await  webinarModel.deleteOne({_id});
          return res.status(200).json({message: "Webinar Deleted Successfully"})
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
