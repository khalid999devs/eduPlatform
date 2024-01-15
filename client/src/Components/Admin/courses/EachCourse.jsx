import React, { useEffect, useState } from "react";
import VdoUpload from "./videos/vdoCourse";
import Video from "./videos/video";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../Buttons/PrimaryButton";

import { adminFCourse, updateCourse } from "../../../axios/global";
import reqs, { reqImgWrapper } from "../../../assets/requests";
import { MdFileUpload } from "react-icons/md";
import axios from "axios";
function EachCourse() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [upImg, setUpImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  //image handler to update image
  const handleImg = (e) => {
    setUpImg(e.target.files[0]);
  };
  useEffect(() => {
    adminFCourse(id, setData);
  }, [id]);
  // update image
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
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  //first time fetch data
  useEffect(() => {
    setImgSrc(reqImgWrapper(data?.image));
    if (upImg) setImgSrc(URL.createObjectURL(upImg));
  }, [data?.image, upImg]);

  return (
    <div className="w-auto h-full p-5 overflow-y-scroll overflow-x-hidden resize-y">
      {/* course id */}
      <h2 className=" text-center font-semibold capitalize mb-10 text-3xl sticky -top-5 bg-slate-100 backdrop-blur px-10 z-10 border-2 border-transparent border-b-black shadow-xl shadow-trans_bluish/20">
        course id: {data?.id}
      </h2>
      {/* course basic info */}
      <div className="flex items-start gap-2 text-left w-4/5 mx-auto" id="info">
        <div className="grid grid-cols-3 items-start w-fit mx-auto">
          <label className="capitalize" htmlFor="">
            title:
          </label>
          <input
            className="adminInputBox"
            value={data?.title}
            type="text"
            onChange={(e) =>
              setData((pre) => ({ ...pre, title: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            price:
          </label>
          <input
            className="adminInputBox"
            value={data?.price}
            type="number"
            onChange={(e) =>
              setData((pre) => ({ ...pre, price: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            tags:
          </label>
          <input
            className="adminInputBox"
            value={data?.tags}
            onChange={(e) =>
              setData((pre) => ({ ...pre, tags: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            description:
          </label>
          <textarea
            className="adminInputBox resize-none"
            rows={4}
            value={data?.description}
            type="text"
            onChange={(e) =>
              setData((pre) => ({ ...pre, description: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            Schedule:
          </label>
          <input
            className="adminInputBox"
            value={data?.schedule}
            onChange={(e) =>
              setData((pre) => ({ ...pre, schedule: e.target.value }))
            }
          />
          <PrimaryButton
            text={"update"}
            textClasses={"bg-sky-500 text-white px-4 py-2 rounded-md"}
            type={"submit"}
            onClick={() => updateCourse(id, data)}
          />
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
      <div className="grid grid-cols-1 gap-1 justify-center">
        {/* record video */}
        <h2 className="text-center text-lg underline font-bold">Recorded Videos</h2>
        {data?.recordedclasses && (
          <>
            {data?.recordedclasses?.map((vid, id) => {
              return (
                <Video
                  key={id}
                  length={vid.videoLength}
                  link={vid.videoURL}
                  title={vid.videoTitle}
                />
              );
            })}
          </>
        )}
      </div>
      <div>
        {/* form for video upload and exam link*/}
        <VdoUpload id={id} />
      </div>

      <hr />
    </div>
  );
}

export default EachCourse;
