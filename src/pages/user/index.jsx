import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Hero from '@/components/user/Hero'
import Options from "@/components/user/Options"
export default function Home() {
  return (
    <>
    user Home page
    <Hero />
   <Options />
    </>
  );
}
