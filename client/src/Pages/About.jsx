import React, { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
const About = () => {
  return (
    <div className="px-3 m-auto w-full my-10">
      <h1 className="text-center text-2xl font-semibold">About</h1>
      <Gallery />
    </div>
  );
};

const Gallery = () => {
  window.global ||= window;

  const galleryImages = [
    {
      img: "/Images/bannerPic.jpg",
    },
    {
      img: "/Images/cardPH.jpg",
    },
    {
      img: "/Images/bannerPic.jpg",
    },
    {
      img: "/Images/cardPH.jpg",
    },
    {
      img: "/Images/bannerPic.jpg",
    },
    {
      img: "/Images/cardPH.jpg",
    },
    {
      img: "/Images/bannerPic.jpg",
    },
  ];

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
        className={`sliderwrap fixed top-0 bottom-0 left-0 right-0 z-10 bg-black flex items-center justify-center w-full h-full transition-opacity duration-300 ${
          openPhoto
            ? "opacity-100 pointer-events-auto scale-100"
            : "pointer-events-none opacity-0 scale-50"
        }`}
      >
        <FaChevronCircleLeft
          onClick={prevPhoto}
          className="fixed cursor-pointer text-white z-50 opacity-60 hover:opacity-100 top-2/4 left-10 text-2xl"
        />
        <FaChevronCircleRight
          onClick={nextPhoto}
          className="fixed cursor-pointer text-white z-50 opacity-60 hover:opacity-100 top-2/4 right-10 text-2xl"
        />
        <MdOutlineClose
          onClick={closePhoto}
          className="fixed cursor-pointer text-white z-50 opacity-60 top-10 right-10 hover:opacity-100 text-2xl hover:rounded-lg hover:bg-red-600 rounded-lg bg-slate-600"
        />

        <div className="fullImg max-w-2xl">
          <img src={galleryImages[photoIndex].img} alt="" srcset="" />
        </div>
      </div>

      <div className="gallerywrap flex flex-wrap gap-3 items-center justify-center max-w-2xl m-auto my-9 ">
        {galleryImages &&
          galleryImages.map((slide, index) => {
            return (
              <div
                className="bg-slate-50 single md:w-52 md:h-52 cursor-pointer border-2 border-solid shadow-lg overflow-hidden flex items-center justify-center rounded-md w-36 h-36"
                key={index}
                onClick={() => {
                  handleOpen(index);
                }}
              >
                <img
                  className="hover:scale-105 max-w-full transition-all "
                  src={slide.img}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default About;
