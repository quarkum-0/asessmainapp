import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-lg">Home page - Developer </h1> 
      <p className="text-lg">Please disable middleware to access all routes</p>
      <h2 className="text-xl">User Routes</h2>
      {/* 123 is an id number */}
      <Link href="/user" className="text-blue-500 underline">User Home</Link>
      <Link href="/user/assess" className="text-blue-500 underline">Assessment Manage</Link>
      <Link href="/user/assess/123" className="text-blue-500 underline">Dynamic Assessment View</Link>
      <Link href="/user/worksheet" className="text-blue-500 underline">Worksheet Manage</Link>
      <Link href="/user/worksheet/123" className="text-blue-500 underline">Dynamic Worksheet View</Link>
      <Link href="/user/therabook" className="text-blue-500 underline">Therapist Sessions</Link>
      <Link href="/user/therabook/123" className="text-blue-500 underline">Dynamic Therapist Session View</Link>
      <Link href="/user/webinar" className="text-blue-500 underline">Webinar manage</Link>
      <Link href="/user/webinar/123" className="text-blue-500 underline">Dynamic Webinar View</Link>
      <h2 className="text-xl">Admin Routes</h2>
      <Link href="/admin" className="text-blue-500 underline">Admin Home</Link>
      <Link href="/admin/assess" className="text-blue-500 underline">Assess Manage</Link>
      <Link href="/admin/worksheet" className="text-blue-500 underline">Worksheets Manage</Link>
      <Link href="/admin/blog" className="text-blue-500 underline">Blogs Manage</Link>
      <Link href="/admin/therameets" className="text-blue-500 underline">Therapist Meeting Manage</Link>
      <Link href="/admin/webinar" className="text-blue-500 underline">Webinar Manage</Link>
      <Link href="/admin/user" className="text-blue-500 underline">User Manage</Link>
      <h2 className="text-xl">Therapist Routes</h2>
      <Link href="/therapist" className="text-blue-500 underline">Therapist Home</Link>
      <Link href="/therapist/assess" className="text-blue-500 underline">Assessment Manage</Link>
      <Link href="/therapist/assess/123" className="text-blue-500 underline">Dynamic Assessment View</Link>
      <Link href="/therapist/worksheet" className="text-blue-500 underline">Worksheet Manage</Link>
      <Link href="/therapist/worksheet/123" className="text-blue-500 underline">Dynamic Worksheet View</Link>
      <Link href="/therapist/therabook" className="text-blue-500 underline">Therapist Sessions</Link>
      <Link href="/therapist/therabook/123" className="text-blue-500 underline">Dynamic Therapist Session View</Link>
      <h2 className="text-xl">Common/Public Routes</h2>
      <Link href="/assess" className="text-blue-500 underline">Assessment Manage</Link>
      <Link href="/assess/123" className="text-blue-500 underline">Dynamic Assessment View</Link>
      <Link href="/worksheet" className="text-blue-500 underline">Worksheet Manage</Link>
      <Link href="/worksheet/123" className="text-blue-500 underline">Dynamic Worksheet View</Link>
      <Link href="/therapists" className="text-blue-500 underline">All Therapist Show</Link>
      <Link href="/therapists/123" className="text-blue-500 underline">Dynamic Therapist Show View</Link>
      <Link href="/common/about" className="text-blue-500 underline">About</Link>
      <Link href="/common/contact" className="text-blue-500 underline">Contact</Link>
      <Link href="/common/privacy" className="text-blue-500 underline">Privacy</Link>
      <Link href="/common/cookies" className="text-blue-500 underline">Cookies</Link>
    </main>
  );
}
