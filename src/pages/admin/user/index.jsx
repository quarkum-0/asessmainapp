import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
export default function Index() {
  // modals
  const [filterModal, setFilterModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // data
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [selectUser, setSelectUser] = useState(null);
  // functionall filter & search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);

  const handleCheckboxChange = (value) => {
    if (filter === value) {
      setFilter(null);
    } else {
      setFilter(value);
    }
  };

  const fetchUser = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/admin/user?page=${page}&search=${search}&filter=${filter}`,
      }).then(function ({ data }) {
        setTimeout(() => {
          setAllUsers(data.data);
        }, 800);
        setTotalDocs(data.totalUsers);
        setTotalPage(data.totalPages);
        setPage(data.currentPage);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  useEffect(() => {
    fetchUser();
  }, [search, page, filter]);

  const renderPagination = () => {
    const pages = [];
    const totalPages = Math.min(totalPage, 5); // Limit to maximum of 5 pages
    const startPage = Math.max(1, page - 2); // Start from two pages before the current page
    const endPage = Math.min(totalPage, startPage + 4); // End at two pages after the current page

    // Add previous page link
    if (page > 1) {
      pages.push(
        <li key="prev">
          <a
            href="#"
            className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700`}
            onClick={() => handlePageChange(page - 1)}
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
      );
    }

    // Add page links
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
              page === i ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-white"
            } border border-blue-300 hover:bg-gray-100 hover:text-gray-700`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }

    // Add next page link
    if (page < totalPage) {
      pages.push(
        <li key="next">
          <a
            href="#"
            className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700`}
            onClick={() => handlePageChange(page + 1)}
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
      );
    }

    return pages;
  };

  const setFunc = (id) => {
    setSelectUser(allUsers.find((item) => item._id === id));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const toastUpdate = toast.loading("Please wait...");
      axios({
        method: "delete",
        url: `/api/admin/user`,
        data: selectUser,
      })
        .then(function ({ data }) {
          fetchUser();
          toast.update(toastUpdate, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            setDeleteModal(false);
            setSelectUser(null);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const toastUpdate = toast.loading("Please wait...");
      axios({
        method: "put",
        url: `/api/admin/user`,
        data: selectUser,
      })
        .then(function ({ data }) {
          fetchUser();
          toast.update(toastUpdate, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setTimeout(() => {
            setUpdateModal(false);
            setSelectUser(null);
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

  if (!allUsers) {
    const userDemoOptions = [1, 2, 3, 4];
    return (
      <section className="bg-gray-200  p-3 sm:p-5 antialiased">
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
                      User
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Email
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      Role
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
                        <div className="h-10 w-10 rounded-full bg-gray-500 animate-pulse" />
                        <span className="h-5 w-28 bg-gray-500 rounded-lg animate-pulse"></span>
                      </th>
                      <td className="px-4 py-3 ">
                        <div className="h-5 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center h-4 w-20 bg-yellow-300 animate-pulse text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full "></span>
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
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    100
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
      {/* // <!-- Start block --> */}
      <section className="bg-gray-200  p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="flex flex-col text-center w-full mb-5">
            <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
              Admin Panel
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Users Page
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          {/* <!-- Start coding here --> */}
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
                      User
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Email
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {allUsers?.length === 0 && (
                    <tr className="border-b w-full flex justify-center items-center">
                      {" "}
                      <p className="text-black text-center w-full">
                        Not Available
                      </p>
                    </tr>
                  )}
                  {allUsers?.map((i) => (
                    <tr className="border-b " key={i?.email}>
                      <th
                        scope="row"
                        className="px-4 py-3 min-w-44 font-medium text-gray-900 whitespace-nowrap inline-flex justify-start items-center gap-2"
                      >
                        <Image
                          width={100}
                          height={100}
                          className="h-10 w-10 rounded-full"
                          src={i?.image}
                          alt="user"
                        />
                        {i?.name}
                      </th>
                      <td className="px-4 py-3 text-gray-700">{i.email}</td>
                      <td className="px-4 py-3">
                        {i?.role === "Admin" ? (
                          <span className="inline-flex items-center justify-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                            <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-center gap-3">
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
                      href="#"
                      className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
                        page === 1
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handlePageChange(page - 1)}
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

                {renderPagination()}

                {page === totalPage && (
                  <li>
                    <a
                      href="#"
                      className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
                        page === totalPage
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handlePageChange(page + 1)}
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
      {/* <!-- End block --> */}

      {/* <!-- Update modal --> */}

      <div
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !updateModal && "hidden"
        } flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 0 ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Update User
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => {
                  setUpdateModal(false);
                }}
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
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleUpdate}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    id="name"
                    value={selectUser?.name}
                    onChange={(e) =>
                      setSelectUser((prevta) => ({
                        ...prevta,
                        name: e.target.value,
                      }))
                    }
                    className="bg-gray-50 cursor-not-allowed border border-blue-300 outline-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  0    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    readOnly
                    value={selectUser?.email}
                    onChange={(e) =>
                      setSelectUser((prevta) => ({
                        ...prevta,
                        email: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border cursor-not-allowed outline-blue-400 border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  0    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Image
                  </label>
                  <div className="inline-flex gap-1">
                    <Image
                      width={200}
                      height={200}
                      className="h-14 w-14 rounded-full"
                      src={selectUser?.image ? selectUser?.image : "/user.jpg"}
                      alt="user"
                    />
                    <p className="text-gray-500">
                      User Can Only Change Thier name & picture On google
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    defaultValue={selectUser?.role}
                    value={selectUser?.role}
                    onChange={(e) =>
                      setSelectUser((prevta) => ({
                        ...prevta,
                        role: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-blue-300 outline-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  0    "
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Delete modal --> */}

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
              Are you sure you want to delete this User?
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
    </>
  );
}
