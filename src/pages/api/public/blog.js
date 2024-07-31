import dbConnect from "@/libs/db";
import blogModel from "@/models/blogs/blogsModel";

await dbConnect();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { type } = await req.query;
        if (type === "all") {
          const { page, filter, search } = await req.query;
          let conditions = {};
        const pageSize = 15;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        if (filter) {
          conditions.category = filter;
        }
        if (search) {
          conditions.$or = [
            { title: { $regex: new RegExp(search, "i") } }, 
            { description: { $regex: new RegExp(search, "i") } }, 
            { slug: { $regex: new RegExp(search, "i") } },
            { category: { $regex: new RegExp(search, "i") } },
          ];
        }
        const blog = await blogModel.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalBlog = await blogModel.countDocuments(conditions);

        res.status(200).json({
          success: true,
          allBlog: blog,
          currentPage: pageNumber,
          totalBlog: totalBlog,
          totalPages: Math.ceil(totalBlog / pageSize),
        });
      }
      if (type === 'single') {
        const { _id } = await req.query;
        if (_id.length !== 24) {
          res.status(400).json({error:"Invalid blog Id"})
        }
        const blog = await blogModel.findById(_id);
        if (!blog || blog.length === 0) {
          res.status(404).json({error:"Blog not found with this Id"});
        }
        res.status(200).json({
          success: true,
          blog,
        });
      }
    }else{
      res.status(405).json({error:"Method not allowed"});
    }

}
  