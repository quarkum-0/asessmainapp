import { deleteImage, updateImage, uploadImage } from "@/libs/upload";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Index() {
  // Modals
  const [filterModal, setFilterModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + "...";
    }
  }
  

  // comman Data for CRUD
  const categoryOptions = [
    "Addiction",
    "Anger",
    "Anxiety",
    "Bipolar disorder",
    "Body dysmorphia (BDD)",
    "Depression",
    "Dissociation",
    "Eating disorders",
    "OCD",
    "PTSD",
    "Self-esteem & self-criticism",
    "Sleep & insomnia",
    "Social anxiety",
    "Stress",
  ];

  const [selectData, setSelectData] = useState(null);
  const [file, setFile] = useState(null);
  const [file64, setFile64] = useState(null);
  const [filePdf, setFilePdf] = useState(null);
  const [file64Pdf, setFile64Pdf] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setFile64(base64Data);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handlePdfChange = (event) => {
    const selectedFile = event.target.files[0];
    setFilePdf(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setFile64Pdf(base64Data);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // search & filter files
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [allWorksheet, setAllWorksheet] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(null);

  const fetchData = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/admin/worksheet?page=${page}&search=${search}&filter=${filter}`,
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
    router.push('/admin/worksheet#')
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
    setSelectData(allWorksheet.find((item) => item._id === id));
  };



  function updateModalComp() {

    const handleUpdate = async (e) => {
      e.preventDefault();
      if (selectData.columns.length < 1) {
        toast.warn("minumum one column is mandatory");
      }
      if (
        selectData?.columns.length >= 1
      ) {
        try {
          const image = file64
            ? await updateImage(selectData.image, file64, file.name, "Worksheet-new")
            : selectData.image;
          const pdf = file64Pdf ? await updateImage(selectData.pdf, file64Pdf, filePdf.name, "Worksheet-Pdf") : selectData.pdf;
          const updateToast = toast.loading("Please wait...");
          await axios({
            method: "put",
            url: "/api/admin/worksheet",
            data: {
              _id: selectData._id,
              title: selectData.title,
              description: selectData.description,
              category: selectData.category,
              image: image,
              pdf:pdf,
              columns: selectData.columns,
              isOneTime:selectData.isOneTime

            },
          })
            .then(function ({ data }) {
              toast.update(updateToast, {
                render: data.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });
              fetchData();
              setTimeout(() => {
                setFile(null);
                setFile64(null);
                setUpdateModal(false);
                setSelectData(null);
              }, 2000);
            })
            .catch(function (error) {
              console.log(error);
              setFile(null);
              setFile64(null);
              toast.update(updateToast, {
                render: error.response.data.error,
                type: "error",
                isLoading: false,
                autoClose: 2000,
              });
            });
        } catch (err) {
          console.error(err);
        }
      }
    };

    const handleColumnTitleChange = (columnIndex, e) => {
      const updatedColumns = [...selectData.columns];
      updatedColumns[columnIndex].title = e.target.value;
      setSelectData({ ...selectData, columns: updatedColumns });
    };
  
    // Function to handle changes in question text under a column
    const handleQuestionChange = (columnIndex, questionIndex, e) => {
      const updatedColumns = [...createData.columns];
      updatedColumns[columnIndex].questions[questionIndex] = e.target.value;
      setSelectData({ ...createData, columns: updatedColumns });
    };
  
    // Function to add a new question under a column
    const addQuestionField = (columnIndex) => {
      const updatedColumns = [...selectData.columns];
      updatedColumns[columnIndex].questions.push("");
      setSelectData({ ...selectData, columns: updatedColumns });
    };
  
    // Function to remove a question under a column
    const removeQuestionField = (columnIndex, questionIndex) => {
      const updatedColumns = [...selectData.columns];
      updatedColumns[columnIndex].questions.splice(questionIndex, 1);
      setSelectData({ ...selectData, columns: updatedColumns });
    };
    // Function to add a new column
    const addColumnField = () => {
      const updatedColumns = [...selectData.columns];
      updatedColumns.push({ title: "", questions: [""] });
      setSelectData({ ...selectData, columns: updatedColumns });
    };

    return (
      <div
        class={`${
          !updateModal && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400 max-h-[90vh] overflow-y-scroll">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-900 ">
                Update Worksheet
              </h3>
              <button
                type="button"
                onClick={() => {
                  setUpdateModal(false);
                  setSelectData(null);
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
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectData?.title}
                    onChange={(e) =>
                      setSelectData((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    placeholder="Type Worksheet Title"
                    required
                  />
                </div>
                <div>
                  <label
                    for="file"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    for="filepdf"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Upload Pdf
                  </label>
                  <input
                    type="file"
                    name="filepdf"
                    id="filepdf"
                    onChange={handlePdfChange}
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  {/* JSX for rendering columns */}
                  {selectData?.columns?.map((column, columnIndex) => (
                    <div key={columnIndex} className="mb-8">
                      {/* Input field for column title */}
                      <div className="mb-4">
                        <label
                          htmlFor={`column-title-${columnIndex}`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Column Title:
                        </label>
                        <input
                          type="text"
                          id={`column-title-${columnIndex}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          value={column.title}
                          required
                          onChange={(e) =>
                            handleColumnTitleChange(columnIndex, e)
                          } // Handle change for column title
                          placeholder={`Column Title ${columnIndex + 1}`}
                        />
                      </div>
                      {/* JSX for rendering questions under the column */}
                      {column.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="mb-4">
                          <label
                            htmlFor={`question-${columnIndex}-${questionIndex}`}
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >{`Question ${questionIndex + 1} under Column ${
                            columnIndex + 1
                          }:`}</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              id={`question-${columnIndex}-${questionIndex}`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                              value={question}
                              required
                              onChange={(e) =>
                                handleQuestionChange(
                                  columnIndex,
                                  questionIndex,
                                  e
                                )
                              } // Handle change for each question under the column
                              placeholder={`Question ${questionIndex + 1}`}
                            />
                            {column.questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeQuestionField(
                                    columnIndex,
                                    questionIndex
                                  )
                                }
                                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* Button to add more input fields for questions under the column */}
                      <div>
                        <button
                          type="button"
                          onClick={() => addQuestionField(columnIndex)}
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Button to add more columns */}
                  <div>
                    <button
                      type="button"
                      onClick={addColumnField}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Add Column
                    </button>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="isOneTime"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    only One response
                  </label>
                  <select
                    id="isOneTime"
                    value={selectData?.isOneTime}
                    required
                    defaultValue={selectData?.isOneTime}
                    onChange={(e) =>
                      setSelectData((prevState) => ({
                        ...prevState,
                        isOneTime: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                   
                      <option value={true}>
                        Yes
                      </option>
                      <option value={false}>
                        No
                      </option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    required
                    defaultValue={selectData?.category}
                    onChange={(e) =>
                      setSelectData((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {categoryOptions.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    required
                    value={selectData?.description}
                    onChange={(e) =>
                      setSelectData((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                    class="block p-2.5 w-full text-sm text-gray-900 outline-blue-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write Worksheet description here"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update Worksheet
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function viewModalComp() {
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
                {selectData?.title}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setViewModal(false);
                  setSelectData(null);
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
            <div className="flex flex-col justify-start items-center gap-2">
              <Image
                width={500}
                height={500}
                priority
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectData?.image}`}
                className="h-28 w-auto"
                alt="photo"
              />
              <h3 className="font-semibold">
                Category: {selectData?.category}
              </h3>
              <p className="my-2">Discription : {selectData?.description}</p>
              <h3 className="font-semibold">Columns :</h3>

              {selectData?.columns.map((item, index) => (
                <>
                <p className="mb-1 ">
                  {index + 1}. {item.title}
                </p>
                {item.questions.map((item, index) =>(
                <p className="mb-1 font-extralight">
                {index + 1}. {item}
              </p>))}
              </>
              ))}
              <Link className="py-1 px-2 rounded-md bg-blue-600 text-white" href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectData?.pdf}`}>go to pdf</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Modal
  function addModalComp() {
    const [createData, setCreateData] = useState({
      title: "",
      description: "",
      category: "Stress",
      image: "",
      columns: [],
      isOneTime:false
    });


    const handleCreate = async (e) => {
      e.preventDefault();
      if (createData.columns.length < 1) {
        toast.warn("minumum one column is required");
      }
      if (!file) {
        toast.warn("Image file is mandatory");
      }
      if (
        createData.columns.length >= 1 &&
        file &&
        file64
      ) {
        try {
          const image = await uploadImage(file64, file.name, "Worksheet-new");
          const pdf = await uploadImage(file64Pdf, filePdf.name, "Worksheet-Pdf");
          const createToast = toast.loading("Please wait...");
          await axios({
            method: "post",
            url: "/api/admin/worksheet",
            data: {
              title: createData.title,
              description: createData.description,
              category: createData.category,
              image: image,
              pdf:pdf,
              columns: createData.columns,
              isOneTime: createData.isOneTime,
            },
          })
            .then(function ({ data }) {
              toast.update(createToast, {
                render: data.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });
              setCreateData({
                title: "",
                description: "",
                category: "Stress",
                image: "",
                columns: [],
                isOneTime:false
              });
              setTimeout(() => {
                fetchData();
                setFile(null);
                setFile64(null);
                setCreateModal(false);
              }, 2000);
            })
            .catch(function (error) {
              console.log(error);
              setFile(null);
              setFile64(null);
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
      }
    };

    

    const handleColumnTitleChange = (columnIndex, e) => {
      const updatedColumns = [...createData.columns];
      updatedColumns[columnIndex].title = e.target.value;
      setCreateData({ ...createData, columns: updatedColumns });
    };
  
    // Function to handle changes in question text under a column
    const handleQuestionChange = (columnIndex, questionIndex, e) => {
      const updatedColumns = [...createData.columns];
      updatedColumns[columnIndex].questions[questionIndex] = e.target.value;
      setCreateData({ ...createData, columns: updatedColumns });
    };
  
    // Function to add a new question under a column
    const addQuestionField = (columnIndex) => {
      const updatedColumns = [...createData.columns];
      updatedColumns[columnIndex].questions.push("");
      setCreateData({ ...createData, columns: updatedColumns });
    };
  
    // Function to remove a question under a column
    const removeQuestionField = (columnIndex, questionIndex) => {
      const updatedColumns = [...createData.columns];
      updatedColumns[columnIndex].questions.splice(questionIndex, 1);
      setCreateData({ ...createData, columns: updatedColumns });
    };
    // Function to add a new column
    const addColumnField = () => {
      const updatedColumns = [...createData.columns];
      updatedColumns.push({ title: "", questions: [""] });
      setCreateData({ ...createData, columns: updatedColumns });
    };
  

    
    return (
      <div
        class={`${
          !createModal && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-white rounded-lg shadow  sm:p-5 border-2 border-gray-400 max-h-[90vh] overflow-y-scroll">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-blue-500">
              <h3 class="text-lg font-semibold text-gray-900 ">
                Create New Worksheet
              </h3>
              <button
                type="button"
                onClick={() => {
                  setCreateModal(false);
                  setCreateData({
                    title: "",
                    description: "",
                    category: "Stress",
                    image: "",
                    columns: [],
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
            <form onSubmit={handleCreate}>
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={createData.title}
                    onChange={(e) =>
                      setCreateData((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    placeholder="Type Worksheet Title"
                    required
                  />
                </div>
                <div>
                  <label
                    for="file"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    for="filepdf"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Upload Pdf
                  </label>
                  <input
                    type="file"
                    name="filepdf"
                    id="filepdf"
                    onChange={handlePdfChange}
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  {/* JSX for rendering columns */}
                  {createData?.columns?.map((column, columnIndex) => (
                    <div key={columnIndex} className="mb-8">
                      {/* Input field for column title */}
                      <div className="mb-4">
                        <label
                          htmlFor={`column-title-${columnIndex}`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Column Title:
                        </label>
                        <input
                          type="text"
                          id={`column-title-${columnIndex}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          value={column.title}
                          required
                          onChange={(e) =>
                            handleColumnTitleChange(columnIndex, e)
                          } // Handle change for column title
                          placeholder={`Column Title ${columnIndex + 1}`}
                        />
                      </div>
                      {/* JSX for rendering questions under the column */}
                      {column.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="mb-4">
                          <label
                            htmlFor={`question-${columnIndex}-${questionIndex}`}
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >{`Question ${questionIndex + 1} under Column ${
                            columnIndex + 1
                          }:`}</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              id={`question-${columnIndex}-${questionIndex}`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                              value={question}
                              required
                              onChange={(e) =>
                                handleQuestionChange(
                                  columnIndex,
                                  questionIndex,
                                  e
                                )
                              } // Handle change for each question under the column
                              placeholder={`Question ${questionIndex + 1}`}
                            />
                            {column.questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeQuestionField(
                                    columnIndex,
                                    questionIndex
                                  )
                                }
                                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* Button to add more input fields for questions under the column */}
                      <div>
                        <button
                          type="button"
                          onClick={() => addQuestionField(columnIndex)}
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Button to add more columns */}
                  <div>
                    <button
                      type="button"
                      onClick={addColumnField}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Add Column
                    </button>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="isOneTime"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    only One response
                  </label>
                  <select
                    id="isOneTime"
                    value={createData.isOneTime}
                    required
                    defaultValue={createData.isOneTime}
                    onChange={(e) =>
                      setCreateData((prevState) => ({
                        ...prevState,
                        isOneTime: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                   
                      <option value={true}>
                        Yes
                      </option>
                      <option value={false}>
                        No
                      </option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    required
                    defaultValue={createData.category}
                    onChange={(e) =>
                      setCreateData((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {categoryOptions.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    required
                    value={createData.description}
                    onChange={(e) =>
                      setCreateData((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                    class="block p-2.5 w-full text-sm text-gray-900 outline-blue-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write Worksheet description here"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <svg
                  class="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Create Worksheet
              </button>
            </form>
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
              className="flex items-center cursor-pointer justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              {page - 1}
            </a>
          </li>
        )}
        <li>
          <a className="flex items-center justify-center cursor-pointer text-sm z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700">
            {page}
          </a>
        </li>
        {allWorksheet?.length !== 0 && page !== totalPage && (
          <li>
            <a
              onClick={() => setPage(page + 1)}
              className="flex items-center justify-center cursor-pointer text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              {page + 1}
            </a>
          </li>
        )}
        { page !== totalPage && (
          <li>
            <a
              onClick={() => setPage(page + 1)}
              className="flex items-center justify-center cursor-pointer h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
        await deleteImage(selectData.image)
        await deleteImage(selectData.pdf)
        const toastUpdate = toast.loading("Please wait...");
        axios({
          method: "delete",
          url: `/api/admin/worksheet`,
          data: selectData,
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
              setSelectData(null);
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
              Are you sure you want to delete this Worksheet?
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
        {deleteModalComp()}
        {viewModalComp()}
        {addModalComp()}
        {updateModalComp()}
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="flex flex-col text-center w-full mb-5 justify-center items-center">
            <div className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1 bg-gray-400 w-32 h-4 rounded-lg animate-pulse"></div>
            <div className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 bg-gray-400 w-96 h-10 rounded-lg animate-pulse"></div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>

          <div id="view" className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
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
                <button
                  type="button"
                  onClick={() => {
                    setCreateModal(true);
                  }}
                  class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(255, 255, 255, 1)" }}
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                  Add Worksheet
                </button>
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
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Description
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      Category
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
                        <div className="h-16 w-40 rounded-lg bg-gray-500 animate-pulse" />
                      </th>
                      <td className="px-4 py-3 ">
                        <div className="h-5 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
                      </td>
                      <td className="px-4 py-3 ">
                        <div className="h-8 w-40 bg-gray-500 rounded-lg animate-pulse"></div>
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
              {!totalPage && <ul className="inline-flex items-stretch -space-x-px">
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
              </ul>}
              {
                totalPage && <ul className="inline-flex items-stretch -space-x-px">
                {page === 1 && (
                  <li>
                    <a
                      className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
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
                      className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
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
              }
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
              Admin Panel
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Manage Worksheets
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div  id="view" className="bg-white  relative shadow-md sm:rounded-lg ">
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
                <button
                  type="button"
                  onClick={() => {
                    setCreateModal(true);
                  }}
                  class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(255, 255, 255, 1)" }}
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                  Add Worksheet
                </button>
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 rounded-lg">
                  <tr>
                    <th scope="col" className="px-4 py-3 ">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      Description
                    </th>
                    <th scope="col" className=" px-4 py-3">
                      Category
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
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap inline-flex justify-start items-center gap-2"
                      >
                        <Image
                          width={100}
                          height={100}
                          className="h-20 w-auto rounded-lg border border-gray-500"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${i?.image}`}
                          alt="user"
                        />
                      </th>
                      <td
                        scope="row"
                        className="px-4 py-3 text-gray-900 font-bold"
                      >
                        {i.title}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {truncateString(i.description, 100)}
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-3 text-gray-700 font-semibold"
                      >
                        {i.category}
                      </td>
                      
                      <td className="px-4 py-3 flex items-center justify-center gap-3">
                        <button
                          className="text-green-700"
                          onClick={() => {
                            setFunc(i?._id);
                            setViewModal(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
                            <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
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
                      className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
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
                      className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-blue-300 hover:bg-gray-100 hover:text-gray-700 ${
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
      {viewModalComp()}
      {addModalComp()}
      {updateModalComp()}
    </>
  );
}
