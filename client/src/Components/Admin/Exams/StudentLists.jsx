import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import reqs from '../../../assets/requests';
import axios from 'axios';
import ValuedInput from '../../Form/ValuedInput';
import SingleTableHead from './SingleTableHead';
import { MdOutlineMailOutline } from 'react-icons/md';
import PrimaryButton from '../../Buttons/PrimaryButton';

const resultTableHeads = [
  'Position',
  'Score',
  'Fullname',
  'Email',
  'Phone',
  'Written Evaluation',
  'Exam duration(m:s)',
  'Category',
];

const StudentLists = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { examName, totalMarks, category } = location.state || {};
  const { courseVal, mode, examId } = useParams();
  const { courseOptions } = useOutletContext();
  const [resultData, setResultData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .post(
        reqs.ADMIN_GET_EXAM_RESULTS,
        { examId, mode: 'all' },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          // console.log(res.data);
          setResultData(res.data.result);
          setFilteredData(res.data.result);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(
      resultData.filter((item) =>
        item.fullName.toLowerCase().startsWith(searchTerm)
      )
    );
  };

  const filteredTableHeads =
    category !== 'quiz'
      ? resultTableHeads
      : resultTableHeads.filter((item) => item !== 'Written Evaluation');

  return (
    <div className='min-h-screen w-full -mt-2'>
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-4`}
      >
        <div className='flex gap-1.5 items-center'>
          <h3
            className='text-md font-medium text-opacity-50 text-onPrimary-main cursor-pointer'
            onClick={() => {
              navigate(-1);
            }}
          >
            {courseOptions?.find((op) => op.value == courseVal)?.title}
          </h3>
          <span className='text-lg font-medium'>{'>'}</span>
          <h2 className='text-[1rem] font-bold'>
            {examName || `exam-${examId}`}
          </h2>
        </div>

        <div className='font-medium text-[.9rem] text-secondary-dark'>
          Participants:{' '}
          <span className='text-onPrimary-main'>{resultData.length}</span>
        </div>
      </div>

      <div className={`w-full flex items-center justify-center mt-4 mb-6`}>
        <div className='max-w-[350px] w-full'>
          <ValuedInput
            inputProps={{
              id: 'search-input',
              placeholder: 'Search by Student Name',
              onChange: handleSearch,
              name: 'studentSearch',
            }}
          />
        </div>
      </div>

      {/* list section */}
      <div className='overflow-auto w-full'>
        {resultData.length > 0 ? (
          <table className='min-w-[900px] w-full border shadow-md'>
            <thead className='bg-onPrimary-main border-b text-primary-main'>
              <tr>
                {filteredTableHeads.map((thead, key) => {
                  if (!thead) return <th key={key}></th>;
                  else return <SingleTableHead key={key} title={thead} />;
                })}
              </tr>
            </thead>
            <tbody className='space-y-4'>
              {filteredData?.map((item, value) => {
                return (
                  <tr
                    key={value}
                    className={`break-word relative mt-4 rounded-md border-2 transition-all duration-500 ${
                      item.otherData?.category !== 'quiz'
                        ? 'hover:shadow-md'
                        : ''
                    } ${
                      !item.isFileChecked && category !== 'quiz'
                        ? 'bg-red-900 bg-opacity-10'
                        : 'bg-green-900 bg-opacity-20'
                    }`}
                  >
                    <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {value + 1}
                    </td>
                    <td
                      className={`px-3 py-4 text-xs font-medium max-w-[100px]`}
                    >
                      {item.score}/{totalMarks}
                    </td>
                    <td className='text-xs text-gray-900  px-3 py-4 max-w-[100px]'>
                      {item.fullName}
                    </td>
                    <td className='text-xs text-gray-900 px-3 py-4 max-w-[100px]'>
                      <a
                        href={`mailto:${item.email}`}
                        target='_blank'
                        onClick={() => {
                          navigator.clipboard.writeText(item.email);
                        }}
                      >
                        <MdOutlineMailOutline className='text-xl' />
                      </a>
                    </td>
                    <td className='text-xs text-gray-900 px-3 py-4 whitespace-nowrap'>
                      <a
                        href={`tel:${item.email}`}
                        target='_blank'
                        onClick={() => {
                          navigator.clipboard.writeText(item.phone);
                        }}
                      >
                        {item.phone}
                      </a>
                    </td>
                    {category !== 'quiz' && (
                      <td
                        className={`text-xs text-gray-900 px-3 py-4 whitespace-nowrap ${
                          !item.isFileChecked
                            ? 'text-red-700'
                            : 'text-green-700'
                        }`}
                      >
                        {item.isFileChecked ? (
                          'Evaluated'
                        ) : (
                          <PrimaryButton
                            classes={
                              '!py-1.5 !px-3 bg-red-500 text-primary-main'
                            }
                            textClasses={'!text-xs !normal-case'}
                            text={'Evaluate'}
                            onClick={() => {
                              if (item.otherData?.category !== 'quiz') {
                                navigate(
                                  `/abs-admin/exams/${examId}/written/evaluation/${item.id}`
                                );
                              }
                            }}
                          />
                        )}
                      </td>
                    )}
                    <td className='text-xs text-gray-900 px-3 py-4 max-w-[100px]'>
                      {Math.round(
                        Number(item.duration) / 1000 / 60
                      ).toString() +
                        ':' +
                        Math.round((Number(item.duration) / 1000) % 60)}
                    </td>
                    <td className='text-xs text-gray-900 px-3 py-4 whitespace-nowrap'>
                      {item.otherData?.category}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className='w-full text-center pt-12'>
            <h1 className='font-bold text-lg'>
              No Student participated in this exam
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLists;
