import Link from "next/link";
import Image from "next/image";
import category from "@/libs/category";

export default function Tests() {
  return (
    <section class="text-gray-600 body-font bg-blue-200">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full ">
          <h1 class="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-900">
            Categories
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base md:block hidden mb-10">
            This are the categories we offer right now, later on it will move to
            12 different categories with to cover all the areas of life .
          </p>
        </div>
        <div class="flex flex-wrap justify-center items-center -m-4">
          <div class="portfolio-container">
            {category?.map((i) => (
              <Link key={i.link} href={`/assessment?filter=Category&category=${i.link}`}>
              <div
                
                class="portfolio-box"
                data-sr-id="14"
                style={{
                  visibility: "visible",
                  opacity: 1,
                  transform:
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                  transition:
                    "opacity 2s cubic-bezier(0.5, 0, 0, 1) 0.2s, transform 2s cubic-bezier(0.5, 0, 0, 1) 0.2s",
                }}
              >
                <Image width={500} height={500} priority src={i.img} alt="" />
                <div class="portfolio-layar">
                  <h4>{i.title}</h4>

                  <Link href={`/assessment?filter=Category&category=${i.link}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: "#058eff" }}
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                      <path d="M9.293 7.707 13.586 12l-4.293 4.293 1.414 1.414L16.414 12l-5.707-5.707z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
