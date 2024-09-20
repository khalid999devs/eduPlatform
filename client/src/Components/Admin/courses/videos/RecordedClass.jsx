import React, { useEffect, useState } from 'react';
import VdoUpload from './vdoCourse';
import Video from './video';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import axios from 'axios';
import reqs from '../../../../assets/requests';
import Checkbox from '../../../Form/Checkbox';

const RecordedClass = ({ courseId, data, setData }) => {
  const [addClassState, setAddClassState] = useState({
    prevId: null,
    state: false,
  });
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    if (data?.recordedclasses) {
      const structuredData = data.recordedclasses.reduce((acc, item) => {
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

      setClassData(result);
    }
  }, [data?.recordedclasses]);

  // console.log(data.recordedclass);
  const changeLockVidFeature = (lockFeatureState) => {
    if (
      data.isLockVidFeature === false ||
      (data.isLockVidFeature === true && data.id)
    ) {
      axios
        .patch(
          `${reqs.UPDATE_COURSE}/${data.id}`,
          { isLockVidFeature: lockFeatureState ? true : false },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.succeed) {
            setData((data) => ({
              ...data,
              isLockVidFeature: lockFeatureState ? true : false,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.msg);
        });
    }
  };

  return (
    <>
      <VdoUpload
        id={courseId}
        folders={[
          ...new Set(
            data.recordedclasses?.map((item) => item.folder).filter(Boolean)
          ),
        ]}
        classData={classData}
        recorderClassData={data?.recordedclasses}
        setAddClassState={setAddClassState}
      />
      <div className='grid grid-cols-1 gap-1 justify-center mt-2' id='record'>
        <div className='flex items-center w-full justify-between mb-4'>
          <h2 className='text-center text-xl font-bold'>Recorded Videos</h2>
          <div>
            <Checkbox
              text={'Lock Feature'}
              checked={data?.isLockVidFeature}
              setChecked={changeLockVidFeature}
              name={'Lock-toggle'}
              classes={`!gap-2 !font-medium !text-[0.95rem]`}
            />
          </div>
        </div>

        <p className='inline-block text-left w-fit mx-0'>
          Total Class: {data?.recordedclasses?.length}
        </p>
        {data?.recordedclasses?.length != 0 ? (
          <div className='grid grid-cols-3 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center'>
            <b>Id No.</b>
            <b className='border-l-2 border-blue-600'>Class Title</b>
            <b className='border-l-2 border-blue-600'>Class Link</b>
          </div>
        ) : null}
        {classData?.length != 0 ? (
          <div className='gap-2'>
            {classData?.map((vid, uid) => {
              if (vid.id) {
                return (
                  <Video
                    key={uid}
                    id={vid.id}
                    sl={vid.id}
                    courseId={courseId}
                    nextClassId={
                      classData[uid + 1]
                        ? classData[uid + 1].id ||
                          Object.values(classData[uid + 1])[0][0].id
                        : null
                    }
                    length={vid.videoLength}
                    link={vid.videoURL}
                    title={vid.videoTitle}
                    desc={vid.desc}
                  />
                );
              } else {
                return (
                  <div className='my-4' key={uid}>
                    <p className='my-2 text-lg font-bold'>
                      {Object.keys(vid)[0]}:
                    </p>
                    {Object.values(vid)[0].map((item, key) => (
                      <Video
                        key={key}
                        id={item.id}
                        sl={item.id}
                        courseId={courseId}
                        nextClassId={
                          Object.values(vid)[0][uid + 1]?.id ||
                          (classData[uid + 1]
                            ? classData[uid + 1].id ||
                              Object.values(classData[uid + 1])[0][0].id
                            : null)
                        }
                        length={item.videoLength}
                        link={item.videoURL}
                        title={item.videoTitle}
                        desc={item.desc}
                      />
                    ))}
                  </div>
                );
              }
            })}
          </div>
        ) : null}
        {/* 
        <div className='flex w-full items-end justify-end'>
          <PrimaryButton
            text={'Add Class'}
            classes={`bg-onPrimary-main text-white`}
            onClick={() => {
              setAddClassState({
                prevId: data.recordedclasses
                  ? data.recordedclasses[data.recordedclasses.length - 1]?.id
                  : null,
                state: true,
              });
            }}
          />
        </div> */}
      </div>
    </>
  );
};

export default RecordedClass;
