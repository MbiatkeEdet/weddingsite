"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const images = [
  { src: "/Love6.JPG", title: "Onyakachi",  name: "Chief Bridesmaid", desc: "The first time we met" },
  { src: "/Love3.JPG", title: "First Date", desc: "Our first date" },
  { src: "/Love24.JPG", title: "Magical Moment", desc: "A magical moment" },
  { src: "/Love1.jpg", title: "Proposal", desc: "Saying yes to forever" },
  { src: "/Love4.jpg", title: "Sunset Love", desc: "A beautiful sunset together" },
  { src: "/Love5.jpg", title: "Pure Joy", desc: "Pure happiness" },
  { src: "/Love7.jpg", title: "Laughter", desc: "Candid laughter" },
  { src: "/Love8.jpg", title: "Stolen Kiss", desc: "A stolen kiss" },
];

export default function LoveStory() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <section className="text-center py-12 px-6 bg-gradient-to-b from-pink-100 to-white">
        <motion.h2
          className="text-4xl italic mt-6 font-serif font-semibold text-pink-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Wedding Party Team
        </motion.h2>
        <p className="mt-4 max-w-2xl mx-auto italic">
          Meet the important people in our lives
        </p>

        {/* Scrolling Image Section */}
        <div
          ref={scrollRef}
          className="mt-8 flex space-x-6 overflow-x-auto scrollbar-hide p-4"
        >
          {images.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-64 flex-shrink-0">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={item.src}
                  alt={`Love Story ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Title */}
              <h3 className="mt-2 text-lg font-bold text-gray-800">{item.title}</h3>
              {/* Name */}
              <h3 className="mt-2 text-lg font-bold text-gray-800">{item.name}</h3>
              {/* Description */}
              <p className="text-center text-sm text-pink-500 font-semibold italic w-full">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      <section>
        
      <div className="mt-12 py-8">
          <h2 className="text-3xl italic text-pink-500 font-serif font-semibold text-center">
            Our Love Story in Motion
          </h2>
          <p className="mt-4 text-3xl text-gray-600 text-center italic font-serif text-black">
            A collection of beautiful moments captured in video from our friends.
          </p>


          {/* Local Video */}
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="relative w-full h-0 pb-[56.25%]">
              <video className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" controls>
                <source src="/videos/video1.mp4" type="video/mp4" />
          
              </video>
            </div>
          </div>
          </div>

          <footer className="text-center py-6 text-gray-600 italic  bg-pink-500 font-serif mt-7">Made with ❤️ by Chioma & Mbiatke</footer>
      </section>
    </>

    
  );
}
