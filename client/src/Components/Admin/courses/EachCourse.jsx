import React, { useEffect, useState } from "react";
import VdoUpload from "./vdoCourse";
import { useParams } from "react-router-dom";

import { fetchCourse } from "../../../axios/fetchCourses";
import reqs, { reqImgWrapper } from "../../../assets/requests";
import { MdFileUpload } from "react-icons/md";
import axios from "axios";
function EachCourse() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [upImg, setUpImg] = useState(null);
  useEffect(() => {
    fetchCourse(id, setData);
  }, [id]);
  const [imgSrc, setImgSrc] = useState(null);
  const handleImg = (e) => {
    setUpImg(e.target.files[0]);
  };
  useEffect(() => {
    setImgSrc(reqImgWrapper(data?.image));
    if (upImg) setImgSrc(URL.createObjectURL(upImg));
  }, [data?.image, upImg]);
  const updateImage = async () => {
    const imgData = new FormData();
    imgData.append("courseId", data?.id);
    imgData.append("title", data?.title);
    imgData.append("courses", upImg);
    try {
      axios
        .put(reqs.UPDATE_IMAGE, imgData, { withCredentials: true })
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-auto h-4/5 p-5 overflow-auto relative ">
      {/* course id */}
      <h2 className=" text-center font-semibold capitalize mb-10 text-3xl sticky -top-5 bg-slate-100 backdrop-blur px-10 z-10">
        course id: {data?.id}
      </h2>
      {/* course basic info */}
      <div className="flex items-start gap-2 text-left w-3/4 mx-auto" id="info">
        <div className="grid grid-cols-2 items-center w-fit mx-auto">
          <label className="capitalize" htmlFor="">
            title:
          </label>
          <input className="font-semibold p-2" value={data?.title} />
          <label className="capitalize" htmlFor="">
            price:
          </label>
          <input className="font-semibold p-2" value={data?.price} />
          <label className="capitalize" htmlFor="">
            tags:
          </label>
          <input className="font-semibold p-2" value={data?.tags} />
          <label className="capitalize" htmlFor="">
            description:
          </label>
          <input className="font-semibold p-2" value={data?.description} />
          <label className="capitalize" htmlFor="">
            Schedule:
          </label>
          <input className="font-semibold p-2" value={data?.schedule} />
        </div>
        <div className="relative w-max mx-auto">
          {imgSrc && (
            <img
              className="aspect-video"
              src={imgSrc}
              alt="image"
              width={350}
            />
          )}
          <input
            hidden
            type="file"
            name="upImg"
            id="upImg"
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleImg}
          />
          <label
            className="text-center mx-auto w-full bg-sky-400 text-blue-900 flex items-center justify-center py-2 hover:bg-blue-900 hover:text-sky-200 font-semibold transition-colors duration-300 cursor-pointer"
            htmlFor="upImg"
          >
            <MdFileUpload /> Change image
          </label>
          {upImg && (
            <button
              className="bg-green-400 font-bold capitalize w-full text-center py-2"
              onClick={updateImage}
            >
              update
            </button>
          )}
        </div>
      </div>

      <div>
        {/* form for video upload and exam link*/}
        <VdoUpload />
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {/* record video */}
      </div>
      <hr />
    </div>
  );
}

export default EachCourse;
