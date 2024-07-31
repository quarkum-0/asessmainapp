import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({weight:'400',display:"swap",subsets:['latin']})
export default function App({ Component, pageProps: { session, ...pageProps },}){
  return (
    <>
    
      <SessionProvider session={session}>
      <main className={poppins.style}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
        </main>
      </SessionProvider>
      <NextTopLoader
        color="#058eff"
        height={3}
        crawl={false}
        showSpinner={false}
        easing="ease"
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
    </>
  );
}
