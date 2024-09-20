// import ReactPlayer from "react-player/youtube";
import React, { useEffect, useState } from 'react';
import Video from './Video';
import { CourseContextConsumer } from '../../../Pages/CourseClientDetails';
import { ContextConsumer } from '../../../App';
import Folder from './Folder';
function RecordVideo() {
  const { courseInfo } = CourseContextConsumer();
  const {
    user: { enrolledCourses },
  } = ContextConsumer();
  const [rcdClass, setRcdClass] = useState([]);
  const [targetClientCourse, setTargetClientCourse] = useState({});

  useEffect(() => {
    if (enrolledCourses?.length > 0 && courseInfo.id) {
      const targetCourse = enrolledCourses.find(
        (item) => item.courseId === courseInfo.id
      );

      setTargetClientCourse(targetCourse);
    }
  }, [enrolledCourses, courseInfo.id]);

  // console.log(rcdClass);

  useEffect(() => {
    if (courseInfo?.recordedclasses) {
      const structuredData = courseInfo.recordedclasses.reduce((acc, item) => {
        if (item.folder) {
          if (!acc[item.folder]) {
            acc[item.folder] = [];
          }
          acc[item.folder].push(item);
        } else {
          acc.nullFolders = acc.nullFolders || [];
          acc.nullFolders.push(item);
        }
        return acc;
      }, {});

      // Sort each folder group and handle the placement of null folder items
      const result = Object.entries(structuredData)
        .reduce((acc, [folder, items]) => {
          if (folder === 'nullFolders') {
            items.forEach((nullItem) => {
              let inserted = false;
              // Find the correct position for null item by id
              for (let i = 0; i < acc.length; i++) {
                const folderItems = Object.values(acc[i])[0]; // Access the array of items inside the folder object
                if (
                  Array.isArray(folderItems) &&
                  folderItems.some((item) => item.id > nullItem.id)
                ) {
                  acc.splice(i, 0, nullItem); // Directly insert the null item as an object
                  inserted = true;
                  break;
                }
              }
              // If not inserted in the loop, add to the end
              if (!inserted) acc.push(nullItem);
            });
          } else {
            acc.push({ [folder]: items });
          }
          return acc;
        }, [])
        .sort((a, b) => {
          let aId = a.id || Object.values(a)[0][0].id;
          let bId = b.id || Object.values(b)[0][0].id;
          if (aId < bId) return -1;
          else return 0;
        });

      // console.log(result);

      setRcdClass(result);
    }
  }, [courseInfo]);

  return (
    <div className='w-full mx-auto'>
      <h2 className='text-center font-bold text-3xl my-10'>Recorded Class</h2>
      <div className='max-w-[600px] w-full m-auto'>
        {rcdClass?.map((vid, uid) => {
          if (vid.id) {
            return (
              <Video
                key={`{vid}=${vid?.id}+${uid}`}
                id={vid.id}
                sl={uid + 1}
                link={vid?.videoURL}
                currentPlVidId={targetClientCourse?.currentPlVidId}
                lockState={
                  targetClientCourse?.redVidLockState[vid.id] == 0 ||
                  !courseInfo.isLockVidFeature
                    ? false
                    : true
                }
                doneState={
                  targetClientCourse?.recVidDoneState[vid.id] == 0
                    ? false
                    : true
                }
                nextClassId={
                  rcdClass[uid + 1]
                    ? rcdClass[uid + 1].id ||
                      Object.values(rcdClass[uid + 1])[0][0].id
                    : null
                }
                title={vid?.videoTitle}
                desc={vid?.desc}
                courseId={courseInfo.id}
                isLockVidFeature={courseInfo.isLockVidFeature}
                // currentPlayingVidId={}
              />
            );
          } else {
            return (
              <Folder
                key={uid}
                targetClientCourse={targetClientCourse}
                uid={uid}
                vid={vid}
                rcdClass={rcdClass}
                courseInfo={courseInfo}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default RecordVideo;
