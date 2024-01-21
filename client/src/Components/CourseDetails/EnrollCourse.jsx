import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourse } from '../../axios/fetchCourses';
import { ContextConsumer } from '../../App';
import ValuedInput from '../Form/ValuedInput';

const EnrollCourse = () => {
  const { user } = ContextConsumer();
  const { id: courseId } = useParams();
  const { reqData, setReqData } = useState({
    address: user?.address,
  });
  const paymentInfo = {
    total_amount: '',
    currency: 'BDT', // or your preferred currency
    tran_id: '', // generate a unique id for each transaction
    cus_name: '',
    cus_email: '',
    cus_add1: '',
    cus_city: '',
    cus_state: '',
    cus_postcode: '',
    cus_country: '',
    cus_phone: '',
  };
  const [data, setData] = useState({});
  useEffect(() => {
    fetchCourse(courseId, setData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setReqData((reqData) => {
      return { ...reqData, [e.target.name]: [e.target.value] };
    });
  };

  console.log(data, user);
  return (
    <div className='min-h-screen w-full'>
      <div className='min-w-[400px] mt-16  p-2 m-auto flex items-center justify-center'>
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-column sm:flex-row gap-12'>
            <div className='flex flex-col gap-10 items-end justify-start'>
              <ValuedInput
                label={'Address'}
                inputProps={{
                  value: user?.address,
                  onChange: handleChange,
                  name: 'address',
                }}
              />
            </div>
            <div className='flex flex-col gap-10 items-center justify-start'>
              <div className='max-w-[350px] p-3 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <h1 className='text-2xl font-bold'>
                    {data.title || 'Course title'}
                  </h1>
                  <p>Price: BDT {data.price || 'N/A'}</p>
                  <p>Net amount: BDT {data.price || 'N/A'}</p>
                </div>

                {data.price && (
                  <button
                    type='Submit'
                    className='bg-onPrimary-main text-white text-md px-6 py-4 rounded-md mt-6'
                  >
                    Pay BDT ${data.price}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollCourse;
