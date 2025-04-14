// "use client";
// import Image from "next/image";
// import Head from "next/head";
// import Link from "next/link";
// import { useState } from "react";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, serverTimestamp} from "firebase/firestore";
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
//   // const [rsvp, setRsvp] = useState({ name: "", email: "", attending: "",});
//   // const [uploads, setUploads] = useState([]);
//   // const [navOpen, setNavOpen] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault(); // Prevent the default form submission behavior
  
//   //   try {
//   //     // Save the RSVP data in Firestore
//   //     const docRef = await addDoc(collection(db, "rsvps"), {
//   //       name: rsvp.name,
//   //       email: rsvp.email,
//   //       attending: rsvp.attending,
//   //     });
  
//   //     console.log("Document written with ID: ", docRef.id);
  
//   //     // Show a success message
//   //     alert(`Thank you, ${rsvp.name}, for your RSVP!`);
  
//   //     // Clear the form by resetting the rsvp state
//   //     setRsvp({ name: "", email: "", attending: "",});
//   //   } catch (error) {
//   //     console.error("Error adding document: ", error);
//   //     alert("There was an error submitting your RSVP. Please try again.");
//   //   }
//   // };
//   const [rsvp, setRsvp] = useState({ 
//     name: "", 
//     email: "", 
//     attending: "",
//     guests: 1, // Added guests field with default value
//     message: "" // Optional message field
//   });
//   const [uploads, setUploads] = useState([]);
//   const [navOpen, setNavOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
//   const [submitError, setSubmitError] = useState(null); // Error state
//   const [isUploading, setIsUploading] = useState(false);
// const [uploadProgress, setUploadProgress] = useState(0);
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!rsvp.name || !rsvp.email) {
//       setSubmitError("Please fill in all required fields");
//       return;
//     }
  
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(rsvp.email)) {
//       setSubmitError("Please enter a valid email address");
//       return;
//     }
  
//     setIsSubmitting(true);
//     setSubmitError(null);
  
//     try {
//       // Save the RSVP data in Firestore with timestamp
//       const docRef = await addDoc(collection(db, "rsvps"), {
//         ...rsvp,
//         createdAt: serverTimestamp(), // Add server-side timestamp
//         status: "pending" // Additional metadata
//       });
  
//       console.log("Document written with ID: ", docRef.id);
  
//       // If there are uploads, associate them with this RSVP
//       if (uploads.length > 0) {
//         await updateDoc(docRef, {
//           uploads: uploads.map(file => ({
//             name: file.name,
//             url: file.url
//           }))
//         });
//       }
  
//       // Show success feedback (consider using toast instead of alert)
//       alert(`Thank you, ${rsvp.name}, for your RSVP! We've sent a confirmation to ${rsvp.email}`);
  
//       // Reset form
//       setRsvp({ 
//         name: "", 
//         email: "", 
//         attending: "",
//         guests: 1,
//         message: ""
//       });
//       setUploads([]);
  
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       setSubmitError("There was an error submitting your RSVP. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Example of how to handle file uploads
//   const handleFileUpload = async (e) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
  
//     try {
//       const uploadPromises = Array.from(files).map(async (file) => {
//         const storageRef = ref(storage, `rsvp-uploads/${Date.now()}-${file.name}`);
//         await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(storageRef);
//         return { name: file.name, url: downloadURL };
//       });
  
//       const uploadedFiles = await Promise.all(uploadPromises);
//       setUploads(prev => [...prev, ...uploadedFiles]);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setSubmitError("File upload failed. Please try again.");
//     }
//   };
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   // const handleFileUpload = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   files.forEach((file) => {
//   //     const storageRef = ref(storage, `wedding-uploads/${file.name}`);
//   //     const uploadTask = uploadBytesResumable(storageRef, file);

//   //     uploadTask.on(
//   //       "state_changed",
//   //       (snapshot) => {
//   //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   //         console.log(`Upload is ${progress}% done`);
//   //       },
//   //       (error) => {
//   //         console.error("Upload failed:", error);
//   //       },
//   //       () => {
//   //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//   //           setUploads((prevUploads) => [...prevUploads, { name: file.name, url: downloadURL }]);
//   //         });
//   //       }
//   //     );
//   //   });
//   // };


//   return (
//     <div className="bg-pink-500 min-h-screen font-sans text-gray-800">
//       <Head>
//         <title>Our Wedding</title>
//       </Head>

//       {/* Navbar */}
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
//                 <a href="" className="block" onClick={() => setNavOpen(false)}>
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
//     Welcome To Our LoveStory... #C&M25 ❤️ Welcome To Our LoveStory... #C&M25 ❤️ Welcome To Our LoveStory... #C&M25 ❤️
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

//       {/* Love Story Section */}
//       <section className="text-center py-12 px-6">
//         <LoveStory />
//         {/* <h2 className="text-4xl italic font-serif font-semibold">Our Love Story</h2>
//         <p className="mt-4 max-w-2xl mx-auto italic">
//           It all started with a coffee date that turned into a lifetime of love. We can not wait to celebrate our journey with you!
//         </p> */}
//       </section>

//       {/* Wedding Details */}
//       <section className="bg-white py-12 px-6 text-center">
//         <h2 className="text-3xl italic font-serif font-semibold">Wedding Details</h2>
//         <p className="mt-4 text-xl italic">📍 Venue: Presbyterian Church Eliowhani & Astro Hall, Eliozu, Port Harcourt</p>
//         <p className="mt-2">⏰ Ceremony: 10:00 AM | Reception: 2:00 PM</p>
//       </section>

//       {/* RSVP Form */}
//       <section className="py-12 px-6 text-center bg-pink-100">
//         <h2 className="text-4xl italic font-serif font-semibold">RSVP</h2>
//         <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="w-full border rounded p-2 mb-4"
//             value={rsvp.name}
//             onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="w-full border rounded p-2 mb-4"
//             value={rsvp.email}
//             onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
//             required
//           />
//           <select
//             className="w-full border rounded p-2 mb-4"
//             value={rsvp.attending}
//             onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
//             required
//           >
//             <option value="">Will you be attending?</option>
//             <option value="yes">Yes, I’ll be there!</option>
//             <option value="no">Sorry, I can’t make it.</option>
//           </select>
//           <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded italic font-serif">
//             Submit
//           </button>
//         </form>
//       </section>

//       {/* Photo & Video Upload Section */}
//       {/* <section className="py-12 px-6 text-center bg-white">
//         <h2 className="text-4xl italic font-serif font-semibold">Upload Your Memories</h2>
//         <p className="mt-4 text-lg italic font-serif">Share your photos and videos from the wedding!</p>
//         <input
//           type="file"
//           multiple
//           accept="image/*,video/*"
//           className="mt-4 p-2 border rounded"
//           onChange={handleFileUpload}
//         />
//         <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//           {uploads.map((file, index) => (
//             <div key={index} className="bg-gray-100 p-2 rounded shadow">
//               <p className="text-sm truncate">{file.name}</p>
//               <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm block mt-1">
//                 View
//               </a>
//             </div>
//           ))}
//         </div>
//       </section> */}
//       <section className="py-12 px-4 sm:px-6 bg-white">
//   <div className="max-w-4xl mx-auto">
//     <h2 className="text-3xl md:text-4xl italic font-serif font-semibold text-center">
//       Upload Your Memories
//     </h2>
//     <p className="mt-3 text-lg italic font-serif text-center text-gray-600">
//       Share your photos and videos from the wedding!
//     </p>

//     {/* Improved File Upload Area */}
//     <div className="mt-8 border-2 border-dashed border-pink-200 rounded-lg p-8 text-center hover:border-pink-300 transition-colors">
//       <input
//         type="file"
//         id="memory-upload"
//         multiple
//         accept="image/*,video/*"
//         className="hidden"
//         onChange={handleFileUpload}
//       />
//       <label
//         htmlFor="memory-upload"
//         className="cursor-pointer flex flex-col items-center justify-center space-y-4"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-12 w-12 text-pink-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//           />
//         </svg>
//         <span className="text-lg font-medium text-pink-600">
//           Click to upload or drag and drop
//         </span>
//         <span className="text-sm text-gray-500">
//           JPEG, PNG, MP4 up to 10MB
//         </span>
//       </label>
//     </div>

//     {/* Upload Progress Indicator */}
//     {isUploading && (
//       <div className="mt-6">
//         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-pink-500 transition-all duration-300"
//             style={{ width: `${uploadProgress}%` }}
//           ></div>
//         </div>
//         <p className="mt-2 text-sm text-gray-600 text-center">
//           Uploading... {uploadProgress}%
//         </p>
//       </div>
//     )}

//     {/* Uploaded Files Gallery */}
//     {uploads.length > 0 && (
//       <div className="mt-10">
//         <h3 className="text-xl font-serif italic mb-4">Your Uploads</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {uploads.map((file, index) => (
//             <div
//               key={index}
//               className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               {file.type.startsWith('image/') ? (
//                 <img
//                   src={file.url}
//                   alt={file.name}
//                   className="w-full h-40 object-cover"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-12 w-12 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//               )}
//               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                 <a
//                   href={file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white bg-pink-500 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
//                   title="View Full Size"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     />
//                   </svg>
//                 </a>
//               </div>
//               <div className="p-2 bg-white">
//                 <p className="text-xs text-gray-600 truncate">{file.name}</p>
//                 <p className="text-xs text-gray-400">
//                   {file.size && formatFileSize(file.size)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// </section>

// {/* Footer */}
// <footer className="text-center py-8 text-gray-600 italic font-serif bg-pink-50 mt-12">
//   <p>Made with ❤️ by Chioma & Mbiatke</p>
//   <p className="mt-2 text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
// </footer>
//       {/* Footer */}
//       <footer className="text-center py-6 text-gray-600 italic font-serif">Made with ❤️ by Chioma & Mbiatke</footer>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Gift, Menu, X } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import LoveStory from "@/components/LoveStory";
import emailjs from '@emailjs/browser';

const firebaseConfig = {
  apiKey: "AIzaSyBzK7fri8FzeJMu4EycTrUfJSO9mGCungE",
  authDomain: "weddingsite-5e7fd.firebaseapp.com",
  projectId: "weddingsite-5e7fd",
  storageBucket: "weddingsite-5e7fd.appspot.com",
  messagingSenderId: "740352231101",
  appId: "1:740352231101:web:02646a1f98330de41cd9d4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export default function Home() {
  const [rsvp, setRsvp] = useState({ 
    name: "", 
    email: "", 
    attending: "",
    guests: 1,
    message: ""
  });
  const [uploads, setUploads] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rsvp.name || !rsvp.email) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rsvp.email)) {
      setSubmitError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const docRef = await addDoc(collection(db, "rsvps"), {
        ...rsvp,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      if (uploads.length > 0) {
        await updateDoc(docRef, {
          uploads: uploads.map(file => ({
            name: file.name,
            url: file.url,
            type: file.type
          }))
        });
      }
      // Send confirmation email
  await emailjs.send(
    "service_wy893rk",
    "template_0mnycql",
    {
      name: rsvp.name,
      email: rsvp.email,
      attending: rsvp.attending,
      guests: rsvp.guests,
    },
    "27G9Rs3qQ_CUp6fYH"
  );

      alert(`Thank you, ${rsvp.name}! Confirmation sent to ${rsvp.email}`);
      setRsvp({ name: "", email: "", attending: "", guests: 1, message: "" });
      setUploads([]);

    } catch (error) {
      console.error("Error:", error);
      setSubmitError("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleFileUpload = async (e) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0) return;

  //   setIsUploading(true);
  //   setUploadProgress(0);

  //   try {
  //     const uploadPromises = Array.from(files).map((file) => {
  //       return new Promise(async (resolve, reject) => {
  //         const storageRef = ref(storage, `wedding-uploads/${Date.now()}-${file.name}`);
  //         const uploadTask = uploadBytesResumable(storageRef, file);

  //         uploadTask.on(
  //           "state_changed",
  //           (snapshot) => {
  //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //             setUploadProgress(progress);
  //           },
  //           (error) => reject(error),
  //           async () => {
  //             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //             resolve({ 
  //               name: file.name, 
  //               url: downloadURL, 
  //               type: file.type,
  //               size: file.size 
  //             });
  //           }
  //         );
  //       });
  //     });

  //     const uploadedFiles = await Promise.all(uploadPromises);
  //     setUploads(prev => [...prev, ...uploadedFiles]);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     setSubmitError("File upload failed. Please try again.");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const formatFileSize = (bytes) => {
  //   if (bytes === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  // };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    setIsUploading(true);
    setUploadProgress(0);
  
    const CLOUD_NAME = "dfoeih4xx";
    const UPLOAD_PRESET = "wbwgpzey";
  
    try {
      const uploadPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          // const url = `CLOUDINARY_URL=cloudinary://<567751993939671>:<u2oWKD6T4w8Y_4KIceyaA9iQyco>@dfoeih4xx`;
          const url = `https://api.cloudinary.com/v1_1/<dfoeih4xx>/upload`;

          const xhr = new XMLHttpRequest();
          const formData = new FormData();
  
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET);
          formData.append("folder", "wedding-uploads");
  
          xhr.open("POST", url);
  
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              setUploadProgress(progress);
            }
          });
  
          xhr.onload = () => {
            if (xhr.status === 200) {
              const res = JSON.parse(xhr.responseText);
              resolve({
                name: file.name,
                url: res.secure_url,
                type: file.type,
                size: file.size,
              });
            // } else {
            //   reject(new Error("Upload failed"));
            // }
          } else {
            // 👇 This will show the real Cloudinary error
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              console.error("Cloudinary error:", errorResponse);
              reject(new Error(`Upload failed: ${errorResponse.error.message}`));
            } catch (parseError) {
              console.error("Non-JSON error response from Cloudinary:", xhr.responseText);
              reject(new Error("Upload failed with unknown error."));
            }
          }
          };
  
          xhr.onerror = () => reject(new Error("Network error during upload"));
          xhr.send(formData);
        });
      });
  
      const uploadedFiles = await Promise.all(uploadPromises);
      setUploads((prev) => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
      setSubmitError("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-pink-50 min-h-screen font-sans text-gray-800">
      <Head>
        <title>Chioma & Mbiatke Wedding</title>
        <meta name="description" content="Join us for our wedding celebration" />
      </Head>

      {/* Navigation */}
      <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl italic font-serif font-bold text-white">Chioma & Mbiatke</h1>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Story', 'Gallery', 'Gift', 'Direction'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                <span className="text-gray-700 hover:text-pink-600 italic cursor-pointer">
                  {item}
                </span>
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col py-4 space-y-4 px-6">
              {['Home', 'Story', 'Gallery', 'Gift', 'Direction'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                >
                  <span className="block text-gray-700 hover:text-pink-600 italic">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 bg-gradient-to-r from-pink-100 to-pink-200 text-center">
        <div className="overflow-hidden whitespace-nowrap bg-pink-300 py-4 mb-8">
          <h1 className="text-4xl md:text-5xl italic font-semibold inline-block animate-marquee">
            Welcome To Our Love Story... #C&M25 ❤️ Welcome To Our Love Story... #C&M25 ❤️
          </h1>
        </div>

        <CountdownTimer />
        <h1 className="text-4xl md:text-5xl italic font-serif font-bold text-gray-800 mt-8">
          Chioma & Mbiatke
        </h1>
        <p className="text-xl mt-4 italic font-serif">
          May 3, 2025 • Port Harcourt, Nigeria
        </p>
      </header>

      {/* Love Story Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <LoveStory />
      </section>

      {/* Wedding Details */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl italic font-serif font-semibold mb-8">Wedding Details</h2>
          <div className="space-y-4 text-lg">
            <p>📍 Presbyterian Church Eliowhani & Astro Hall</p>
            <p>Eliozu, Port Harcourt</p>
            <p>⏰ Ceremony: 10:00 AM | Reception: 2:00 PM</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-6 bg-pink-100">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl italic font-serif font-semibold text-center mb-8">RSVP</h2>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            {submitError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {submitError}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name*"
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                value={rsvp.name}
                onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Email*"
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                value={rsvp.email}
                onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
                required
              />

              <select
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                value={rsvp.attending}
                onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                required
              >
                <option value="">Will you be attending?*</option>
                <option value="yes">Yes, I will be there!</option>
                <option value="no">Sorry, I can not make it</option>
              </select>

              <input
                type="number"
                min="1"
                placeholder="Number of Guests"
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                value={rsvp.guests}
                onChange={(e) => setRsvp({ ...rsvp, guests: parseInt(e.target.value) || 1 })}
              />

              <textarea
                placeholder="Message (Optional)"
                className="w-full border border-gray-300 rounded p-3 h-24 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                value={rsvp.message}
                onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 bg-pink-600 text-white py-3 rounded-md italic font-serif text-lg hover:bg-pink-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>
      </section>

      {/* Memory Upload Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl italic font-serif font-semibold text-center mb-4">
            Upload Your Memories
          </h2>
          <p className="text-lg italic font-serif text-center text-gray-600 mb-8">
            Share your photos and videos from the wedding!
          </p>

          <div className="border-2 border-dashed border-pink-200 rounded-lg p-8 text-center hover:border-pink-300 transition-colors">
            <input
              type="file"
              id="memory-upload"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="memory-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-lg font-medium text-pink-600">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500">
                JPEG, PNG, MP4 up to 10MB
              </span>
            </label>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Uploading... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}

          {uploads.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-serif italic mb-6 text-center">
                Your Uploads ({uploads.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploads.map((file, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {file.type.startsWith('image/') ? (
                      <Image
                        src={file.url}
                        alt={file.name}
                        className="w-full h-40 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-gray-100 w-full h-40 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-pink-500 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                        title="View Full Size"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-xs font-medium text-gray-600 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 bg-pink-500">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg italic font-serif text-gray-700">
            Made with ❤️ by Chioma & Mbiatke
          </p>
          <p className="mt-2 text-sm text-gray-500">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
