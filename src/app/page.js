"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Menu, X } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyBzK7fri8FzeJMu4EycTrUfJSO9mGCungE",
  authDomain: "weddingsite-5e7fd.firebaseapp.com",
  projectId: "weddingsite-5e7fd",
  storageBucket: "weddingsite-5e7fd.firebasestorage.app",
  messagingSenderId: "740352231101",
  appId: "1:740352231101:web:02646a1f98330de41cd9d4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export default function Home() {
  const [rsvp, setRsvp] = useState({ name: "", email: "", attending: "" });
  const [uploads, setUploads] = useState([]);
  const [navOpen, setNavOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the RSVP data in Firestore under the "rsvps" collection
      const docRef = await addDoc(collection(db, "rsvps"), rsvp);
      console.log("Document written with ID: ", docRef.id);
      alert(`Thank you, ${rsvp.name}, for your RSVP!`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your RSVP. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const storageRef = ref(storage, `wedding-uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploads((prevUploads) => [...prevUploads, { name: file.name, url: downloadURL }]);
          });
        }
      );
    });
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans text-gray-800">
      <Head>
        <title>Our Wedding</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-pink-500">Chioma & Mbiatke</h1>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li>
              <Link href="/">
                <span className="hover:text-black cursor-pointer">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="hover:text-black cursor-pointer">About Us</span>
              </Link>
            </li>
            <li>
              <Link href="/gallery">
                <span className="hover:text-black cursor-pointer">Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="hover:text-black cursor-pointer">Contact</span>
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
          <div className="md:hidden bg-white border-t shadow-md">
            <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700">
              <li>
                <a href="#home" className="block" onClick={() => setNavOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="about" className="block" onClick={() => setNavOpen(false)}>
                  About Us
                </a>
              </li>
              <li>
                <a href="gallery" className="block" onClick={() => setNavOpen(false)}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="contact" className="block" onClick={() => setNavOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-pink-100">
        <h1 className="text-center text-5xl bg-pink-300 font-semibold">
          Welcome To Our Love Story...#C&M ❤️
        </h1>
        <Image
          src="/OurPicture.JPG"
          alt="Hero illustration"
          width="600"
          height="100"
          className="relative z-10 object-contain"
        />
        <h1 className="text-5xl font-bold text-gray-900">Chioma & Mbiatke</h1>
        <p className="text-xl mt-3">Join us on our special day - May 3, 2025</p>
      </header>

      {/* Love Story Section */}
      <section className="text-center py-12 px-6">
        <h2 className="text-3xl font-semibold">Our Love Story</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          It all started with a coffee date that turned into a lifetime of love. We can not wait to celebrate our journey with you!
        </p>
      </section>

      {/* Wedding Details */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold">Wedding Details</h2>
        <p className="mt-4">📍 Venue: Presbyterian Church Eliowhani & Astro Hall, Eliozu, Port Harcourt</p>
        <p className="mt-2">⏰ Ceremony: 10:00 AM | Reception: 2:00 PM</p>
      </section>

      {/* RSVP Form */}
      <section className="py-12 px-6 text-center bg-pink-100">
        <h2 className="text-3xl font-semibold">RSVP</h2>
        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded p-2 mb-4"
            value={rsvp.name}
            onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded p-2 mb-4"
            value={rsvp.email}
            onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
            required
          />
          <select
            className="w-full border rounded p-2 mb-4"
            value={rsvp.attending}
            onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
            required
          >
            <option value="">Will you be attending?</option>
            <option value="yes">Yes, I’ll be there!</option>
            <option value="no">Sorry, I can’t make it.</option>
          </select>
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </section>

      {/* Photo & Video Upload Section */}
      <section className="py-12 px-6 text-center bg-white">
        <h2 className="text-3xl font-semibold">Upload Your Memories</h2>
        <p className="mt-4">Share your photos and videos from the wedding!</p>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="mt-4 p-2 border rounded"
          onChange={handleFileUpload}
        />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {uploads.map((file, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded shadow">
              <p className="text-sm truncate">{file.name}</p>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm block mt-1">
                View
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600">Made with ❤️ by Chioma & Mbiatke</footer>
    </div>
  );
}
