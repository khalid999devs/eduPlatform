import React, { useEffect, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { getImageGallery } from '../axios/gallery';
import { reqImgWrapper } from '../assets/requests';
const About = () => {
  return (
    <div className='px-3 m-auto w-full my-10 !mb-32 min-h-[50vh]'>
      <h1 className='text-center text-4xl md:text-5xl my-2 mb-8 sm:mb-12 font-semibold'>
        About Us
      </h1>
      <div className='my-5 lg:mx-5 text-sm sm:text-[1rem]'>
        <p className='pl-4 rounded-l-xl text-orange-800'>
          ChemGenie is a dynamic online chemistry education platform designed to
          make learning chemistry engaging and accessible for students of all
          levels. Our comprehensive resources, including interactive lessons,
          videos, and quizzes, help students master complex concepts and excel
          in their studies.
        </p>
        <br />
        <p className='pl-4 rounded-l-xl text-onPrimary-main'>
          At ChemGenie, we believe that understanding chemistry is the key to
          unlocking the mysteries of the natural world. Our platform offers a
          blend of theoretical knowledge and practical applications, ensuring
          students gain a deep and lasting understanding of chemical principles
          through a user-friendly and interactive online experience.
        </p>
      </div>
      <Gallery />
    </div>
  );
};

const Gallery = () => {
  window.global = window.global || window;
  const [galleryImages, setGallery] = useState([{ img: '' }]);

  useEffect(() => {
    try {
      getImageGallery(setGallery);
    } catch (err) {
      console.log(err);
    }
  }, []);
  // console.table(galleryImages);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPhoto, setOpenPhoto] = useState(false);

  const handleOpen = function (index) {
    setPhotoIndex(index);
    setOpenPhoto(true);
  };

  const prevPhoto = function () {
    photoIndex === 0
      ? setPhotoIndex(galleryImages.length - 1)
      : setPhotoIndex(photoIndex - 1);
  };

  const nextPhoto = function () {
    photoIndex === galleryImages.length - 1
      ? setPhotoIndex(0)
      : setPhotoIndex(photoIndex + 1);
  };

  const closePhoto = function () {
    setOpenPhoto(false);
  };
  return (
    <>
      <div
        className={`sliderwrap fixed top-0 bottom-0 left-0 right-0 z-50 bg-black flex items-center justify-center w-full h-full transition-opacity duration-300 ${
          openPhoto
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'pointer-events-none opacity-0 scale-50'
        }`}
      >
        <FaChevronCircleLeft
          onClick={prevPhoto}
          className='fixed cursor-pointer text-white z-50 opacity-60 hover:opacity-100 top-2/4 left-10 text-2xl'
        />
        <FaChevronCircleRight
          onClick={nextPhoto}
          className='fixed cursor-pointer text-white z-50 opacity-60 hover:opacity-100 top-2/4 right-10 text-2xl'
        />
        <MdOutlineClose
          onClick={closePhoto}
          className='fixed cursor-pointer text-white z-50 opacity-60 top-10 right-10 hover:opacity-100 text-2xl hover:rounded-lg hover:bg-red-600 rounded-lg bg-slate-600'
        />

        <div className='fullImg max-w-2xl'>
          <img
            src={reqImgWrapper(galleryImages[photoIndex]?.bigImage)}
            alt=''
            srcSet=''
          />
        </div>
      </div>

      <div className='gallerywrap flex flex-wrap gap-3 items-center justify-center max-w-2xl m-auto my-9 '>
        {galleryImages?.length > 0 &&
          galleryImages.map((slide, index) => {
            return (
              <div
                className='bg-slate-50 single md:w-64 md:h-64 cursor-pointer border-2 border-solid shadow-lg overflow-hidden flex items-center justify-center rounded-md w-48 h-48'
                key={index}
                onClick={() => {
                  handleOpen(index);
                }}
              >
                <img
                  className='hover:scale-105 w-full h-full transition-all object-cover'
                  src={reqImgWrapper(slide?.bigImage)}
                  alt='gallery-image'
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default About;
