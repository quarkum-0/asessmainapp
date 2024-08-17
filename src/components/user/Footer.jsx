import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 z-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              width={100}
              height={100}
              src="/logo.png"
              className="mr-3 h-full w-fit"
              alt="Flowbite Logo"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
          <li>
              <Link href="/blogs" className="hover:underline me-4 md:me-6">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/assess" className="hover:underline me-4 md:me-6">
                Assessments
              </Link>
            </li>
            <li>
              <Link href="/worksheet" className="hover:underline me-4 md:me-6">
                Worksheets
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()} {""}
          <a href="/" className="hover:underline">
            {process.env.NEXT_PUBLIC_SITENAME}
          </a>
          . All Rights Reserved. {""} <br />
          Developed by{" "}
          <a href="https://www.atomprod.in" className="hover:underline">
            Atomprod.
          </a>
        </span>
      </div>
    </footer>
  );
}
