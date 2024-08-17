import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

export default function Contact() {
  const [message, setMessage] = useState({ Name: "", Email: "", Message: "" });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMessage((prevmsg) => ({ ...prevmsg, [name]: value }));
  }
  const [res, setRes] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      axios({
        method: "post",
        url: `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_EMAIL}`,
        data: {
          Name: message.Name,
          Email: message.Email,
          Message: message.Message,
          _template: "table",
          _subject: "New Contact Form On assess4all site",
        },
      }).then((response) => console.log(response));
      setMessage({ Name: "", Email: "", Message: "" });
      setRes([true, "Message Sent SuccessFully"]);
      setTimeout(() => {
        setRes(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setRes([false, "Some Error Accured"]);
      setTimeout(() => {
        setRes(null);
      }, 3000);
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.0944293680427!2d75.83823377567329!3d25.166289177730828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b026d916ba1%3A0x340e716959148864!2siStart%20Nest%2C%20Kota!5e0!3m2!1sen!2sin!4v1708704630474!5m2!1sen!2sin"
            
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">iStart Nest, Kota Rajasthan</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-blue-500 leading-relaxed">{process.env.NEXT_PUBLIC_EMAIL}</a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">+91-8120148209</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={sendMessage}
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 rounded-lg border border-blue-500"
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Contact Us
          </h2>

          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={message.Name}
              name="Name"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={message.Email}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label for="message" className="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              value={message.Message}
              name="Message"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            type="submit"
          >
            Send Message
          </button>
          {res && (
            <p
              className={`${
                res[0] === true ? "text-green-500" : "text-red-500"
              } text-xs  mt-3`}
            >
              {res[1]}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
