// import ReactPlayer from "react-player/youtube";
import { useState } from "react"; 
import Video from './Video'
function RecordVideo({ rcdClass }) {
  const [showVid, setvid] = useState(false);
  function handleVideo() {
    setvid((pre) => !pre);
  }
  return (
    <div className="w-full mx-auto">
      <h2>This is record page</h2>
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
                key={uid}
                id={vid.id}
                sl={uid + 1}
                length={vid.videoLength}
                link={vid.videoURL}
                title={vid.videoTitle}
                desc={vid.desc}
              />
            );
          })}
      </div>
    </div>
  );
}

export default RecordVideo;
