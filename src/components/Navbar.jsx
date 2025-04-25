import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X } from "lucide-react";
import { useState } from 'react';


// const [navOpen, setNavOpen] = useState(false);

function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
  return (
    <div>
        
    <div className="bg-pink-500 font-sans text-gray-800">
      <Head>
        <title>Our Wedding</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
          <h1 href="/"className="text-4xl italic font-serif font-bold text-white cursor-pointer">Chioma & Mbiatke</h1>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li>
              <Link href="/">
                <span className="hover:text-black italic cursor-pointer">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/story">
                <span className="hover:text-black italic cursor-pointer">Story</span>
              </Link>
            </li>
            <li>
              <Link href="/gallery">
                <span className="hover:text-black  italic cursor-pointer">Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/gift">
                <span className="hover:text-black  italic cursor-pointer">Gift</span>
              </Link>
            </li>
            <li>
              <Link href="/direction">
                <span className="hover:text-black italic cursor-pointer">Direction</span>
              </Link>
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className={`
            md:hidden bg-white border-t shadow-md absolute top-16 left-0 w-full 
            transform transition-transform duration-300
            ${navOpen ? "translate-y-0" : "-translate-y-full"}
          `}
          >
            <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700">
              <li className="italic">
                <a href="/" className="block" onClick={() => setNavOpen(false)}>
                  Home
                </a>
              </li>
              <li className="italic">
                <a href="story" className="block" onClick={() => setNavOpen(false)}>
                  Story
                </a>
              </li>
              <li className="italic">
                <a href="gallery" className="block" onClick={() => setNavOpen(false)}>
                  Gallery
                </a>
              </li>
              <li className="text-lg italic">
                <a href="gift" className="block" onClick={() => setNavOpen(false)}>
                  Gift
                </a>
              </li>
              <li className="italic text-pink-500">
                <a href="direction" className="block" onClick={() => setNavOpen(false)}>
                  Direction
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

     
</div>
  </div>
  )
}

export default Navbar;