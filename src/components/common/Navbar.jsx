import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
// import { signOut, useSession, signIn } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const router = useRouter();
  //   const { status, data: session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const [isLogin, setLogin] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuClickRef = useRef(null);
  const userMenuRef = useRef(null);
  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  //   useEffect(() => {
  //     if (status === "authenticated") {
  //       setLogin(true);
  //     }
  //   }, [status]);

  const menuOptions = [
    { title: "Home", link: "/" },
    { title: "Assessments", link: "/assess" },
    { title: "Worksheets", link: "/worksheet" },
    { title: "Blogs", link: "/blogs" },
    { title: "Therapist", link: "/therapist" },
  ];

  const userOptions = [
    { title: "Dashboard", link: "/user" },
    { title: "Your Assessments", link: "/user/assess" },
    { title: "Your Worksheets", link: "/user/worksheet" },
  ];
  const therapistOptions = [
    { title: "Admin Dashboard", link: "/admin" },
    { title: "Manage Users", link: "/admin/user" },
    { title: "Manage Assessments", link: "/admin/assess" },
    { title: "Manage Worksheets", link: "/admin/worksheet" },
  ];
  const adminOptions = [
    { title: "Admin Dashboard", link: "/admin" },
    { title: "Manage Users", link: "/admin/user" },
    { title: "Manage Assessments", link: "/admin/assess" },
    { title: "Manage Worksheets", link: "/admin/worksheet" },
  ];

  const handleClick = (event) => {
    console.log();
    if (
      userMenuClickRef.current !== event.target &&
      userMenuRef.current?.hidden === false
    ) {
      setUserMenuOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      userMenuClickRef.current !== event.target &&
      !userMenuRef.current?.contains(event.target)
    ) {
      setUserMenuOpen(false);
    }

    if (
      !menuRef.current?.contains(event.target) &&
      !event.target.classList.contains("menu")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.document.addEventListener("click", handleClickOutside);
    return () => {
      window.document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.document.addEventListener("click", handleClick);
    return () => {
      window.document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white  border-b border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              width={100}
              height={100}
              src="/logo.png"
              className="mr-3 h-full w-fit"
              alt="Flowbite Logo"
            />
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLogin && (
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-blue-300"
                id="user-menu-button"
                onClick={handleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  width={100}
                  ref={userMenuClickRef}
                  height={100}
                  className="w-8 h-8 rounded-full"
                  src={session?.user?.image}
                  alt="user photo"
                />
              </button>
            )}

            {isLogin && (
              <div
                ref={userMenuRef}
                className={`z-50 fixed top-12 right-1 ${
                  !isUserMenuOpen && "hidden"
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow `}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">
                    {session?.user?.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate ">
                    {session?.user?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {session?.user?.role === "User" &&
                    userOptions.map((i) => (
                      <li key={i.link}>
                        <Link
                          href={i.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        >
                          {i.title}
                        </Link>
                      </li>
                    ))}
                  {session?.user?.role === "Admin" &&
                    adminOptions.map((i) => (
                      <li key={i.link}>
                        <Link
                          href={i.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        >
                          {i.title}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <a
                      //   onClick={() => signOut()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
            {!isLogin && (
              <>
              <button
                  type="button"
                  //   onClick={() => signIn("google")}
                  className="text-white gap-2 hidden lg:flex items-center justify-center bg-blue-400 hover:bg-sky-400 focus:ring-4 rounded-3xl border-2 border-blue-400 focus:ring-blue-300 font-medium  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
                >
                  Appointment
                  <div className="rounded-full bg-white">
                    <svg
                    className="rotate-45"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: "rgb(96 165 250)" }}
                    >
                       <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
                    </svg>
                  </div>
                </button>
                <button
                  type="button"
                  //   onClick={() => signIn("google")}
                  className="text-black flex gap-2 items-center justify-center bg-gray-50 hover:bg-gray-100 focus:ring-4 rounded-3xl border-2 border-blue-400 focus:ring-blue-300 font-medium  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
                >
                  Sign Up
                  <div className="rounded-full bg-blue-400">
                    <svg
                    className="rotate-45"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: "#fff" }}
                    >
                       <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
                    </svg>
                  </div>
                </button>
              </>
            )}

            <button
              onClick={handleMenu}
              type="button"
              className="menu inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5 menu"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  className="menu"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            ref={menuRef}
            className={`${
              !isMenuOpen && "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
              {menuOptions.map((i) => (
                <li key={i.link}>
                  <Link
                    href={i.link}
                    onClick={() => setMenuOpen(false)}
                    className={`${
                      router.pathname === i.link
                        ? "block py-2 pr-4 pl-3 text-base text-gray-100 rounded bg-blue-400 md:bg-transparent md:text-blue-400 md:p-0 "
                        : "block py-2 pr-4 pl-3 text-base text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 "
                    }`}
                    aria-current="page"
                  >
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
