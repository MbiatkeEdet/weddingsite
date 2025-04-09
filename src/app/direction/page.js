"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons

export default function LocationMap() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center">
      <Head>
        <title>Location</title>
        <meta name="description" content="View our wedding venue location on the map." />
      </Head>

      {/* Navbar */}
      <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-white">Chioma & Mbiatke</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-100">
            {["Home", "Story", "Gallery", "Gift", "Direction"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-black italic">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu with Smooth Animation */}
        <div
          className={`absolute top-16 left-0 w-full bg-pink-600 shadow-lg py-4 transition-all duration-300 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 hidden"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 text-white">
            {["Home", "Story", "Gallery", "Gift", "Direction"].map((item) => (
             <li key={item}>
             <Link href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
               {item} {/* Removed span & applied event directly */}
             </Link>
           </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content with Padding to Prevent Overlapping Navbar */}
      <div className="pt-20 w-full text-center">
        <h1 className="text-3xl italic font-serif font-bold text-pink-400">
          First time in our city? Use the map below to locate the reception venue. See you there!
        </h1>

        {/* Wedding Venue Map */}
        <div className="w-full max-w-4xl h-96 mt-6">
          <iframe
            className="w-full h-full rounded-xl shadow-xl"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.34271043667!2d7.009524773106532!3d4.882147540061765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d324c6ea2df5%3A0x72386b2124bd2581!2sASTRO%20HALLS!5e0!3m2!1sen!2sng!4v1739869666093!5m2!1sen!2sng"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Traditional Marriage Map */}
        <div className="w-full max-w-4xl h-96 mt-8">
          <h2 className="text-lg italic font-serif text-pink-400">Traditional Marriage Map</h2>
          <p className="text-pink-400 text-2xl italic font-serif font-bold">
            Use the map below to locate the venue
          </p>
          <iframe
            className="w-full h-full rounded-xl shadow-xl"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31764.745168788275!2d7.852814962533887!3d5.626920201164718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d29169ab3c7c1%3A0x1a96a81e87ce7fc4!2sNdi%20Ibe%20442109%2C%20Abia!5e0!3m2!1sen!2sng!4v1740264459398!5m2!1sen!2sng"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
