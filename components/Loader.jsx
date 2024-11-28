// Loader.jsx
import React from "react";
import slot from "@/public/newimages/slot.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-inner flex items-center justify-center">
        {/* <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div>
      <div className="loader-line-wrap">
        <div className="loader-line"></div>
      </div> */}
      <Image src={slot} alt="slot" width={300} height={300}/>
        {/* <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div> */}
      </div>
    </div>


  );
};

export default Loader;
