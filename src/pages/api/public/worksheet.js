import dbConnect from "@/libs/db";
import WorksheetModel from "@/models/worksheet/WorksheetModel";

await dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { type } = await req.query;
    if (type === "all") {
      const { page, filter, search } = await req.query;
      let conditions = {};
      const pageSize = 16;
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * pageSize;
      if (filter) {
        conditions.category = filter;
      }
      if (search) {
        conditions.$or = [
          { title: { $regex: new RegExp(search, "i") } },
          { description: { $regex: new RegExp(search, "i") } },
          { options: { $regex: new RegExp(search, "i") } },
          { questions: { $regex: new RegExp(search, "i") } },
        ];
      }
      const worksheet = await WorksheetModel.find(conditions)
        .skip(skip)
        .limit(pageSize)
        .sort({ _id: -1 })
        .select("-pdf -columns")
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
    if (type === "single") {
      const { _id } = await req.query;
      if (_id.length !== 24) {
        res.status(400).json({ error: "Invalid WorksheetModelment Id" });
      }
      const worksheet = await WorksheetModel.findById(_id);
      if (!worksheet || worksheet.length === 0) {
        res.status(404).json({ error: "Worksheetment not found with this Id" });
      }
      res.status(200).json({
        success: true,
        worksheet,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
