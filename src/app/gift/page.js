"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Gift, Banknote, CreditCard, QrCode } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Menu, X } from "lucide-react";
export default function GiftPage() {
  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-pink-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl italic font-serif font-bold text-pink-600 text-center mt-10">
        Your Presence is Our Gift 🎁
      </h1>
      <p className="mt-4 text-center text-gray-700 max-w-2xl">
        Your love and blessings are more than enough! However, if you’d like to gift us something special, here are some ways you can do so.
      </p>

      {/* Gift Options Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Gift Registry */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <Gift size={40} className="text-pink-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-3">Gift Registry</h2>
          <p className="text-gray-600 mt-2">We have registered at the following stores:</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="https://www.amazon.com/wedding/registry/PJY1EGTEA7MZ" target="_blank" className="text-pink-500 font-medium underline">
                Amazon Registry
              </Link>
            </li>
            <li>
              <Link href="https://mywishlistng.com/event/wedding/181817849581926603" target="_blank" className="text-pink-500 font-medium underline">
                WishList Wedding Gifts
              </Link>
            </li>
          </ul>
        </div>

        {/* Cash Gifts (Bank Transfer) */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <Banknote size={40} className="text-pink-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-3">Bank Transfer</h2>
          <p className="text-gray-600 mt-2">Prefer to send a cash gift? Here are our details:</p>
          <button
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            {showBankDetails ? "Hide Details" : "View Bank Details"}
          </button>

          {showBankDetails && (
            <div className="mt-4 text-gray-700">
              <p><strong>Bank Name:</strong> Zenith Bank</p>
              <p><strong>Account Name:</strong> Chioma Ndukwe</p>
              <p><strong>Account Number:</strong> 2086921200</p>

              <p><strong>Bank Name:</strong> Access Bank</p>
              <p><strong>Account Name:</strong> Nkanta Mbiatke</p>
              <p><strong>Account Number:</strong> 0021931996</p>
            </div>
            
          )}
        </div>
      </div>

      {/* QR Code / Payment Link */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg text-center max-w-lg">
        <QrCode size={40} className="text-pink-500 mx-auto" />
        <h2 className="text-xl font-semibold mt-3">Quick Payment</h2>
        <p className="text-gray-600 mt-2">You can also send gifts via mobile payment apps:</p>
        <Link href="https://paypal.me/example" target="_blank" className="mt-3 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md">
          Send Gift via PayPal
        </Link>
      </div>
    </div>
    </>
  );
}


// "use client";
// import Image from "next/image";
// import Head from "next/head";
// import Link from "next/link";
// import { useState } from "react";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { Gift, Menu, X } from "lucide-react";
// import CountdownTimer from "@/components/CountdownTimer";
// import LoveStory from "@/components/LoveStory";




// const firebaseConfig = {
//   apiKey: "AIzaSyBzK7fri8FzeJMu4EycTrUfJSO9mGCungE",
//   authDomain: "weddingsite-5e7fd.firebaseapp.com",
//   projectId: "weddingsite-5e7fd",
//   storageBucket: "weddingsite-5e7fd.firebasestorage.app",
//   messagingSenderId: "740352231101",
//   appId: "1:740352231101:web:02646a1f98330de41cd9d4"
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// const db = getFirestore(app);

// export default function Home() {
//   const [rsvp, setRsvp] = useState({ name: "", email: "", attending: "",});
//   const [uploads, setUploads] = useState([]);
//   const [navOpen, setNavOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
  
//     try {
//       // Save the RSVP data in Firestore
//       const docRef = await addDoc(collection(db, "rsvps"), {
//         name: rsvp.name,
//         email: rsvp.email,
//         attending: rsvp.attending,
//       });
  
//       console.log("Document written with ID: ", docRef.id);
  
//       // Show a success message
//       alert(`Thank you, ${rsvp.name}, for your RSVP!`);
  
//       // Clear the form by resetting the rsvp state
//       setRsvp({ name: "", email: "", attending: "",});
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("There was an error submitting your RSVP. Please try again.");
//     }
//   };
  

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach((file) => {
//       const storageRef = ref(storage, `wedding-uploads/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           console.error("Upload failed:", error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setUploads((prevUploads) => [...prevUploads, { name: file.name, url: downloadURL }]);
//           });
//         }
//       );
//     });
//   };


//   return (
//     <div className="bg-pink-500 min-h-screen font-sans text-gray-800">
//       <Head>
//         <title>Our Wedding</title>
//       </Head>

//       {/* Navbar */}
//       <Gift />
//       <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
//         <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
//           <h1 className="text-xl font-bold text-pink-500">Chioma & Mbiatke</h1>
//           {/* Desktop Menu */}
//           <ul className="hidden md:flex space-x-6 text-gray-700">
//             <li>
//               <Link href="/">
//                 <span className="hover:text-black italic cursor-pointer">Home</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/story">
//                 <span className="hover:text-black italic cursor-pointer">Story</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/gallery">
//                 <span className="hover:text-black  italic cursor-pointer">Gallery</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/gift">
//                 <span className="hover:text-black  italic cursor-pointer">Gift</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/direction">
//                 <span className="hover:text-black italic cursor-pointer">Direction</span>
//               </Link>
//             </li>
//           </ul>
//           {/* Mobile Menu Button */}
//           <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
//             {navOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {navOpen && (
//           <div className={`
//             md:hidden bg-white border-t shadow-md absolute top-16 left-0 w-full 
//             transform transition-transform duration-300
//             ${navOpen ? "translate-y-0" : "-translate-y-full"}
//           `}
//           >
//             <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700">
//               <li className="italic">
//                 <a href="#home" className="block" onClick={() => setNavOpen(false)}>
//                   Home
//                 </a>
//               </li>
//               <li className="italic">
//                 <a href="story" className="block" onClick={() => setNavOpen(false)}>
//                   Story
//                 </a>
//               </li>
//               <li className="italic">
//                 <a href="gallery" className="block" onClick={() => setNavOpen(false)}>
//                   Gallery
//                 </a>
//               </li>
//               <li className="text-lg italic">
//                 <a href="gift" className="block" onClick={() => setNavOpen(false)}>
//                   Gift
//                 </a>
//               </li>
//               <li className="italic text-pink-500">
//                 <a href="direction" className="block" onClick={() => setNavOpen(false)}>
//                   Direction
//                 </a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <header className="text-center py-20 bg-pink-100">
//       <div className="overflow-hidden whitespace-nowrap bg-pink-300 py-4">
//   <h1 className="text-5xl italic font-semibold inline-block animate-marquee">
//     Welcome To Our Love Story... #C&M ❤️ Welcome To Our Love Story... #C&M ❤️ Welcome To Our Love Story... #C&M ❤️
//   </h1>
// </div>

//         <CountdownTimer />
//         {/* <Image
//           src="/OurPicture.JPG"
//           alt="Hero illustration"
//           width="600"
//           height="100"
//           className="relative z-10 object-contain"
//         /> */}
//         <h1 className="text-5xl italic font-serif font-bold text-gray-800 mt-6">Chioma & Mbiatke</h1>
//         <p className="text-xl mt-3 italic font-serif">Join us on our special day - May 3, 2025</p>
//       </header>

      

      

//       {/* Footer */}
//       <footer className="text-center py-6 text-gray-600 italic font-serif">Made with ❤️ by Chioma & Mbiatke</footer>
//     </div>
//   );
// }
