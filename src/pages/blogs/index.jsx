import blogsData from "@/libs/blogData";
import Link from "next/link";
import Image from "next/image";
export default function Blogs() {

  
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 md:px-20 py-10 mx-auto">
        <div class="flex flex-col text-center w-full mb-5">
          <h2 class="text-xs text-blue-600 tracking-widest font-medium title-font mb-1">
            blogs
          </h2>
          <h1 class="text-4xl md:text-5xl font-medium title-font mb-4 text-gray-900">
            Our Blogs
          </h1>
        </div>
        <div class="flex w-full flex-wrap md:-m-4 ">

          {blogsData.map(i=><div className="w-full md:w-1/3 h-60 md:h-52 lg:h-64 xl:h-80 p-4 " key={i.slug}><Link href={`/blogs/${i.slug}`}  class="relative w-full">
            
            
              <Image
              width={500}
              height={500}
                class="w-full h-full rounded-lg object-cover object-center absolute "
                src={i.img}
                alt="blog"
              />
              <div class="h-full relative bg-black bg-opacity-30 z-10 rounded-lg  ">
              <div class="p-4 flex flex-col justify-between items-start h-full">
                <h2 class="tracking-widest text-xs title-font font-medium bg-blue-600 rounded-md px-2 py-1 w-fit text-gray-200 mb-1">
                  {i.category}
                </h2>

                <div className="items-start ">
                <h1 class="title-font text-base lg:text-2xl  font-semibold text-gray-100 mb-3">
                  {i.title}
                </h1>
                <div class="flex items-center flex-wrap w-fit">
                  <span class="text-gray-200 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      class="w-4 h-4 mr-1"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                    >
                     <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>
                    {i.author}
                  </span>
                  <span class="text-gray-200 inline-flex items-center leading-none text-sm">
                    <svg
                      class="w-4 h-4 mr-1"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                    >
                     <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
                    </svg>
                    {i.date}
                  </span>
                </div>
                </div>
              </div>
            </div>
          </Link></div>)}

        </div>
      </div>
    </section>
  );
}
