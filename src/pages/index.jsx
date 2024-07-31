import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <h1>Home page - Developer </h1> 
     pls desable middleware to access all routes
     <h2>user routes</h2>
      {/* 123 is a id number  */}
     <Link href="/user">User Home</Link>
     <Link href="/user/assess">Assessment Manage</Link>
     <Link href="/user/assess/123">Dynamic Assessment View</Link>
     <Link href="/user/worksheet">Worksheet Manage</Link>
     <Link href="/user/worksheet/123">Dynamic Worksheet View</Link>
     <Link href="/user/therabook">Therapist Sessions</Link>
     <Link href="/user/therabook/123">Dynamic Therapist Session View</Link>
     <Link href="/user/webinar">Webinar manage</Link>
     <Link href="/user/webinar/123">Dynamic Webinar View</Link>
     <h2>Admin routes</h2>
     <Link href="/admin">Admin Home</Link>
     <Link href="/admin/assess">Assess Manage</Link>
     <Link href="/admin/Worksheet">Worksheets Manage</Link>
     <Link href="/admin/blog">Blogs Manage</Link>
     <Link href="/admin/therameets">Therapist meeting Manage</Link>
     <Link href="/admin/Webinar">Webinar Manage</Link>
     <Link href="/admin/user">user Manage</Link>
     <h2>Therapist routes</h2>
     <Link href="/therapist">Therapist Home</Link>
     <Link href="/therapist/assess">Assessment Manage</Link>
     <Link href="/therapist/assess/123">Dynamic Assessment View</Link>
     <Link href="/therapist/worksheet">Worksheet Manage</Link>
     <Link href="/therapist/worksheet/123">Dynamic Worksheet View</Link>
     <Link href="/therapist/therabook">Therapist Sessions</Link>
     <Link href="/therapist/therabook/123">Dynamic Therapist Session View</Link>
     <h2>Common/Public routes</h2>
     <Link href="/assess">Assessment Manage</Link>
     <Link href="/assess/123">Dynamic Assessment View</Link>
     <Link href="/worksheet">Worksheet Manage</Link>
     <Link href="/worksheet/123">Dynamic Worksheet View</Link>
     <Link href="/therapists">All therapist show</Link>
     <Link href="/therapists/123">Dynamic therapist show View</Link>
     <Link href="/common/about">About</Link>
     <Link href="/common/contact">Contact</Link>
     <Link href="/common/privacy">Privacy</Link>
     <Link href="/common/cookies">cookies</Link>
    </main>
  );
}
