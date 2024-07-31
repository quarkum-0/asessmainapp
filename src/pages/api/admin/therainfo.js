import dbConnect from "@/libs/db";
import therapistInfo from "@/models/therapist/theraInfoModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
await dbConnect()
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { user} = session;
    const { role, email } = user;
    if (role === "Admin") {
      if (req.method === "GET") {
        const { page, search } = await req.query;
        let conditions = {};
        const pageSize = 10;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        // Search
        if (search) {
          conditions.$or = [
            { fullName: { $regex: new RegExp(search, "i") } }, 
            { expertise: { $regex: new RegExp(search, "i") } }, 
          ];
        }

        const Therapists = await therapistInfo.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ role: 1, _id: -1 })
          .exec();
          
        const totaltherapists = await therapistInfo.countDocuments(conditions);
        res.status(200).json({
          success: true,
          data: Therapists,
          currentPage: pageNumber,
          totaltherapists: totaltherapists,
          totalPages: Math.ceil(totaltherapists / pageSize),
        });
      }
      if (req.method === "PUT") {
        try {
          const { kyc,remark, _id } = await req.body;
          const Therapist = await therapistInfo.updateOne(
            { _id },
            {
              $set: {
                kyc,
                remark
              },
            }
          );
          return res
            .status(200)
            .json({ message: `Successfully Updated to ${kyc}` }, Therapist);
        } catch (error) {
          return res
            .status(500)
            .json({ error: `Internal Server Error` }, error);
        }
      }
      if (req.method === "DELETE") {
        try {
          const {_id } = await req.body;
          const Therapist = await therapistInfo.deleteOne( {_id} );
          return res
            .status(200)
            .json({ message: `therapist Successfully Deleted` }, Therapist);
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
