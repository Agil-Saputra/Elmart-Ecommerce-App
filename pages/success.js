import React from "react";
import Success from "../assets/success.svg";
import Image from "next/image";
import Link from "next/link";

const Succes = () => {
  return (
    <div className="main-margin margin-top-global grid h-[80vh] place-items-center">
    <div className="text-center">
        <Image
          src={Success}
          width={600}
          height={600}
          priority
          alt="success ilustration"
        />
       <p className="mt-4 text-xl ">
         Your Payment Successful Return to <span className="font-bold text-primary hover:text-green-800 smooth-transition"><Link href="/" >Home</Link></span> Page
       </p>
    </div>
    </div>
  );
};

export default Succes;
