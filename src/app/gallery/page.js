"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const images = [
  { src: "/folk.jpg", title: "Obioha(Folk)",  name: "Best Man", desc: "The money man 'OnyeNku', my guyest guy great guy, no dull moments ever cheerful and supportive, one of the kindest people i know... single and ready to settle down this year Amen" },
  { src: "/oto.jpg", title: "Oto", name: "Groomsman", desc: "My guy my guy, the ladies man, realtor extraordairne" },
  { src: "/eze.jpg", title: "Eze", name: "Groomsman", desc:  "Cool guy with great sense of humour, doing exploits in the oil&gas sector, single and searching seriously" },
  { src: "/chibuzor.jpg", title: "Chibuzor", name: "Groomsman", desc: "Mikey my guy, great guy... our crypto guy, bill him o he has money 😂 not single not searching cos he is happily 'TAKEN'" },
  { src: "/uby.jpg", title: "Ubong", name: "Groomsman", desc: "Effi dada my guy my guy, cool guy, always smiling, enterpreneur per excellence doing great things in the city of uyo... very single and searching!!" },
  { src: "/jeff.jpg", title: "Jeff", name: "Groomsman", desc: "Officer Jato 😂 my guy, great guy, focused and purpose driven officer... not single and not searching... happily TAKEN" },
  { src: "/jairo.jpg", title: "Jairo", name: "Groomsman", desc: "Nwa Jai my guy,cool guy and a very funny guy, very focused and purpose drive, single and happily searching" },
  { src: "/victor.jpg", title: "Victor", name: "Groomsman", desc: "MLV 'UmuNwa'lol...great guy always cheerful and an enterpreneur per excellence, the ladies man and very single to stupor 😂" },
  { src: "/ugonna.jpg", title: "Ugonna", name: "Groomsman", desc: "Eke my guy, caring father and husband, great guy and very diligent and focused with his business," },
  { src: "/duke.jpg", title: "Duke Edoho", name: "Groomsman", desc: "Droayung like we call him, awesome guy,super cool dude,great dad and caring husband... the poetic maestro himself 😂" },
  { src: "/alex.jpg", title: "Alex", name: "Groomsman", desc: "Lexy my guy, fresh guy, husband material 1 trillion yards, knows how to pamper and treat ladies nicely" },
  { src: "/ice.jpg", title: "Dozie", name: "Groomsman", desc: "Always very calm just like his nick name 'ICE'... nice guy, husband material, single dunno if he is searching o 😂" },
  { src: "/jet.jpg", title: "Chiemerie", name: "Groomsman", desc: "Jetlife always looking so gentle and calm, great guy... searching but does not want to settle down 😂" },
  { src: "/rotel.jpg", title: "Rotimi", name: "Groomsman", desc: "Rotelllooo my guy great father and husband... definition of focus, doing great things" },
  { src: "/edu.jpg", title: "Chinedu", name: "Groomsman", desc: "The man with the unassuming ways 😂 great guy, father and husband to one wife, the liquor connoisseur per excellence" },
  { src: "/nomso.jpg", title: "Nomso", name: "Groomsman", desc: "" },
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
          className="text-4xl italic mt-8 font-serif font-semibold text-pink-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Wedding Party Team
        </motion.h2>
        {/* <p className="mt-4 max-w-2xl mx-auto italic">
          Meet the 
        </p> */}

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
                  // layout="fill"
                  objectFit="cover"
                  height={"300"}
                  width={"300"}
                />
              </div>
              {/* Title */}
              <h3 className="mt-4 italic font-serif text-3xl font-bold text-gray-800">{item.title}</h3>
              {/* Name */}
              <h3 className="mt-2 text-2xl italic font-serif font-bold text-gray-800">{item.name}</h3>
              {/* Description */}
              <p className="text-center text-sm text-pink-500 font-serif italic w-full">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      <section>
        
      <div className="mt-12 py-8">
          <h2 className="text-3xl italic text-pink-500 font-serif font-semibold text-center">
            Love Notes And Well Wishes From Friends 
          </h2>
          <p className="mt-4 text-3xl text-gray-600 text-center italic font-serif text-black">
            A collection of beautiful moments captured in video from our friends.
          </p>


          {/* Local Video */}
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="relative w-full h-0 pb-[56.25%]">
              <video className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" controls>
                <source src="/videos/video5.mp4" type="video/mp4" />
          
              </video>
            </div>
          </div>
          </div>

          <footer className="text-center py-6 text-gray-600 italic  bg-pink-500 font-serif mt-7">Made with ❤️ by Chioma & Mbiatke</footer>
      </section>
    </>

    
  );
}
