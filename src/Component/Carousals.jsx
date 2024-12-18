import { Button, Carousel } from 'flowbite-react';
import React from 'react';

function Carousals() {
  return (
    <div className="relative">
      {/* Button placed above carousel */}
    

      {/* Carousel container */}
      <div className="h-56 w-full sm:h-64 xl:h-80 2xl:h-[70vh]">
        <Carousel className="h-full">
          <img
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Ftwo%2Fbanner-4.jpg&w=1920&q=100"
            className="object-contain"
            alt="Image 1"
          />
          <img
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Ftwo%2Fbanner-2.jpg&w=1920&q=100"
            alt="Image 2"
          />
          <img
            src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhero%2Ftwo%2Fbanner-3.jpg&w=1920&q=100"
            className="h-[100vh]"
            alt="Image 3"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default Carousals;
