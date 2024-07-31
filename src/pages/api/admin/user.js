import dbConnect from "@/libs/db";
import UserModel from "@/models/user/UserModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
await dbConnect()
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user } = session;
    const { role, email } = user;
    if (role === "Admin") {
      if (req.method === "GET") {
        const { page, filter, search } = await req.query;
        let conditions = {};
        const pageSize = 10;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        // Filter
        if (filter === "Admin") {
          conditions.role = "Admin";
        } else if (filter === "User") {
          conditions.role = "User";
        }
        // Search
        if (search) {
          conditions.$or = [
            { name: { $regex: new RegExp(search, "i") } }, // Case-insensitive search for name
            { email: { $regex: new RegExp(search, "i") } }, // Case-insensitive search for email
          ];
        }

        const users = await UserModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ role: 1, _id: -1 })
          .exec();
          
        const totalUsers = await UserModel.countDocuments(conditions);
        res.status(200).json({
          success: true,
          data: users,
          currentPage: pageNumber,
          totalUsers: totalUsers,
          totalPages: Math.ceil(totalUsers / pageSize),
        });
      }
      if (req.method === "PUT") {
        try {
          const { role, _id } = await req.body;
          const user = await UserModel.updateOne(
            { _id },
            {
              $set: {
                role,
              },
            }
          );
          return res
            .status(200)
            .json({ message: `Successfully Updated Role to ${role}` }, user);
        } catch (error) {
          return res
            .status(500)
            .json({ error: `Internal Server Error` }, error);
        }
      }
      if (req.method === "DELETE") {
        try {
          const {_id } = await req.body;
          const user = await UserModel.deleteOne( {_id} );
          return res
            .status(200)
            .json({ message: `User Successfully Deleted` }, user);
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
