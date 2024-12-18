import React from 'react';
import img from '../assets/banner-1.webp';
import img1 from '../assets/banner-2.webp';
import img2 from '../assets/banner-3.webp';
import img3 from '../assets/banner-4.webp';
import img4 from '../assets/banner-5.webp';
import img5 from '../assets/banner-6.webp';

function Hero() {
  return (
    <div className=''>
      {/* this is for desktop  */}
    <div className=' h-auto  p-2 gap-3 hidden md:flex  '>
    <div className=' ' >
<img src={img}  alt="" />
    </div>
    <div>
<img src={img1} alt="" />
    </div>
    <div>
<img src={img2} alt="" />
    </div>
    </div>
    <div className=' h-auto p-2  gap-4 hidden md:flex '>
    <div className='' >
<img src={img3} alt="" />
    </div>
    <div>
<img src={img4} alt="" />
    </div>
    <div>
<img src={img5} alt="" />
    </div>
    </div>
    {/* for mobile menu  */}
    <div>
    <div className=' h-auto  gap-3 block md:hidden '>
      <div className="main-1 p-2">
        <img src={img} alt="" />
      </div>
      <div className="main-2 flex  justify-center p-2 gap-3 ">
        <img src={img1} className='w-[48%]' alt="" />
        <img src={img2} className='w-[48%]' alt="" />
      </div>
      <div className="main-2 flex  justify-center p-2 gap-3 ">
        <img src={img3} className='w-[48%]' alt="" />
        <img src={img4} className='w-[48%]' alt="" />
      </div>
      <div className="main-1 p-2">
        <img src={img5} alt="" />
      </div>
    </div>
    </div>
    </div>
  );
}

export default Hero;
