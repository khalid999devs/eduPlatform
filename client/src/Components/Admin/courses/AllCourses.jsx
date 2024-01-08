import React from "react";
import Coursecard from "./courseCart";
function AllCourse() {
  return (
    <div className="w-auto h-full p-5 overflow-auto ">
      <hr />
      <div className="overflow-auto h-full w-auto flex flex-wrap gap-1 justify-start items-start">
        {courseList.map((val, id) => {
          return (
            <Coursecard
              key={id}
              allData={val}
              id={id + 1}
            />
          );
        })}
      </div>
      <hr />
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
