import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Worksheet({ _id }) {
  const { status } = useSession();
  const [worksheet, setWorksheet] = useState(null);
  const [showColumns, setShowColumns] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const handleImageLoad = () => {
    setImageLoad(true);
  };
  const router = useRouter();
  const loadData = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/public/worksheet?_id=${_id}&type=single`,
      }).then(function ({ data }) {
        setTimeout(() => {
          setWorksheet(data.worksheet);
        }, 800);
      });
    } catch (error) {
      toast.error(error.response.data.error);
      if (
        error.response.data.error === "Invalid Worksheet Id" ||
        error.response.data.error === "Worksheet not found with this Id"
      ) {
        setTimeout(() => {
          router.push("/worksheet");
        }, 2000);
      }
      console.log(error);
    }
  };
  let e = 0;
  useEffect(() => {
    if (e === 0) {
      loadData();
      e++;
    }
  }, []);
  console.log(worksheet);

  if (!worksheet) {
    const arr = [1, 2, 3, 4, 5, 6];
    return (
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <div class="text-sm h-5 w-28 title-font rounded-lg bg-gray-500 tracking-widest animate-pulse"></div>
              <h1 class="text-gray-900 h-10 mt-1 w-full rounded-lg text-3xl title-font font-medium mb-4 bg-gray-500  animate-pulse">
                {/* {worksheet.title} */}
              </h1>

              <div class="flex mb-4">
                <a class="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <div className="leading-relaxed mb-4 gap-2">
                {arr.map((e) => (
                  <p
                    key={e}
                    className="h-4 w-full mb-1 bg-gray-500 animate-pulse rounded-lg"
                  ></p>
                ))}
              </div>

              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Total Columns</span>
                <span class="ml-auto bg-gray-500 h-5 w-20 animate-pulse rounded-lg">
                  {/* {worksheet.questions.length}
                   */}
                </span>
              </div>
       
              <div className="ml-auto bg-blue-500 h-10 w-full animate-pulse rounded-lg mb-5"></div>
              
              <div class="flex">
              <button class="flex ml-auto h-10 w-32 animate-pulse text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded">
                </button>
                <button class="flex ml-auto h-10 w-32 animate-pulse text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded">
                  {LinkModalComp()}
                </button>
              </div>
            </div>
            <div className=" lg:w-1/2 w-full lg:h-[65vh] h-64 rounded animate-pulse bg-gray-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              {worksheet.category}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
              {worksheet.title}
            </h1>

            <div class="flex mb-4">
              <a class="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">
                Description
              </a>
            </div>

            <p class="leading-relaxed mb-4">{worksheet.description}</p>
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">Total Columns</span>
              <span class="ml-auto text-gray-900">
                {worksheet.columns.length}
              </span>
            </div>
            <div class="flex border-t border-b mb-6 flex-col border-gray-200 py-2">
              <span class="text-gray-100 rounded-md p-2 bg-blue-600 cursor-pointer" onClick={()=>setShowColumns(!showColumns)}>{showColumns ? 'hide Colums' : 'View Colums'}</span>
              <div className={`${showColumns ? '' : 'hidden'}`}>
                <table className="border border-gray-500 mt-3">
                    <thead>
                        {worksheet.columns.map((i)=>(
                        <th className="border border-gray-500 p-2">
                         {i.title}
                        </th>))}
                    </thead>
                    <tbody>
                  
                        <tr className="border border-gray-500 p-2">
                        {worksheet.columns.map((i)=>( 
                            <td className="border border-gray-500 p-2 ">
                                {i.questions.map((item,index)=>(<p className="mb-1">{index +1}. {item}</p>))}
                            </td>
                         ))} 
                        </tr>
                    </tbody>
                </table>
              </div>


              <span class="ml-auto text-gray-900">
                {/* <ul className="list-disc">
                  {worksheet.range.map((e) => (
                    <li>
                      {e.status} - ({e.min}-{e.max})
                    </li>
                  ))}
                </ul> */}
              </span>
            </div>
            <div class="flex justify-between items-center w-full">
              <Link
              href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${worksheet.pdf}`}
                class="flex ml-auto text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded"
              > Download Pdf
              </Link>
              <button
                onClick={() => {
                  if (status === "authenticated") {
                    setLinkModal(true);
                  } else if (status === "unauthenticated") {
                    toast.warn("Please Sign in First to Create Link");
                  }
                }}
                class="flex ml-auto text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded"
              >
                Create Link
              </button>
            </div>
          </div>
          <Image
            width={1000}
            height={1000}
            priority
            onLoad={handleImageLoad}
            alt="Worksheet"
            class={`${
              !imageLoad && "hidden"
            } lg:w-1/2 w-full lg:h-full h-full object-cover object-center rounded`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${worksheet.image}`}
          />
          {!imageLoad && (
            <div className=" lg:w-1/2 w-full lg:h-[65vh] h-64 rounded animate-pulse bg-gray-500"></div>
          )}
        </div>
        {LinkModalComp()}
      </div>
    </section>
  );

  function LinkModalComp() {
    const getDate = () =>{
      const day = new Date().getDate()
      const month = new Date().getMonth() + 1
      const year = new Date().getFullYear()
      return `${day}-${month}-${year}`
    }
    const [linkData, setLinkData] = useState({
      name: "",
      link: null,
    });
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyLink = () => {
      const tempInput = document.createElement("input");
      tempInput.value = linkData.link;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };
    const handleGenrateLink = async (e) => {
      e.preventDefault();
      try {
        const createToast = toast.loading("Please wait...");
        await axios({
          method: "post",
          url: "/api/user/worksheet",
          data: {
            worksheetId:worksheet._id,
            name:linkData.name,
            dob: getDate(),
          },
        })
          .then(function ({ data }) {
            setLinkData((prevState) => ({...prevState,link: `${process.env.NEXT_PUBLIC_WEB_URL}/tests/worksheet/${data.link}`,}))
            toast.update(createToast, {
              render: data.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          })
          .catch(function (error) {
            console.log(error);
            toast.update(createToast, {
              render: error.response.data.error,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          });
      } catch (err) {
        console.error(err);
      }
};
    return (
      <div
        class={`${
          !linkModal && "hidden"
        }  overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400 max-h-[90vh] ">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-900 ">
                Generate Worksheet Link
              </h3>
              <button
                type="button"
                onClick={() => {
                  setLinkModal(false);
                  setLinkData({
                    name: "",
                    link: null,
                  });
                }}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleGenrateLink}>
              <div class="mb-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name Of Patient
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={linkData.name}
                    onChange={(e) =>
                      setLinkData((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    placeholder="Type Name Of Patient"
                    required
                  />
                </div>
                
              </div>
              <div>
                {linkData.link !== null && (
                  <div className="relative">
                    <label
                      htmlFor="link"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      disabled
                      id="link"
                      value={linkData.link}
                      onChange={(e) =>
                        setLinkData((prevState) => ({
                          ...prevState,
                          link: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border opacity-50 mb-5 border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pr-10" // Added pr-10 for padding-right
                      placeholder="Type Link Here"
                      required
                    />
                    {/* Copy icon */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="absolute inset-y-0 right-0 -bottom-6 flex items-center px-3  text-blue-500  rounded-r-lg "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path>
                        <path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                      </svg>
                    </button>
                  </div>
                )}
                {isCopied && (
                  <span className="ml-2 my-8 text-green-600">Copied!</span>
                )}
              </div>

              {linkData.link === null && <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Generate Link
              </button>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const getServerSideProps = async ({ params }) => {
  const _id = params.worksheet;
  return { props: { _id } };
};
