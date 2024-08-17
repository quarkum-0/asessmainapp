import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Index() {
  const [filterModal, setFilterModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [linkData, setLinkData] = useState(null);

  const filterOptions = [
    { value: -1, text: "New to Old" },
    { value: 1, text: "Old To New" },
  ];
  // search & filter files
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(-1);
  const [allWorksheet, setAllWorksheet] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(null);

  const fetchData = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/user/worksheet?page=${page}&search=${search}&filter=${filter}`,
      }).then(function ({ data }) {
        setTimeout(() => {
          setAllWorksheet(data.allWorksheet);
        }, 800);
        setTotalDocs(data.totalWorksheet);
        setTotalPage(data.totalPages);
        setPage(data.currentPage);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter()
  useEffect(() => {
router.push('/user/worksheet#')
    setAllWorksheet(null)
    fetchData();
  }, [page, filter, search]);

  const handleCheckboxChange = (value) => {
    if (filter === value) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };
  const setFunc = (id) => {
    setLinkData(allWorksheet.find((item) => item._id === id));
  };

  function updateModalComp() {
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const createToast = toast.loading("Please wait...");
        await axios({
          method: "put",
          url: "/api/user/worksheet",
          data: {
            _id: linkData._id,
            name: linkData.name,
            isComplete: linkData.isComplete,
          },
        })
          .then(function ({ data }) {
            fetchData();
            toast.update(createToast, {
              render: data.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            setTimeout(() => {
              setUpdateModal(false);
              setLinkData(null);
            }, 2000);
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
          !updateModal && "hidden"
        }  overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400 max-h-[90vh] ">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-900 ">
                Update Patient Details
              </h3>
              <button
                type="button"
                onClick={() => {
                  setUpdateModal(false);
                  setLinkData(null);
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
            <form onSubmit={handleUpdate}>
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
                    value={linkData?.name}
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

               

                <div className="sm:col-span-2">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Is Complete
                  </label>
                  <select
                    id="category"
                    required
                    defaultValue={linkData?.isComplete}
                    onChange={(e) =>
                      setLinkData((prevState) => ({
                        ...prevState,
                        isComplete: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {" "}
                    <option value={false}>Not Yet</option>
                    <option value={true}>Completed</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update User Details
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function ViewModalComp() {
    return (
      <div
        class={`${
          !viewModal && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400 max-h-[90vh] overflow-y-scroll">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-900 text-center">
                {linkData?.worksheetId.title}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setViewModal(false);
                  setLinkData(null);
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

            <div id="download-data" className="">
              <table width="100%" border={true}>
                <thead>
                  <th className="border border-gray-600 p-2">Name</th>
                  <th className="border border-gray-600 p-2">Date</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-500 p-2">
                      {linkData?.name}
                    </td>
                    <td className="border border-gray-500 p-2">
                      {linkData?.dob}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="border w-full border-gray-500 mt-3"
                border={true}
              >
                <thead>
                  <th className="border border-gray-500 p-2">Time</th>
                  {linkData?.worksheetId.columns.map((i) => (
                    <th className="border border-gray-500 p-2">
                      <p className="font-bold">{i.title}</p>
                      {i.questions.map((item, index) => (
                        <p className="mb-1 text-gray-500 font-normal">
                          {index + 1}. {item}
                        </p>
                      ))}
                    </th>
                  ))}
                </thead>
                <tbody>
                {linkData?.columns.map((i) => (   <tr className="border border-gray-500 p-2">
                    
                      <>
                        <td>{i.date}</td>
                        {i?.answers?.map((item) => (
                          <td className="font-medium border border-gray-500 p-2 text-gray-500 ">
                            <p className="mb-1"> {item}</p>
                          </td>
                        ))}
                      </>
                  
                  </tr>))}
                </tbody>
              </table>
            </div>

            <button
            class="text-white mt-5 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => {
                const printContentById = (id) => {
                  const content = document.getElementById(id).innerHTML;
                  const printWindow = window.open("", "_blank");
                  printWindow.document.write(`
                      <html>
                        <head>
                          <title>Print</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>${content}${process.env.NEXT_PUBLIC_WEB_URL}</body>
                      </html>
                    `);
                  printWindow.document.close();
                  setTimeout(() => {
                    printWindow.print();
                  }, 800);
                };

                printContentById("download-data");
              }}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    );
  }
  function pagination() {
    return (
      <>
        {" "}
        {page !== 1 && (
          <li>
            <a
              onClick={() => {
                setPage(page - 1);
              }}
              className="flex cursor-pointer items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        )}
        {page !== 1 && (
          <li>
            <a
              onClick={() => {
                setPage(page - 1);
              }}
              className="flex cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              {page - 1}
            </a>
          </li>
        )}
        <li>
          <a className="flex cursor-pointer items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700">
            {page}
          </a>
        </li>
        {page !== totalPage && (
          <li>
            <a
              onClick={() => setPage(page + 1)}
              className="flex cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              {page + 1}
            </a>
          </li>
        )}
        {page !== totalPage && (
          <li>
            <a
              onClick={() => setPage(page + 1)}
              className="flex cursor-pointer items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        )}
      </>
    );
  }
  function deleteModalComp() {
    const handleDelete = async (e) => {
      e.preventDefault();
      try {
        const toastUpdate = toast.loading("Please wait...");
        axios({
          method: "delete",
          url: `/api/user/worksheet`,
          data: linkData,
        })
          .then(function ({ data }) {
            fetchData();
            toast.update(toastUpdate, {
              render: data.message,
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            setTimeout(() => {
              setDeleteModal(false);
            }, 2000);
          })
          .catch(function (error) {
            toast.update(toastUpdate, {
              render: error.response.data.error,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !deleteModal && "hidden"
        } flex   overflow-y-auto overflow-x-hidden fixed top-1/2 right-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
      >
        <div className="relative p-4 w-full max-w-md max-h-full ">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5 border-2 border-blue-300">
            <button
              type="button"
              onClick={() => {
                setDeleteModal(false);
              }}
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400  w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-4 text-gray-500 ">
              Are you sure you want to delete this Worksheetment?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => {
                  setDeleteModal(false);
                }}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10"
              >
                No, cancel
              </button>
              <button
                type="submit"
                onClick={handleDelete}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300   "
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!allWorksheet) {
    const userDemoOptions = [1, 2, 3, 4];

    return (
      <section className="bg-gray-200  p-3 sm:p-5 antialiased">
        {ViewModalComp()}
        {deleteModalComp()}
        {updateModalComp()}
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="flex flex-col text-center w-full mb-5 justify-center items-center">
            <div className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1 bg-gray-400 w-32 h-4 rounded-lg animate-pulse"></div>
            <div className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 bg-gray-400 w-96 h-10 rounded-lg animate-pulse"></div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>

          <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-blue-300 outline-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto relative">
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
                    Filter
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
                    id="filterDropdown"
                    className={`z-10 ${
                      !filterModal && "hidden"
                    } border min-w-fit p-3 bg-white rounded-lg shadow absolute`}
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                      Role
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="Administrator"
                          type="checkbox"
                          value="Admin"
                          checked={filter === "Admin"}
                          onChange={() => handleCheckboxChange("Admin")}
                          className="w-4 h-4 border rounded focus:ring-3  bg-blue-700 border-blue-600 focus:ring-blue-600 focus:ring-offset-blue-800"
                        />
                        <label
                          htmlFor="Administrator"
                          className="ml-2 text-sm font-medium text-gray-900 "
                        >
                          Admin
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="User"
                          type="checkbox"
                          value="User"
                          checked={filter === "User"}
                          onChange={() => handleCheckboxChange("User")}
                          className="w-4 h-4 bg-gray-100 border-blue-300 rounded text-blue-600 focus:ring-blue-500   focus:ring-2  "
                        />
                        <label
                          htmlFor="User"
                          className="ml-2 text-sm font-medium text-gray-900 "
                        >
                          User
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 rounded-lg">
                  <tr>
                    <th scope="col" className="px-4 py-3 ">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      DOB
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Worksheet Name
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Status
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      View
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {userDemoOptions?.map((i) => (
                    <tr className="border-b " key={i}>
                      <th
                        scope="row"
                        className="px-4 py-3 min-w-40 font-medium text-gray-900 whitespace-nowrap inline-flex justify-start items-center gap-2"
                      >
                        <div className="h-5 w-40 rounded-lg bg-gray-500 animate-pulse" />
                      </th>
                      <td className="px-4 py-3 ">
                        <div className="h-5 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3 ">
                        <div className="h-5 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3 ">
                        <div className="h-5 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-20 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3 flex items-center justify-center gap-3">
                        <button className="text-blue-500 animate-pulse">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(15, 108, 243, 1)" }}
                          >
                            <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                            <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                          </svg>
                        </button>

                        <button className="text-red-600 w-8 h-8 animate-pulse">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(255, 3, 3, 1)" }}
                          >
                            <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav
              className="flex flex-col md:flex-row justify-between items-start animate-pulse md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                Showing
                <span className="font-semibold text-gray-900">1-10</span>
                of
                <span className="font-semibold text-gray-900">1000</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                  >
                    3
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-200  p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12 min-h-[65vh]">
          <div className="flex flex-col text-center w-full mb-5">
            <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
              User Panel
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Your Worksheetments
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div className="bg-white  relative shadow-md sm:rounded-lg ">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>

                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-blue-300 outline-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                      placeholder="Search by name"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 z-10 w-full md:w-auto relative !overflow-y-visible">
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
                    Filter
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
                      Sort
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      {filterOptions.map((i) => (
                        <li className="flex items-center">
                          <input
                            id={i.text}
                            type="checkbox"
                            value={i}
                            checked={filter === i.value}
                            onChange={() => handleCheckboxChange(i.value)}
                            className="w-4 h-4 border rounded focus:ring-3 outline-blue-500 bg-blue-700 border-blue-600 focus:ring-blue-600 focus:ring-offset-blue-800"
                          />
                          <label
                            htmlFor={i.text}
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            {i.text}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 rounded-lg">
                  <tr>
                    <th scope="col" className="px-4 py-3 ">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                     Date
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Worksheet Name
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Status
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      View
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {allWorksheet?.length === 0 && (
                    <tr className="border-b w-full flex justify-center items-center">
                      {" "}
                      <p className="text-black text-center w-full">
                        Not Available
                      </p>
                    </tr>
                  )}

                  {allWorksheet?.map((i) => (
                    <tr className="border-b" key={i?._id}>
                      <th
                        scope="row"
                        className="px-4 py-3 text-gray-900  font-bold gap-2"
                      >
                        {i.name}
                      </th>
                      <td scope="row" className="px-4 py-3 text-gray-900 ">
                        {i.dob}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <Link href={`/worksheet/${i.worksheetId._id}`}>
                          {i.worksheetId.title}
                        </Link>
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-3 text-gray-700 font-semibold"
                      >
                        {i?.isComplete ? (
                          <span className="inline-flex items-center justify-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                            <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-orange-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            setFunc(i?._id);
                            setViewModal(true);
                          }}
                          className="cursor-pointer"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path>
                          <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
                        </svg>
                      </td>
                      <td className="px-4 py-3 flex items-center justify-center gap-3">
                        <button
                          className="text-green-700"
                          onClick={() => {
                            const tempInput = document.createElement("input");
                            tempInput.value = `${process.env.NEXT_PUBLIC_WEB_URL}/tests/worksheet/${i._id}`;
                            document.body.appendChild(tempInput);
                            tempInput.select();
                            document.execCommand("copy");
                            document.body.removeChild(tempInput);
                            toast.success("Link copied successfully");
                          }}
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
                        <button
                          className="text-blue-500"
                          onClick={() => {
                            setFunc(i?._id);
                            setUpdateModal(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(15, 108, 243, 1)" }}
                          >
                            <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                            <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                          </svg>
                        </button>

                        <button
                          className="text-red-600 w-8 h-8"
                          onClick={() => {
                            setFunc(i?._id);
                            setDeleteModal(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(255, 3, 3, 1)" }}
                          >
                            <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 gap-2 inline-flex">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {(page - 1) * 10 + 1}-{Math.min(page * 10, totalDocs)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">{totalDocs}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                {page === 1 && (
                  <li>
                    <a
                      className={`flex items-center cursor-pointer justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
                        page === 1
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                )}

                {pagination()}
                {page === totalPage && (
                  <li>
                    <a
                      className={`flex items-center cursor-pointer justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
                        page === totalPage
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {deleteModalComp()}
      {updateModalComp()}
      {ViewModalComp()}
    </>
  );
}
