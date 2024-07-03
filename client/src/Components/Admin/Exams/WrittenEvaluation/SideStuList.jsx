import axios from 'axios';
import React, { useEffect, useState } from 'react';
import reqs from '../../../../assets/requests';
import ValuedInput from '../../../Form/ValuedInput';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const SideStuList = ({ examId, clientId, setTargetStudent, reloadTrigger }) => {
  const navigate = useNavigate();
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
          setResultData(res.data.result);
          setFilteredData(res.data.result);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, [reloadTrigger]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredData(
      resultData.filter((item) =>
        item.fullName.toLowerCase().startsWith(searchTerm)
      )
    );
  };

  return (
    <div className='w-full bg-primary-main px-3 py-1 pb-4 h-full overflow-auto relative'>
      <Link
        to={`/abs-admin/exams/all/written/results/${examId}`}
        className='text-xs text-onPrimary-main text-opacity-80 font-medium duration-300 transition-all hover:text-opacity-100 inline-flex gap-1 items-center hover:underline'
      >
        <IoMdArrowRoundBack /> Back to Student list
      </Link>

      <div className='w-full mb-4 sticky top-0 left-0'>
        <ValuedInput
          inputProps={{
            id: 'search-input',
            placeholder: 'Search by Student Name',
            onChange: handleSearch,
            name: 'studentSearch',
          }}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        {filteredData.map((item, key) => {
          return (
            <div
              key={key}
              className={`p-2 rounded-md shadow-sm duration-500 transition-all hover:shadow-md shadow-[rgba(0,0,0,.3)] hover:shadow-[rgba(0,0,0,.4)] ${
                clientId == item.id
                  ? 'bg-onPrimary-main text-white'
                  : item.isFileChecked
                  ? 'bg-green-900 bg-opacity-30'
                  : 'bg-primary-dark bg-opacity-60'
              } cursor-pointer`}
              onClick={() => {
                navigate(
                  `/abs-admin/exams/${examId}/written/evaluation/${item.id}`
                );
                setTargetStudent(item);
              }}
            >
              {key + 1}. &nbsp; {item.fullName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideStuList;
