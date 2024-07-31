import Image from "next/image";

export default function Hero() {
  return (
    <section class="text-gray-600 body-font lg:min-h-[85vh] w-screen">
  <div class="tidycal-embed" data-path="atomprodinfo/30-minute-meeting"></div>

      <div class="container py-5 px-5 mx-auto w-full h-full">
        <div
          id="back"
          className="bg-gradient-to-r from-violet-400 to-fuchsia-400 w-full h-full p-5 rounded-3xl flex flex-col md:flex-row lg:relative"
        >
          <div id="hero-text" className="p-10 w-full lg:w-1/2 flex flex-col gap-3">
            <h1 className="xl:text-5xl text-3xl font-bold text-black mb-2">
              Search for therapist
              <br />
              Understand yourself with assess
            </h1>
            <p>
            
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              cupiditate ipsam tenetur aperiam odio quaerat minima repudiandae
              atque eligendi nam.
            </p>
            <button
              type="button"
                onClick={() => console.log("work")}
              className="text-white flex gap-2 w-fit items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-sky-400 focus:ring-4 rounded-3xl border-2 border-blue-400 focus:ring-blue-300 font-medium  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
            >
              Start A Check Up Now
              <div className="rounded-full md:bg-white">
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
          </div>
          <div className="img md:w-1/2">
            <Image src={"/1.png"} width={1000} height={1000} priority alt="hero"/>
          </div>
          <div className="lg:absolute lg:bottom-0 lg:left-0 lg:top-96 flex flex-col gap-5  overflow-hidden md:bg-white p-4 md:pl-0 lg:rounded-tr-3xl w-full lg:w-fit h-fit">
            <div className="flex gap-5 w-full flex-wrap h-fit justify-center items-center">
              <div className="h-72 w-full lg:w-72 bg-gradient-to-r from-violet-300 to-fuchsia-400 rounded-3xl">
              <Image src={"/2.png"} className="w-full scale-105" width={1000} height={1000} priority alt="hero-2"  />
              </div>
              <div className="h-72 w-full lg:w-72 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded-3xl"></div>
            </div>
            <div className="flex gap-2">
             <div className="w-4/5 h-20 bg-blue-600 rounded-full"></div>
             <div className="w-1/5 h-20 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
