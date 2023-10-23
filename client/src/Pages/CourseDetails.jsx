import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { PiNotebook, PiNotePencil, PiVideoBold } from 'react-icons/pi';
import { GoDiscussionClosed } from 'react-icons/go';
import { AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';

const Coursedetails = () => {
  return (
    // <div className='mb-20'>
    //   {/* this is right side code */}
    //   <div className='right-side  mt-10 md:float-right md:w-2/5  '>
    //     <div className='lg:fixed w-96 max-w-sm border m-5 mb-10  rounded-lg shadow bg-gray-800 border-gray-700 '>
    //       <a href='#'>
    //         <img
    //           className='w-full h-64 rounded-t-lg'
    //           src={'/Images/cardPH.jpg'}
    //           alt='product image'
    //         />
    //       </a>
    //       <div className='px-5 pb-5'>
    //         <div className='flex items-center mt-2.5 mb-5'>
    //           <svg
    //             className='w-4 h-4 text-yellow-300 mr-1'
    //             aria-hidden='true'
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='currentColor'
    //             viewBox='0 0 22 20'
    //           >
    //             <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    //           </svg>
    //           <svg
    //             className='w-4 h-4 text-yellow-300 mr-1'
    //             aria-hidden='true'
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='currentColor'
    //             viewBox='0 0 22 20'
    //           >
    //             <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    //           </svg>
    //           <svg
    //             className='w-4 h-4 text-yellow-300 mr-1'
    //             aria-hidden='true'
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='currentColor'
    //             viewBox='0 0 22 20'
    //           >
    //             <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    //           </svg>
    //           <svg
    //             className='w-4 h-4 text-yellow-300 mr-1'
    //             aria-hidden='true'
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='currentColor'
    //             viewBox='0 0 22 20'
    //           >
    //             <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    //           </svg>
    //           <svg
    //             className='w-4 h-4 text-yellow-300 mr-1'
    //             aria-hidden='true'
    //             xmlns='http://www.w3.org/2000/svg'
    //             fill='currentColor'
    //             viewBox='0 0 22 20'
    //           >
    //             <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    //           </svg>
    //           <span className='flex  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
    //             5.0
    //           </span>
    //         </div>
    //         {/* <div className="flex items-center justify-between"> */}
    //         <span className='mb-10 flex text-3xl font-bold  text-white mr-10 '>
    //           2000 tk
    //         </span>
    //         <a
    //           href='#'
    //           className='mb-5 block text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-400 hover:text-black '
    //         >
    //           Enroll now <FaAngleRight className='inline-block' />{' '}
    //         </a>
    //       </div>
    //     </div>
    //   </div>

    //   {/* left side section starts here */}
    //   <div className='left-side  md:float-left md:w-3/5'>
    //     {/* course title........... */}
    //     <h1 className='text-left font-bold mb-10 '>
    //       Lorem ipsum dolor sit amet consectetur.
    //     </h1>
    //     {/* course description- long.... */}
    //     <p className='text-left mb-10'>
    //       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nobis
    //       quaerat rem ullam quibusdam atque mollitia explicabo tenetur totam
    //       quas!
    //     </p>
    //     {/* schedule section */}
    //     <h4 className=' text-left text-2xl border-l-4 border-orange-400 px-5 mb-10 flex items-center'>
    //       <AiOutlineSchedule className='inline-block text-5xl text-orange-400 mr-5' />
    //       {/* this scehdule section is dynamic ................*/}
    //       Schedule: Sat,Mon,Wed | 10:30 pm
    //     </h4>
    //     {/* demo video section */}
    //     <h4 className=' text-left text-2xl border-l-4 border-violet-400 px-5 mb-16 flex items-center '>
    //       <PiVideoBold className='inline-block text-5xl text-violet-400 mr-5' />
    //       Free demo class
    //       {/* demo class link will be provided here......... */}
    //       <a
    //         href='#'
    //         className='px-11 py-2.5 ml-6 bg-stone-200 hover:bg-stone-300 hover:outline-none hover:text-black text-black   font-medium rounded-lg text-base text-center  '
    //       >
    //         Watch video <MdOutlineSlowMotionVideo className='inline-block' />{' '}
    //       </a>
    //     </h4>
    //     {/* course component section */}
    //     <div>
    //       <h1 className='font-bold text-left text-4xl text-blue-900 mb-5'>
    //         Course components
    //       </h1>{' '}
    //       <hr className='mb-10 ' />
    //       <div className='border-gray-700 bg-onPrimary-main rounded-lg p-5 mb-10'>
    //         <h4 className='text-white text-left'>
    //           <HiOutlineAcademicCap className='inline-block text-3xl text-yellow-300' />{' '}
    //           Live classes & recorded previous classes.
    //         </h4>
    //         <h4 className='text-white text-left'>
    //           <PiNotebook className='inline-block text-3xl text-lime-300' />{' '}
    //           Notes made by the Instructor
    //         </h4>
    //         <h4 className='text-white text-left'>
    //           <PiNotePencil className='inline-block text-3xl text-pink-600' />{' '}
    //           Online exams
    //         </h4>
    //         <h4 className='text-white text-left'>
    //           <GoDiscussionClosed className='inline-block text-3xl text-cyan-400' />{' '}
    //           Discussion forum to solve your problems
    //         </h4>
    //       </div>
    //     </div>
    //     {/* instructor section ..................*/}
    //     <h1 className='font-bold text-left text-4xl text-blue-900 mb-5'>
    //       Instructor
    //     </h1>{' '}
    //     <hr className='mb-10' />
    //     <div className='flex flex-col items-center border  rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-onPrimary-main hover:bg-gray-700 mb-16'>
    //       <img
    //         className='w-24 h-24 m-5 rounded-full shadow-lg '
    //         src={'/Images/bannerPic.jpg'}
    //         alt=''
    //       />
    //       <div className='flex flex-col justify-between p-4 leading-normal'>
    //         <h5 className='mb-2 text-2xl font-bold tracking-tight text-left text-white max-[767px]:text-center'>
    //           Afnan Bin Siddique
    //         </h5>
    //         <p className='mb-3 font-normal text-gray-400 text-left max-[767px]:text-center'>
    //           Here are the biggest enterprise <br />
    //           technology acquisitions of 2021 so far,
    //           <br />
    //           in reverse chronological order.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='px-3 w-full m-auto my-10'>Hello</div>
  );
};

export default Coursedetails;
