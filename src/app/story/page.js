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
          src="/mbiatke.jpg"
          alt="Hero illustration"
          width="200"
          height="200"
          className="w-35 h-35 rounded-full object-cover mt-4 ml-5"
        /> 
        {/* <h1 className="text-5xl italic font-serif font-bold text-gray-800 mt-3 flex items-start mt-10 ml-10">Love Notes</h1> */}
        <p className="text-4xl font-bold mt-5 italic font-serif flex items-start mt-3 ml-10">Mbiatke (LurexGalvin)</p>
        <p className="flex items-start mt-2 ml-10 text-3xl italic">Groom</p>
        <p className="flex items-start mt-3 ml-10 font-light text-xl">A lot to say about you babygirl, you are so thoughtful, kind, loving and a lover of God... one thing I really appreciate about you is your calm demeanor which makes loving you so easy. You are my lover and my friend, my everything... I cannot believe you will soon be mine, mine to wake up to, to adore, to cherish, to love and I yours. I wonder why people would say beauty is not everything... well I forgive them because they have not had the priviledge of staring at YOU!!... INEM MMI, ACHALUGO, the beauty the moon gets jealous of, in all honesty nothing in Gods majestic creation not even the most magical sunset can beat you in a beauty contest.<br></br>Ucha, Its so easy to love you because you are so kind with a soul full of LOVE and a heart ever so tender. I thank the Lord I met you, I bless the nooks and crannies that led me to you... I promise you baby we will enjoy the very best our love has to offer. I LOVE YOU BOOBERRY </p>


        <div>
        <Image
          src="/chioma.jpg"
          alt="Hero illustration"
          width="200"
          height="200"
          className="w-35 h-35 rounded-full object-cover mt-4 ml-5"
        /> 
        {/* <h1 className="text-5xl italic font-serif font-bold text-gray-800 mt-3 flex items-start mt-10 ml-10">Love Notes</h1> */}
        <p className="text-4xl mt-5 italic font-serif flex items-start mt-3 ml-10 font-bold">Chioma</p>
        <p className="flex items-start mt-2 ml-10 text-3xl italic">Bride</p>
        <p className="flex items-start mt-3 ml-10 text-xl font-light">My Baby… My Lover… My Bestfriend 
The man that effortlessly gives me butterfly chills.
I’m so in awe of your constant love, kindness and unwavering support which inspires me to be the best version of myself.
The best chapter of my life is the one that has you sitting rent free in it and I’m super excited that it’s till eternity Baby.
As we journey towards forever, I promise to cherish, support and adore you always.
I love you more with each passing day and this loving is for life!!!</p>


        </div>
      </header>

     
        
      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 italic font-serif">Made with ❤️ by Chioma & Mbiatke</footer>
    </div>
  );
}
