import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import blogsData from "@/libs/blogData";
export default function Hero() {
  const grapicsData = [
    {
      img: "2.png",
      title: "Client and Therapy Type",
      pera: `From <span class="font-bold-cust">individuals, children, couples</span>, to varied <span class="font-bold-cust">family sizes</span>.`,
    },
    {
      img: "1.png",
      title: "Formats",
      pera: `Whether it's <span class="font-bold-cust">intake</span>, a myriad of <span class="font-bold-cust">progress notes (SOAP, DAP, PIRP, SIRP, GIRP, BIRP, PIE)</span>, or service interactions`,
    },
    {
      img: "4.png",
      title: "Input Methods",
      pera: `Convert session <span class="font-bold-cust">recordings, dictations</span>, or <span class="font-bold-cust">direct text</span> descriptions into structured notes.`,
    },
    {
      img: "3.png",
      title: "Customization",
      pera: `Teach Al how to refer to you and your clients e.g. <span class="font-bold-cust">Client vs Patient, therapist vs Clinician</span>, and many others.`,
    },
  ];
  return (
    <>
      {/* hero  */}

      <section className="text-gray-600 w-full body-font py-5 px-2 md:px-0 flex justify-center items-center ">
        <div className="bg-gray-100 w-full lg:w-5/6 md:p-10 rounded-xl">
          <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            
            <div class="text-center lg:w-2/3 w-full">
              <h1 class="title-font text-4xl lg:text-4xl xl:text-5xl mb-4 text-gray-900 font-bold">
               Automate all your analysis of ✨ <br />
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "sessions",
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    "risk assess",
                    1000,
                    "patient profile",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-blue-600"
                  repeat={Infinity}
                />
              </h1>
              <p class="mb-8 leading-relaxed font-semibold lg:text-lg xl:text-lg text-base">
                Get detail report of session and build next session framework of
                therapy programs in just 5 minutes
                <br />
                <span className="font-bold text-xs">Never store any data of user.</span>
              </p>
              <div class="flex justify-center">
                <Link
                  href="#Try"
                  class="inline-flex  text-white bg-blue-600 border-0 md:font-semibold md:py-3 md:px-12 px-6 py-2 focus:outline-none hover:bg-blue-700 rounded-full text-lg"
                >
                  Try For Free
                </Link>
              </div>
            </div>
            <div class="w-full flex justify-center items-center mt-5 md:order-2 mb-5 md:mb-0">
            <Image
              width={1000}
              height={1000}
              priority
              class="object-cover object-center rounded-lg"
              alt="hero"
              src="/hero-main.jpg"
            />
          </div>
          </div>
        </div>
      </section>
      {/* <section class="text-gray-600  body-font">
        <div class="container mx-auto flex px-5 lg:px-20 py-14  md:flex-row flex-col items-center justify-between">
          <div class=" md:w-1/2 w-full  md:order-2 mb-5 md:mb-0">
            <Image
              width={1000}
              height={1000}
              priority
              class="object-cover object-center rounded-lg"
              alt="hero"
              src="/hero-main.jpg"
            />
          </div>
          <div class=" md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font text-4xl lg:text-4xl xl:text-6xl mb-4 text-gray-900 font-bold">
              Automate all your analysis of <br />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "sessions",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "risk assess",
                  1000,
                  "patient profile",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                className="text-blue-600"
                repeat={Infinity}
              />
            </h1>
            <p class="mb-8 leading-relaxed font-semibold lg:text-lg xl:text-xl text-xs">
              Get detail report of session and build next session framework of
              therapy programs in just 5 minutes
              <br />
              <span className="font-bold">Never store any data of user.</span>
            </p>
            <div class="flex justify-center">
              <Link
                href="#Try"
                class="inline-flex  text-white bg-blue-600 border-0 md:font-semibold md:py-3 md:px-12 px-6 py-2 focus:outline-none hover:bg-blue-700 rounded-lg text-lg"
              >
                Try For Free
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* try s */}
      <section
        id="Try"
        class="text-gray-600 w-full body-font py-5 flex justify-center items-center "
      >
        <div className="bg-gray-100 w-full lg:w-5/6 md:p-10 rounded-lg">
          <div class="container flex px-5 py-5 md:flex-row flex-col items-center ">
            <div class="w-full md:w-1/2 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
              <Link href={"/"} className="w-full h-full">
                <Image
                  width={500}
                  height={500}
                  priority
                  class="object-cover w-full h-full object-center rounded"
                  alt="itemn"
                  src="/home-1.png"
                />
              </Link>
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font xl:text-4xl font-semibold text-3xl mb-4  text-gray-900">
                <span className="text-blue-600">Build blue print </span>
                of session in just seconds
              </h1>
              <p class="mb-8 leading-relaxed">
                Get therapy session framework of techniques to use, goals to
                assign, and risk assessment by analyzing the previous session
                progress and talk
              </p>
            </div>
          </div>

          <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
            <div class=" w-full md:w-1/2 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
              <Link href={"/assess"}>
                <Image
                  width={500}
                  height={500}
                  priority
                  class="object-cover object-center rounded"
                  alt="itemn"
                  src="/home-3.png"
                />
              </Link>
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font xl:text-4xl font-semibold text-3xl mb-4  text-gray-900">
                <span className="text-blue-600">100+ Diagnosis </span>
                of Mental illness and disorders
              </h1>
              <p class="mb-8 leading-relaxed">
                Share inbuild or customize the assessment for patient and
                analyze result with AI to get detail insights which help to plan
                the problem solving session.
              </p>
            </div>
          </div>
          <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
            <div class="w-full md:w-1/2 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
              <Link href={"/worksheet"}>
                <Image
                  width={500}
                  height={500}
                  priority
                  class="object-cover object-center rounded"
                  alt="itemn"
                  src="/home-2.png"
                />
              </Link>
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font xl:text-4xl font-semibold text-3xl mb-4  text-gray-900">
                <span className="text-blue-600">Assign Goal </span>
                to patient and measure live progress
              </h1>
              <p class="mb-8 leading-relaxed">
                Get access to bunch of therapy guide, worksheet that help to
                learn, practice share with patient on platfrom with easy to fill
                UI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* garphic section  */}
      <section class="text-gray-600 body-font flex flex-col justify-center items-center ">
        <div class="container px-5 lg:px-20 py-5 ">
          <div class="flex flex-col text-center w-full mb-2">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Coming Soon...
            </h1>
          </div>
          <div class="flex flex-wrap -m-4">
            {grapicsData.map((i) => (
              <div class="lg:w-1/4 md:w-1/2 w-full p-4">
                <div class="bg-gray-50 p-6 lg:h-96 rounded-lg flex flex-col justify-between items-center">
                  <div className="flex flex-col justify-between items-center">
                    <h2 class="text-lg xl:text-xl font-bold text-gray-900 title-font mb-4">
                      {i.title}
                    </h2>
                    <p
                      class="leading-relaxed text-base text-center"
                      dangerouslySetInnerHTML={{ __html: i.pera }}
                    ></p>
                  </div>
                  <img
                    class="rounded w-full  mb-6"
                    src={`/graphic/${i.img}`}
                    alt="content"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs tab  */}
      <section class="text-gray-600 body-font">
        <div class="container bg-white px-5 py-5 pb-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-5">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              <span className="font-bold text-blue-600">Assess</span> vs
              Manually
            </h1>
          </div>
          <div class="lg:w-2/4 w-full mx-auto overflow-auto">
            <table class="table-auto  p-5 rounded-lg w-full text-left whitespace-no-wrap">
              <thead className="">
                <tr>
                  <th></th>
                  <th class="px-4 py-3 flex items-center justify-center title-font tracking-wider pb-5 font-medium text-gray-100  bg-blue-600 ">
                    Assess
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider pb-5 font-medium text-gray-900 ">
                    Manually
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-4 py-3 text-black">Talking Session On-free</td>
                  <td class="px-4 py-3 h-full flex items-center justify-center text-gray-200 text-sm bg-blue-600 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">Automate the dianosis</td>
                  <td class="px-4 py-3 flex h-full items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">AI Assistant in Session</td>
                  <td class="px-4 py-3 flex items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">Manage 100+ Assessment</td>
                  <td class="px-4 py-3 flex items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">
                    Access All your patient detail
                  </td>
                  <td class="px-4 py-3 flex items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">1000+ Therapy resources</td>
                  <td class="px-4 py-3 flex items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-black">
                    Member of Biggest Therapist Community
                  </td>
                  <td class="px-4 py-3 flex items-center justify-center text-gray-200 text-sm bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                      <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                    </svg>
                  </td>
                  <td class="px-4 py-3 opacity-35">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                      <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* blogs  */}

      <section class="text-gray-600 body-font">
        <div class="container px-5 md:px-0 lg:px-20 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-5">
            <h1 class="text-4xl md:text-5xl font-medium title-font mb-4 text-gray-900">
              Our Blogs
            </h1>
          </div>
          <div class="flex w-full flex-wrap lg:-m-4 ">
            {blogsData.map((i) => (
              <div className="w-full md:w-1/3 h-60 md:h-52 lg:h-64 xl:h-80 p-4 " key={i.slug}>
                <Link href={`/blogs/${i.slug}`} class="relative w-full">
                  <Image
                    width={500}
                    height={500}
                    class="w-full h-full rounded-lg object-cover object-center absolute "
                    src={i.img}
                    alt="blog"
                  />
                  <div class="h-full relative bg-black bg-opacity-30 z-10 rounded-lg  ">
                    <div class="p-4 flex flex-col justify-between items-start h-full">
                      <h2 class="tracking-widest text-xs title-font font-medium bg-blue-600 rounded-md px-2 py-1 w-fit text-gray-200 mb-1">
                        {i.category}
                      </h2>

                      <div className="items-start ">
                        <h1 class="title-font text-base lg:text-2xl  font-semibold text-gray-100 mb-3">
                          {i.title}
                        </h1>
                        <div class="flex items-center flex-wrap w-fit">
                          <span class="text-gray-200 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg
                              class="w-4 h-4 mr-1"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                            </svg>
                            {i.author}
                          </span>
                          <span class="text-gray-200 inline-flex items-center leading-none text-sm">
                            <svg
                              class="w-4 h-4 mr-1"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
                              <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
                            </svg>
                            {i.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* aibutton  */}

      <section class="text-gray-600 body-font bg-blue-300">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div class="text-center lg:w-1/2 md:w-2/3 w-full">
            <h1 class="title-font mb-4  text-gray-900 text-3xl md:text-5xl font-bold">
              Al-Powered Assistant for your team
            </h1>
            <p class="mb-8 leading-relaxed">
              Elevate the efficiency of your organization with our Al-enhanced
              tools. Streamline session documentation, take more clients,
              enhance supervision and access insightful analytics to focus more
              on client care and less on paperwork.
            </p>
            <div class="flex justify-center">
              <button class="inline-flex text-blue-300 font-semibold bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded text-lg">
                Coming Soon..
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
