"use client";
import Head from "next/head";
import Link from "next/link";

export default function LocationMap() {
  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center">
        <Link href="/" className="mt-4 inline-block bg-black text-white px-4 py-2 rounded">
        Go to Home
      </Link>
      <Head>
        <title>location</title>
        <meta name="description" content="View our wedding venue location on the map." />
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-pink-500">First time in our city?? use the map below to locate the reception venue...see you there !!!</h1>
      <div className=" min-h-screen w-full max-w-4xl h-96">
        <iframe
          className="w-full h-full rounded-xl shadow-xl"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.34271043667!2d7.009524773106532!3d4.882147540061765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d324c6ea2df5%3A0x72386b2124bd2581!2sASTRO%20HALLS!5e0!3m2!1sen!2sng!4v1739869666093!5m2!1sen!2sng"
          allowFullScreen=""
          loading="lazy"
          width="600"
          height="650"
        ></iframe>
      </div>

      <div className=" min-h-screen w-full max-w-4xl h-96 mt-8">
        <h1 className="text-lg text-pink-500">Traditional Marriage Map</h1>
        <p className="text-pink-500 text-2xl font-bold">Use the map below to locate the venue</p>
        <iframe
          className="w-full h-full rounded-xl shadow-xl"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31764.745168788275!2d7.852814962533887!3d5.626920201164718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d29169ab3c7c1%3A0x1a96a81e87ce7fc4!2sNdi%20Ibe%20442109%2C%20Abia!5e0!3m2!1sen!2sng!4v1740264459398!5m2!1sen!2sng">
          allowFullScreen=""
          loading="lazy"
          width="600"
          height="650"
        </iframe>
      </div>
    </div>

    

    
    
  );
}




