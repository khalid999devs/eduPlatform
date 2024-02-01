// import ReactPlayer from "react-player/youtube";
import YouTubePlayer from "../../YTPlayer/YTPlayer";
function RecordVideo() {
  return (
    <div className="w-full mx-auto">
      <h2>This is record page</h2>
      <div className="w-3/4 mx-auto relative">
        <div className="absolute bg-onPrimary-main/80 text-blue-50 p-5 right-px top-0 select-none pointer-events-auto rounded-bl-xl">
          Chemgenie
        </div>
        <YouTubePlayer
          videoId={"https://www.youtube.com/watch?v=LXb3EKWsInQ"}
        />
      </div>
    </div>
  );
}

export default RecordVideo;
