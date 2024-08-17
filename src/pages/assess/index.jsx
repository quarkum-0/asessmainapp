import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import ListComp from "@/components/common/ListComp";
import Image from "next/image";
import category from "@/libs/category";

export const getServerSideProps = async ({ query }) => {
  const curruntPage = Number(query.page) || 1;
  return { props: { curruntPage } };
};

export default function Asess({ curruntPage }) {
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const router = useRouter();

  const categoryOptions = [
    "Mental health",
    "Disorder",
    "Self Care",
    "Child",
    "Personality",
    "Sleep",
    "PTSD",
    "Relationship",
    "Addiction",
  ];
  const handleCheckboxChange = (value) => {
    if (filter === value) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  const loadData = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/public/assess?page=${curruntPage}&search=${search}&filter=${filter}&type=all`,
      }).then(function ({ data }) {
        setTimeout(() => {
          setData(data.allAssess);
        }, 800);
        setTotalPage(data.totalPages);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData(null);
    loadData();
  }, [curruntPage, search, filter]);

  const NotFound = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl font-bold mb-4 text-black">
            Assessments Not Found
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            We couldn't find the assess .
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  };

  const SkeletonCourse = () => {
    const array = [1, 2, 3];

    return array.map((i) => (
      <div
        key={i}
        className="w-full max-w-sm h-fit rounded-lg shadow bg-white border-2 border-blue-600 animate-pulse"
      >
        <div className="h-56 w-full p-3 mb-6">
          <div className="rounded-lg h-full bg-gray-500"></div>
        </div>
        <div className="px-3 pb-5">
          <div className=" h-6 rounded-lg w-40 bg-gray-500"></div>
          <div className="flex items-center mt-2.5 mb-5 gap-2">
            <span className=" h-4 w-20 px-2.5 py-0.5 rounded bg-blue-600 "></span>
            <span className=" h-4 w-20 px-2.5 py-0.5 rounded bg-blue-600 "></span>
          </div>
          <div className="flex items-center  justify-between">
           
          </div>
        </div>
      </div>
    ));
  };
  const text = "Hy I Have Query";

  return (
    <>
      <main className="">
        <section class="md:px-20 text-gray-600 bg-blue-200 body-font flex items-center">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 class="title-font lg:text-5xl xl:text-6xl text-3xl mb-4 font-medium text-gray-900">
                We make it easier for you to self assess every psychological
                issue.
              </h1>
              <p class="mb-8 leading-relaxed md:block hidden">
                Offering over 100 assessments in various categories, for a wide
                range of disorders, mental illnesses, and various personality
                factors. We are planning to offer our own Professional
                Assessments in the near future. We also offer western
                assessments with their results, which are widely popular.
              </p>
              <div class="flex justify-center">
                <Link
                  href={`https://wa.me/918120148209?text=${text}`}
                  class="ml-4 flex justify-center items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(11, 239, 50, 1)" }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                    ></path>
                  </svg>{" "}
                  Now
                </Link>
              </div>
            </div>
            <div class="lg:max-w-lg h-full lg:w-full md:w-1/2 w-5/6 bg-white relative">
              <div className="fade-left-to-right  w-full h-24 md:w-44 md:h-full absolute"></div>
              <Image
                width={500}
                height={500}
                priority
                class="object-cover object-center rounded w-full h-full"
                alt="hero"
                src="/hero.jpg"
              />
            </div>
          </div>
        </section>
        <section class="text-gray-600 body-font bg-blue-100 md:px-20">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full ">
              <h1 class="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-900">
                Categories
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base md:block hidden mb-10">
                This are the categories we offer right now, later on it will
                move to 12 different categories with to cover all the areas of
                life .
              </p>
            </div>
            <div class="flex flex-wrap justify-center items-center -m-4">
              <div class="portfolio-container">
                {category?.map((i) => (
                  <Link
                    key={i.link}
                    onClick={() => {
                      setFilter(i.title);
                    }}
                    href={`/assess#tests`}
                  >
                    <div
                      class="portfolio-box"
                      data-sr-id="14"
                      style={{
                        visibility: "visible",
                        opacity: 1,
                        transform:
                          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                        transition:
                          "opacity 2s cubic-bezier(0.5, 0, 0, 1) 0.2s, transform 2s cubic-bezier(0.5, 0, 0, 1) 0.2s",
                      }}
                    >
                      <Image
                        width={500}
                        height={500}
                        priority
                        src={i.img}
                        alt=""
                      />
                      <div class="portfolio-layar">
                        <h4>{i.title}</h4>

                        <Link
                          onClick={() => {
                            setFilter(i.title);
                          }}
                          href={`/assess#tests`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "#058eff" }}
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M9.293 7.707 13.586 12l-4.293 4.293 1.414 1.414L16.414 12l-5.707-5.707z"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <section id="tests" className="text-gray-400  body-font">
        <form className="py-5 px-2 md:px-40">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="block w-full p-4 pl-10 text-sm border  rounded-lg     placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              placeholder="Assessments ..."
              required
            />
            <div className="text-white absolute right-2.5 bottom-[0.55rem]  rounded-lg text-sm">
              <button
                id="filterDropdownButton"
                onClick={() => setFilterModal(!filterModal)}
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200    0  "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-4 w-4 mr-2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                {filter ? filter : "Filter"}
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
              <div
                id="filterDropdown1"
                className={`z-10 ${
                  !filterModal && "hidden"
                } border absolute min-w-fit p-3 bg-white rounded-lg shadow `}
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                  Category
                </h6>
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="filterDropdownButton"
                >
                  {categoryOptions.map((i) => (
                    <li className="flex items-center">
                      <input
                        id={i}
                        type="checkbox"
                        value={i}
                        checked={filter === i}
                        onChange={() => handleCheckboxChange(i)}
                        className="w-4 h-4 border rounded focus:ring-3 outline-blue-500 bg-blue-700 border-blue-600 focus:ring-blue-600 focus:ring-offset-blue-800"
                      />
                      <label
                        htmlFor={i}
                        className="ml-2 text-sm font-medium text-gray-900 "
                      >
                        {i}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>
        <div className="container px-5 py-10 mx-auto flex flex-wrap gap-5 justify-center min-h-[50vh]">
          {data &&
            data.length !== 0 &&
            data?.map((item) => (
              <ListComp
                key={item._id}
                {...{
                  Name: item.title,
                  imageLink: item.image,
                  type: "Asessment",
                  Category: item.category,
                  Id: item._id,
                }}
              />
            ))}
          {!data && <SkeletonCourse />}
          {data && data?.length === 0 && <NotFound />}
        </div>

        {totalPage !== 0 && (
          <div className="flex justify-center py-10">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <Link
                  href={
                    curruntPage !== 1 ? `/assess?page=${curruntPage - 1}` : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight  border  rounded-l-lg   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </Link>
              </li>
              {curruntPage === 1 || curruntPage - 2 === 0 ? (
                ""
              ) : (
                <li>
                  <Link
                    href={
                      curruntPage !== 1 ? `/assess?page=${curruntPage - 2}` : ""
                    }
                    className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                  >
                    {curruntPage - 2}
                  </Link>
                </li>
              )}
              {curruntPage === 1 ? (
                ""
              ) : (
                <li>
                  <Link
                    href={
                      curruntPage !== 1 ? `/assess?page=${curruntPage - 1}` : ""
                    }
                    className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                  >
                    {curruntPage - 1}
                  </Link>
                </li>
              )}
              {/* active */}
              <li>
                <Link
                  href={`/assess?page=${curruntPage}`}
                  aria-current="page"
                  className="cursor-pointer z-10 flex items-center justify-center px-3 h-8 leading-tight border hover:bg-blue-700 hover:text-blue-100 border-gray-700 bg-blue-600 text-white"
                >
                  {curruntPage}
                </Link>
              </li>

              {curruntPage === totalPage ? (
                ""
              ) : (
                <li>
                  <Link
                    href={
                      curruntPage !== totalPage
                        ? `/assess?page=${curruntPage + 1}`
                        : ""
                    }
                    className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                  >
                    {curruntPage + 1}
                  </Link>
                </li>
              )}
              {curruntPage === totalPage || curruntPage + 1 === totalPage ? (
                ""
              ) : (
                <li>
                  <Link
                    href={
                      curruntPage !== totalPage
                        ? `/assess?page=${curruntPage + 2}`
                        : ""
                    }
                    className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                  >
                    {curruntPage + 2}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={
                    curruntPage !== totalPage
                      ? `/assess?page=${curruntPage + 1}`
                      : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight  border  rounded-r-lg   bg-gray-100 border-gray-400 text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
