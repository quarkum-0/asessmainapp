import dbConnect from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import blogModel from "@/models/blogs/blogsModel";
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
          slug,
          category,
          image,
          date,
          featured
        } = await req.body;
        if (
          title &&
          description &&
          slug &&
          category &&
          image &&
          date &&
          featured
        ) {
          const createBlog = await new   blogModel({
            title,
            description,
            slug,
            category,
            image,
            date,
            featured
          }).save();
          return res
            .status(201)
            .json({ message: " Blogment Created Successfully", createBlog });
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
            { slug: { $regex: new RegExp(search, "i") } },
            { category: { $regex: new RegExp(search, "i") } },
          ];
        }
        const blog = await   blogModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalBlog = await   blogModel.countDocuments(conditions);
        res.status(200).json({
          success: true,
          allBlog:  blog,
          currentPage: pageNumber,
          totalBlog: totalBlog,
          totalPages: Math.ceil(totalBlog / pageSize),
        });
      }
      if (req.method === "PUT") {
        try {
          const {
            _id,
            title,
            description,
            slug,
            category,
            image,
            date,
            featured
          } = await req.body;
          if (_id &&
            title &&
            description &&
            slug &&
            category &&
            image &&
            date &&
            featured
          ) {
            const updateBlog = await   blogModel.updateOne({_id},{
              $set: {title,
                description,
                slug,
                category,
                image,
                date,
                featured
            }
            })
            return res
              .status(200)
              .json({ message: " Blogment Updated Successfully", updateBlog });
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
          await blogModel.deleteOne({_id});
          return res.status(200).json({message: " Blogment Deleted Successfully"})
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
