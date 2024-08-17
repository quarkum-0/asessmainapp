import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState,useRef } from "react";
import { signOut, useSession, signIn } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const router = useRouter();
  const { status, data: session } = useSession();
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

  useEffect(() => {
    if (status === "authenticated") {
      setLogin(true);
    }
  }, [status]);

  const menuOptions = [
    { title: "Home", link: "/" },
    { title: "Assessments", link: "/assess" },
    { title: "Worksheets", link: "/worksheet" },
    { title: "Blogs", link: "/blogs" },
    { title: "Contact", link: "/contact" },
  ];

  const userOptions = [
    { title: "Dashboard", link: "/user" },
    { title: "Your Assessments", link: "/user/assess" },
    { title: "Your Worksheets", link: "/user/worksheet" },
  ]
  const adminOptions = [
    { title: "Admin Dashboard", link: "/admin" },
    { title: "Manage Users", link: "/admin/user" },
    { title: "Manage Assessments", link: "/admin/assess" },
    { title: "Manage Worksheets", link: "/admin/worksheet" },
  ]


  const handleClick = (event) => {
    console.log();
    if (
      userMenuClickRef.current !== event.target &&
      userMenuRef.current?.hidden === false
    ) {
      setUserMenuOpen(false)
    }
  };

  const handleClickOutside = (event) => {
    if (
      userMenuClickRef.current !== event.target &&
      !userMenuRef.current?.contains(event.target)
    ) {
      setUserMenuOpen(false)
    }

    if (
      !menuRef.current?.contains(event.target) &&
      !event.target.classList.contains("menu")
    ) {
      setMenuOpen(false)
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
                  {session?.user?.role === "User" && userOptions.map(i=> <li key={i.link}>
                    <Link
                      href={i.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      {i.title}
                    </Link>
                  </li>)}
                  {session?.user?.role === "Admin" && adminOptions.map(i=> <li key={i.link}>
                    <Link
                      href={i.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      {i.title}
                    </Link>
                  </li>)}
                  <li>
                    <a
                      onClick={() => signOut()}
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
                  onClick={() => signIn("google")}
                  className="text-white flex gap-2 items-center justify-center bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                  Sign in
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
                    onClick={()=>setMenuOpen(false)}
                    className={`${
                      router.pathname === i.link
                        ? "block py-2 pr-4 pl-3 text-lg text-gray-100 rounded bg-blue-600 md:bg-transparent md:text-blue-600 md:p-0 "
                        : "block py-2 pr-4 pl-3 text-lg text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 "
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
