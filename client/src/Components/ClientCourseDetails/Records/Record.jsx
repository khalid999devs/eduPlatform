// import ReactPlayer from "react-player/youtube";
import { useEffect, useState } from "react";
import Video from "./Video";
import { CourseContextConsumer } from "../../../Pages/CourseClientDetails";
function RecordVideo() {
  const { courseInfo } = CourseContextConsumer();
  const [rcdClass, setRcdClass] = useState([]);

  useEffect(() => {
    setRcdClass(courseInfo?.recordedclasses);
  }, [courseInfo]);
  return (
    <div className="w-full mx-auto">
      <h2 className="text-center font-bold text-3xl my-10">Recorded Class</h2>
      <div>
        {rcdClass
          ?.sort((a, b) => {
            let x = a.createdAt;
            let y = b.createdAt;
            if (x > y) return 1;
            else if (x < y) return -1;
            else if (x == y) return 0;
          })
          ?.map((vid, uid) => {
            return (
              <Video
                key={`{vid}=${vid?.id}+${uid}`}
                id={vid?.id}
                sl={uid + 1}
                link={vid?.videoURL}
                title={vid?.videoTitle}
                desc={vid?.desc}
              />
            );
          })}
      </div>
    </div>
  );
}

export default RecordVideo;
