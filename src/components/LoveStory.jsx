"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

const images = [
  "/Love6.jpg",
  "/Love3.jpg",
  "/Love24.jpg",
  "/Love1.jpg",
  "/Love4.jpg",
  "/Love5.jpg",
  "/Love7.jpg",
  "/Love8.jpg",
  "/Love9.jpg",
  "/Love13.jpg",
  "/Love12.jpg",
  "/Love11.jpg",
  "/Love10.jpg",
  "/Love16.jpg",
  "/Love17.jpg",
  "/Love14.jpg",
  "/Love18.jpg",
  "/Love15.jpg",
  "/trad1.jpg",

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
    <section className="text-center py-12 px-6 bg-gradient-to-b from-pink-100 to-white">
      <motion.h2
        className="text-4xl italic font-serif font-semibold text-pink-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Love Story
      </motion.h2>
      <p className="mt-4 max-w-2xl mx-auto italic">
        It all started with hello! hello!! and weeks of not responding to my messages... and having to go on our first date after consistently stalking and chasing after her 😂 lol, which has turned into a lifetime of love. We can not wait to celebrate our journey with you!
      </p>

      {/* Scrolling Image Section */}
      <div
        ref={scrollRef}
        className="mt-8 flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            width={"70"}
            height={"60"}
            alt={`Love Story ${index + 1}`}
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>
  );
}
