import { AiFillCloseSquare } from 'react-icons/ai';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi';

const EvaluationBoard = ({
  targetResult,
  targetStudent,
  setSideStuListOpen,
  setEvaluationMode,
  targetQuestion,
  setTargetQuestion,
  setTargetIndex,
  targetIndex,
}) => {
  const [targetFile, setTargetFile] = useState({});
  const [fileIndex, setFileIndex] = useState(0);
  const [isNoAns, setIsNoAns] = useState(false);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (targetQuestion?.id) {
      setTargetFile(
        targetQuestion?.stuAns?.files ? targetQuestion.stuAns.files[0] : null
      );
    }
  }, [targetQuestion]);

  const handleFileIndex = (index, targetQuestion) => {
    console.log(targetQuestion, targetFile);

    let tl = !targetFile ? 0 : targetQuestion.stuAns?.files?.length;
    console.log(tl);
    if (index < 0) {
      setTargetIndex((targetIndex) => targetIndex - 1);
      return;
    } else if (index > tl - 1) {
      setTargetIndex((targetIndex) => targetIndex + 1);
      return;
    } else {
      setTargetFile(targetQuestion.stuAns.files[index]);
    }
  };

  // console.log(targetQuestion, fileIndex, targetIndex, targetFile);

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-white z-40'>
      <div className='w-full h-full relative'>
        <div className='flex items-center w-full'>
          <div className='bg-secondary-dark text-primary-main p-2'>
            <h3 className='font-medium text-md'>
              {targetStudent?.fullName ? '' : 'Student Id'}:{' '}
              <span className='text-primary-main font-bold'>
                {targetStudent?.fullName || targetResult?.clientId}
              </span>
            </h3>
          </div>
          {/* ques */}
          <div className='bg-onPrimary-main bg-opacity-75 p-2 pr-6 flex-1 text-center'>
            <h3 className='text-primary-main text-[.8rem]'>
              {targetQuestion?.title}
            </h3>
          </div>
        </div>
        <div
          className='absolute right-[40px] top-[4px]'
          // style={{ transform: 'translate(-50%,-50%)' }}
        >
          <PrimaryButton
            classes={
              '!py-0 !px-0 !rounded-sm bg-primary-main absolute left-[100%] top-0'
            }
            textClasses={'!px-0 !py-0'}
            icon={<AiFillCloseSquare className='text-4xl' />}
            onClick={() => {
              setEvaluationMode(false);
              setSideStuListOpen(false);
            }}
          />
        </div>
        {/* draw board */}
        <div>{isNoAns ? 'No ans by stu' : ''}</div>
        {/* draw board ends */}
        <div className='absolute left-0 bottom-0 w-full flex gap-4'>
          {/* drawing tools */}
          <div className='flex-1 p-2 bg-onPrimary-main'></div>

          {/* arrow buttons */}
          <div className='flex gap-1'>
            <PrimaryButton
              classes={'bg-onPrimary-main text-primary-main'}
              icon={<BiSolidLeftArrow className='text-2xl' />}
              onClick={() => {
                setFileIndex((fileIndex) => fileIndex - 1);
                handleFileIndex(fileIndex - 1, targetQuestion);
              }}
            />
            <PrimaryButton
              classes={'bg-onPrimary-main text-primary-main'}
              icon={<BiSolidRightArrow className='text-2xl' />}
              onClick={() => {
                setFileIndex((fileIndex) => fileIndex + 1);

                handleFileIndex(fileIndex + 1, targetQuestion);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationBoard;
