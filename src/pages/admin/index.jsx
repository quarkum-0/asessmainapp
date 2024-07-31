import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Index() {
  const { status, data: user } = useSession();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [status]);
  const adminOptions = [
    {
      category: "Users",
      title: "Manage Users",
      description:
        "Administer user accounts, permissions, and profiles effectively.",
      link: "/admin/user",
    },
    {
      category: "Asssessments",
      title: "Manage Assessments",
      description:
        "Organize, edit, and oversee assessment activities effortlessly.",
      link: "/admin/assess",
    },
    {
      category: "Worksheets",
      title: "Manage Worksheets",
      description:
        "Supervise, edit, and manage worksheets efficiently for streamlined operations.",
      link: "/admin/worksheet",
    },
  ];

  if (isLoading) {
    return (
      <section className="text-gray-600 bg-gray-200 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-5 justify-center items-center">
            <div className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1 bg-gray-400 w-32 h-4 rounded-lg animate-pulse"></div>
            <div className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 bg-gray-400 w-96 h-10 rounded-lg animate-pulse"></div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-fit px-10 py-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex flex-col items-center justify-between">
                <div className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-400  animate-pulse"></div>
                <div className="mb-1 text-xl font-medium text-gray-900 bg-gray-400 h-6 w-40 animate-pulse rounded-lg"></div>
                <span className="text-sm text-gray-500 bg-gray-400 w-36 h-5 rounded-lg animate-pulse"></span>
                <div className="flex mt-4 md:mt-6">
                  <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-28 h-10 animate-pulse"></div>
                  <div className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 w-28 focus:ring-gray-100 h-10 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-2 animate-pulse bg-blue-500 my-5 rounded-lg"></div>

          <div className="flex flex-wrap m-4 justify-center">
            {adminOptions.map((i) => (
              <div className="p-4 lg:w-1/3 h-fit" key={i.link}>
                <div className="h-full bg-gray-100 border border-gray-300 bg-opacity-75 px-8 py-16  rounded-lg overflow-hidden flex justify-center items-center flex-col text-center relative">
                  <div className="tracking-widest text-xs uppercase title-font font-medium text-gray-500 h-4 bg-gray-500 w-20 mb-1 animate-pulse rounded-lg"></div>
                  <div className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 w-full bg-gray-500 rounded-lg h-10 animate-pulse"></div>
                  <div className="leading-relaxed mb-3 w-full bg-gray-500 rounded-lg h-4 animate-pulse"></div>
                  <div className="leading-relaxed mb-3 w-full bg-gray-500 rounded-lg h-4 animate-pulse"></div>
                  <div className="text-blue-500 bg-blue-500 inline-flex items-center rounded-lg animate-pulse">
                    Manage
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 bg-gray-200 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
            Admin Panel
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Hello, {user?.user.name}{" "}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-fit px-10 py-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col items-center justify-between">
              <Image
                priority
                width={500}
                height={500}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={user?.user?.image}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                {user?.user?.name}
              </h5>
              <span className="text-sm text-gray-500 ">{user?.user?.email}</span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Home
                </Link>
                <button
                  onClick={()=>signOut()}
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-2 bg-blue-500 my-5 rounded-lg"></div>

        <div className="flex flex-wrap m-4 justify-center">
          {adminOptions.map((i) => (
            <div className="p-4 lg:w-1/3 h-fit" key={i.link}>
              <div className="h-full bg-gray-100 border border-gray-300 bg-opacity-75 px-8 py-16  rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs uppercase title-font font-medium text-gray-500 mb-1">
                  {i.category}
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  {i.title}
                </h1>
                <p className="leading-relaxed mb-3">{i.description}</p>
                <Link
                  href={i.link}
                  className="text-blue-600 inline-flex items-center"
                >
                  Manage
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
