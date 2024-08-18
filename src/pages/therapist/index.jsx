import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaVideo, FaPhone, FaUser, FaChevronLeft, FaChevronRight, FaShare } from 'react-icons/fa';

const Therapist = () => {
  const therapistData = {
    name: "Jaya Saini",
    title: "Consultant Psychologist",
    location: "Clinical Psychologist, Jaipur Rajasthan",
    experience: "1+ years of experience",
    languages: ["English", "Hindi", "Punjabi"],
    expertise: ["Depression", "Self Discovery", "Positive Parenting", "ADHD", "Financial Stress"],
    help: [
      "I can't focus on my work",
      "The pressure around me is too much",
      "I want to have a better study schedule"
    ],
    slots: [
      { day: "SAT", date: "Today", times: ["12:00 PM", "12:30 PM", "04:00 PM", "06:00 PM"] },
      { day: "SUN", date: "4th Aug", times: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"] },
      { day: "MON", date: "5th Aug", times: ["12:00 PM", "03:00 PM", "04:00 PM", "06:00 PM"] },
    ],
    faqs: [
      {
        question: "Why did you choose to become a therapist?",
        answer: "My journey of becoming a therapist began with my own mental health struggles. I felt stuck and hopeless, and seeing significant change was impossible. After studying psychology in school, I became intrigued by cognitive development and how human perception and cognitive processes functioned. Over time, I began growing with everyone. This realization, during my bachelor's studies, helped me understand the transformative power of therapy. Witnessing its impact on a person's life has inspired me. By the end of my degree, I was certain I wanted to become a therapist."
      }
    ],
    videoUrl: "/sample-video.mp4",
    img: "/sample-pfp.jpg"
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("50 mins");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedConsultationType, setSelectedConsultationType] = useState("In-Person");

  const handleConsultationTypeChange = (type) => {
    setSelectedConsultationType(type);
  };

  const handleDateSelection = (day, date) => {
    setSelectedDate({ day, date });
    setSelectedTime(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Video Section */}
      <div className="relative h-64 md:h-96">
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src={therapistData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">{therapistData.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center">
                <Image
                  width={160}
                  height={160}
                  className="rounded-full"
                  src={therapistData.img}
                  alt={therapistData.name}
                />
                <div className="sm:ml-8 mt-4 sm:mt-0 text-center sm:text-left">
                  <h2 className="text-3xl font-semibold text-gray-800">{therapistData.name}</h2>
                  <p className="text-xl text-blue-600">{therapistData.title}</p>
                  <p className="text-gray-600">{therapistData.location}</p>
                  <p className="text-gray-600">{therapistData.experience}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                    {therapistData.languages.map(lang => (
                      <span key={lang} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">About Me</h3>
                <p className="text-gray-700">
                  Hello! I am a Psychologist at Aatmaha. I have completed my Masters in Applied Psychology 
                  (specialization in Clinical and Counselling practice) from the Tata Institute of Social Sciences, 
                  Mumbai. In my years of experience, I have worked in...
                  <Link href="#" className="text-blue-500 hover:underline"> Read more</Link>
                </p>
              </div>
            </div>

            {/* Expertise Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Holds Expertise In</h3>
              <div className="flex flex-wrap gap-3">
                {therapistData.expertise.map(expert => (
                  <span key={expert} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {expert}
                  </span>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Thoughts I Can Help You With</h3>
              <div className="space-y-3">
                {therapistData.help.map(thought => (
                  <div key={thought} className="bg-gray-800 text-white p-3 rounded-lg">
                    {thought}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">FAQs</h3>
              {therapistData.faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-medium text-gray-800">{faq.question}</h4>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Book a Session with {therapistData.name}</h3>
              
              {/* Consultation Type */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Consultation Type</h4>
                <div className="flex space-x-2">
                  {['In-Person', 'Video', 'Call'].map((type) => (
                    <button
                      key={type}
                      className={`flex-1 py-2 px-3 rounded-full text-sm font-medium ${
                        selectedConsultationType === type
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      onClick={() => handleConsultationTypeChange(type)}
                    >
                      {type === 'In-Person' && <FaUser className="inline mr-1" />}
                      {type === 'Video' && <FaVideo className="inline mr-1" />}
                      {type === 'Call' && <FaPhone className="inline mr-1" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Duration */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Session Duration</h4>
                <select
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="50 mins">50 mins</option>
                  <option value="30 mins">30 mins</option>
                  <option value="1 hour">1 hour</option>
                </select>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Select Date</h4>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {therapistData.slots.map((slot) => (
                    <button
                      key={slot.day}
                      className={`flex-shrink-0 p-3 rounded-lg text-center ${
                        selectedDate && selectedDate.day === slot.day
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      onClick={() => handleDateSelection(slot.day, slot.date)}
                    >
                      <div className="font-medium">{slot.day}</div>
                      <div className="text-sm">{slot.date}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Available Time Slots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {therapistData.slots
                      .find((slot) => slot.day === selectedDate.day)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          className={`py-2 px-3 rounded-md text-sm font-medium ${
                            selectedTime === time
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                          onClick={() => handleTimeSelection(time)}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              <button
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  selectedDate && selectedTime
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedDate || !selectedTime}
              >
                Proceed to Book
              </button>

              {/* Share Button */}
              <button className="mt-4 w-full py-3 px-4 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 flex items-center justify-center">
                <FaShare className="mr-2" />
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapist;