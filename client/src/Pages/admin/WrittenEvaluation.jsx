import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideStuList from '../../Components/Admin/Exams/WrittenEvaluation/SideStuList';
import axios from 'axios';
import reqs from '../../assets/requests';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import EvaluationBoard from '../../Components/Admin/Exams/WrittenEvaluation/EvaluationBoard';
import { AiFillCloseSquare } from 'react-icons/ai';
import PerQuesEval from '../../Components/Admin/Exams/WrittenEvaluation/PerQuesEval';

const WrittenEvaluation = () => {
  const { examId, clientId } = useParams();
  const [targetStudent, setTargetStudent] = useState({});
  const [targetResult, setTargetResult] = useState({});
  const [EvaluationMode, setEvaluationMode] = useState(false);
  const [sideStuListOpen, setSideStuListOpen] = useState(false);
  const [sideStuState, setSideStuState] = useState('neutral'); //neutral,forward,backward

  const [targetQuestion, setTargetQuestion] = useState({});
  const [targetIndex, setTargetIndex] = useState(0);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    axios
      .post(
        reqs.ADMIN_GET_EXAM_RESULTS,
        { examId, mode: 'single', clientId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          const resD = res.data.result;
          const newTargetData = {
            ...resD,
            quesAns: resD.quesAns.filter((item) => item.ansType === 'file'),
          };

          setTargetResult(newTargetData);
          setTargetQuestion(newTargetData.quesAns[0]);
        }
      })
      .catch((err) => {
        alert(err.data.response.msg);
      });
  }, [examId, clientId, reloadTrigger]);

  useEffect(() => {
    let l = targetResult?.quesAns?.length;
    if (l > 0) {
      if (targetIndex < 0 || targetIndex > l - 1) {
        setSideStuListOpen(true);
        // setSideStuState('')
        return;
      }
      setTargetQuestion(targetResult.quesAns[targetIndex]);
    }
  }, [targetIndex]);

  return (
    <div className='h-screen w-full '>
      {/* {EvaluationMode && (
        <EvaluationBoard
          targetResult={targetResult}
          targetStudent={targetStudent}
          setSideStuListOpen={setSideStuListOpen}
          setEvaluationMode={setEvaluationMode}
          targetQuestion={targetQuestion}
          setTargetQuestion={setTargetQuestion}
          setTargetIndex={setTargetIndex}
          targetIndex={targetIndex}
        />
      )} */}

      <div className='max-w-[1300px] w-full m-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-2'>
        <div className='hidden md:block fixed z-40 min-w-[200px] max-w-[220px] w-full h-screen '>
          <SideStuList
            examId={examId}
            clientId={clientId}
            setTargetStudent={setTargetStudent}
            reloadTrigger={reloadTrigger}
          />
        </div>
        <div className='hidden md:block sticky min-w-[220px] max-w-[250px] w-full h-screen '>
          {/* <SideStuList
            examId={examId}
            clientId={clientId}
            setTargetStudent={setTargetStudent}
          /> */}
        </div>
        {/* <div className='max-w-[250px] w-max'>d</div> */}
        <div className='pt-3'>
          <div className='m-auto max-w-[400px] w-full p-4 bg-white shadow-md rounded-md text-center'>
            <h4 className='text-xs'>{targetResult?.otherData?.topic}</h4>
            <h1 className='text-xl font-bold'>
              {targetResult?.otherData?.examName}
            </h1>
            <h3 className='font-medium text-md mt-2'>
              {targetStudent?.fullName ? 'Name' : 'Student Id'}:{' '}
              <span className='text-onPrimary-main font-bold'>
                {targetStudent?.fullName || targetResult?.clientId}
              </span>
            </h3>
            <h3 className='font-medium text-md'>
              Total Score:{' '}
              <span
                className={`font-bold ${
                  targetResult?.isFileChecked
                    ? '!text-green-600'
                    : '!text-orange-500'
                }
                `}
              >
                {targetResult?.score}
              </span>
            </h3>
            <h3 className='font-medium text-md'>
              Status:{' '}
              <span
                className={`font-bold ${
                  targetResult?.isFileChecked
                    ? '!text-green-600'
                    : '!text-orange-500'
                }
                `}
              >
                {targetResult?.isFileChecked ? 'Evaluated' : 'Pending'}
              </span>
            </h3>
          </div>

          {/* <div className='max-w-[400px] w-full m-auto mt-6'>
            <PrimaryButton
              text={'Enter Evaluation Mode'}
              classes={'bg-onPrimary-main text-primary-main w-full'}
              onClick={() => setEvaluationMode(true)}
            />
          </div> */}

          {/* per ques Eval */}
          {targetResult.quesAns?.map((item, key) => {
            return (
              <PerQuesEval
                key={key}
                fullQues={item}
                examId={targetResult.examId}
                courseId={targetResult.courseId}
                clientId={clientId}
                setReloadTrigger={setReloadTrigger}
              />
            );
          })}
        </div>
      </div>

      {sideStuListOpen && (
        <div className='fixed z-50 top-0 left-0 min-w-[220px] max-w-[250px] w-full h-screen'>
          <div className='w-full relative'>
            <PrimaryButton
              classes={
                '!py-0 !px-0 !rounded-sm bg-primary-main absolute left-[100%] top-0'
              }
              textClasses={'!px-0 !py-0'}
              icon={<AiFillCloseSquare className='text-3xl' />}
              onClick={() => setSideStuListOpen(false)}
            />
          </div>
          <SideStuList
            examId={examId}
            clientId={clientId}
            setTargetStudent={setTargetStudent}
            reloadTrigger={reloadTrigger}
          />
        </div>
      )}
    </div>
  );
};

export default WrittenEvaluation;
