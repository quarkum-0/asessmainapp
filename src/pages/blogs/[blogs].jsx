import blogData from "@/libs/blogData";
import Image from "next/image";
function Blogs({ blog }) {
  console.log(blog);

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-5 mx-auto flex flex-col">
        <div class="flex flex-col text-center w-full mb-5">
          <h2 class="text-xs text-blue-600 tracking-widest font-medium title-font mb-1">
            blogs
          </h2>
          <h1 class="text-4xl md:text-5xl font-medium title-font mb-4 text-gray-900">
          {blog.title}
          </h1>
        </div>
          <div class="lg:w-4/6 mx-auto flex flex-col justify-center items-center">
            <div class="rounded-lg w-full md:w-1/2 overflow-hidden">
              <Image
              width={500}
              height={500}
                alt="content"
                class="h-full w-full"
                src={blog.img}
              />
            </div>
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p
                  class="leading-relaxed text-lg mb-4"
                  dangerouslySetInnerHTML={{ __html: blog && blog.content }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const slug = params.blogs;
  console.log(slug);
  const blog = blogData.find((blog) => blog.slug === slug);
  return {
    props: {
      blog,
    },
  };
};

export default Blogs;
