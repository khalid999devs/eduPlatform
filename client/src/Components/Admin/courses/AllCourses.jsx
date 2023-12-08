import React from "react";
import Coursecard from "./courseCart";
import VdoUpload from "./vdoCourse";
import Video from "./videos/video";
import Exams from "./exams/exams";
import ZoomLink from "./live/LivePage";
function AllCourse() {
  return (
    <div className="w-auto h-full p-5 overflow-auto ">
      <div>
        {/* form for video upload and exam link*/}
        <VdoUpload />
      </div>
      <div className="flex flex-col">
        {/* zoom live links */}
        <ZoomLink />
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {/* record video */}
        <Video />
        <Video />
        <Video />
      </div>
      <hr />
      <div className="overflow-auto h-full w-auto flex flex-wrap gap-1 justify-start">
        {courseList.map((val, id) => {
          return (
            <Coursecard
              allData={val}
              id={id}
              cPrice={val.cPrice}
              imagefile={val.img}
              short={val.shortDesc}
              title={val.title}
              key={id}
            />
          );
        })}
      </div>
    </div>
  );
}
const courseList = [
  {
    title: "Web dev crash course",
    img: "/avatar.jpg",
    shortDesc:
      "Dolor voluptua clita sit takimata sanctus. Invidunt elitr diam ipsum stet sit justo, stet nonumy nonumy ea sanctus clita accusam.",
    cPrice: 2000,
  },
  {
    title: "Flutter Dev course",
    img: "/avatar.jpg",
    shortDesc:
      "Dolor voluptua clita sit takimata sanctus. Invidunt elitr diam ipsum stet sit justo, stet nonumy nonumy ea sanctus clita accusam.",
    cPrice: 151861,
  },
  {
    title: "Python Django course",
    img: "/avatar.jpg",
    shortDesc:
      "Dolor voluptua clita sit takimata sanctus. Invidunt elitr diam ipsum stet sit justo, stet nonumy nonumy ea sanctus clita accusam.",
    cPrice: 1861,
  },
];
export default AllCourse;
