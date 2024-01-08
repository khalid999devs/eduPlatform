import React from "react";
import VdoUpload from "./vdoCourse";
import Video from "./videos/video";
function EachCourse() {
    return (
        <div className="w-auto h-full p-5 overflow-auto ">
            <div>
                {/* form for video upload and exam link*/}
                <VdoUpload />
            </div>


            <div className="flex flex-wrap gap-1 justify-center">
                {/* record video */}
                <Video />
                <Video />
                <Video />
            </div>
            <hr />

        </div>
    );
}

export default EachCourse;
