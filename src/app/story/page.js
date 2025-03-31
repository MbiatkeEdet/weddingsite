"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Menu, X } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import LoveStory from "@/components/LoveStory";




const firebaseConfig = {
  apiKey: "AIzaSyBzK7fri8FzeJMu4EycTrUfJSO9mGCungE",
  authDomain: "weddingsite-5e7fd.firebaseapp.com",
  projectId: "weddingsite-5e7fd",
  storageBucket: "weddingsite-5e7fd.firebasestorage.app",
  messagingSenderId: "740352231101",
  appId: "1:740352231101:web:02646a1f98330de41cd9d4"
};

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// const db = getFirestore(app);

export default function Home() {
  const [rsvp, setRsvp] = useState({ name: "", email: "", attending: "",});
  const [uploads, setUploads] = useState([]);
  const [navOpen, setNavOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Save the RSVP data in Firestore
      const docRef = await addDoc(collection(db, "rsvps"), {
        name: rsvp.name,
        email: rsvp.email,
        attending: rsvp.attending,
      });
  
      console.log("Document written with ID: ", docRef.id);
  
      // Show a success message
      alert(`Thank you, ${rsvp.name}, for your RSVP!`);
  
      // Clear the form by resetting the rsvp state
      setRsvp({ name: "", email: "", attending: "",});
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
    <div className="bg-pink-500 min-h-screen font-sans text-gray-800">
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
                <Link href="/" className="block" onClick={() => setNavOpen(false)}>
                  Home
                </Link>
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

      {/* Hero Section */}
      <header className="text-center py-20 bg-pink-100">
      <div className="overflow-hidden whitespace-nowrap bg-pink-300 py-4">
  <h1 className="text-5xl italic font-semibold inline-block animate-marquee">
    Welcome To Our LoveStory... #C&M25 ❤️ Welcome To Our LoveStory... #C&M25 ❤️ Welcome To Our LoveStory... #C&M25 ❤️
  </h1>
</div>

        {/* <CountdownTimer /> */}
        {/* {/* <Image */}
        <Image
          src="/Love16.JPG"
          alt="Hero illustration"
          width="150"
          height="150"
          className="relative mt-6 py-6 px-6 items-center justify-center ml-9 rounded-full"
        /> 
        <h1 className="text-5xl italic font-serif font-bold text-gray-800 mt-6">Our Story</h1>
        <p className="text-xl mt-3 italic font-serif">How it all started</p>
      </header>

      <section>
      <div className="min-h-screen bg-pink-50 p-6">
      <Head>
        <title>Love Story Questionnaire</title>
        <meta
          name="description"
          content="Reflect on your journey together with our Love Story Questionnaire."
        />
      </Head>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-serif italic mb-6 text-center text-pink-700">
          How it all started
        </h1>
        <p className="mb-4 text-gray-700">
          Reflect on your journey together with these heartfelt questions:
        </p>
        <ul className="list-decimal ml-6 space-y-4 text-gray-800">
          <li>
            <strong>How did you meet?</strong>
            <p className="ml-4">
              Describe the moment your paths first crossed, whether it was a chance encounter,
              an introduction by a friend, or a memorable event.
            </p>
          </li>
          <li>
            <strong>Describe your first date.</strong>
            <p className="ml-4">
              Share the details of your first date—the setting, the excitement, and the emotions you felt
              as you got to know each other.
            </p>
          </li>
          <li>
            <strong>Tell us about the proposal (if applicable).</strong>
            <p className="ml-4">
              Relive the moment of the proposal. Was it a surprise, a grand gesture, or an intimate
              moment? Describe the emotions and details that made it unforgettable.
            </p>
          </li>
          <li>
            <strong>Share a special memory.</strong>
            <p className="ml-4">
              Recall a moment that stands out in your journey together—a time when you felt incredibly
              connected or experienced a shared moment of joy.
            </p>
          </li>
          <li>
            <strong>What are your future dreams together?</strong>
            <p className="ml-4">
              Envision your future as a couple. What adventures do you hope to embark on, what milestones do you
              aspire to reach, and what legacy would you like to build together?
            </p>
          </li>
        </ul>
        
      </div>
    </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 italic font-serif">Made with ❤️ by Chioma & Mbiatke</footer>
    </div>
  );
}
