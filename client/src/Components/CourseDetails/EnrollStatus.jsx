import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../Buttons/PrimaryButton';

const EnrollStatus = () => {
  const { courseId, status } = useParams();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen'>
      <div className='max-w-[600px] w-full m-auto mt-24 p-4 pb-6 shadow-md'>
        {status === 'succeed' ? (
          <div className='flex flex-col items-center justify-center gap-3'>
            <h1 className='text-2xl p-2 text-center'>
              <span
                className='text-3xl font-extrabold text-green-700'
                style={{ lineHeight: '4rem' }}
              >
                Congratulations!
              </span>{' '}
              <br /> Your Enrollment of the course {} is successful!
            </h1>
            <div className='flex justify-center items-center gap-2'>
              <PrimaryButton
                text={'Go to course'}
                onClick={() => {
                  navigate(`/courses/onClientReq/${courseId}`);
                }}
                classes={`bg-onPrimary-main text-white`}
              />
              <PrimaryButton
                text={'See More Courses'}
                onClick={() => {
                  navigate(`/courses`);
                }}
                classes={`bg-onPrimary-main text-white`}
              />
            </div>
          </div>
        ) : status === 'failed' ? (
          <div className='flex flex-col items-center justify-center gap-3 p-4'>
            <h1 className='text-xl text-center'>
              <span
                className='text-3xl font-extrabold text-green-700'
                style={{ lineHeight: '4rem' }}
              >
                Failed to Enroll!{' '}
              </span>
              <br />
              Something went wrong during the payment process. Please try again.
              Or contact with the admin.
            </h1>
            <div className='flex justify-center items-center gap-2'>
              <PrimaryButton
                text={'Back to course page'}
                onClick={() => {
                  navigate(`/courses/${courseId}`);
                }}
                classes={`bg-onPrimary-main text-white`}
              />
            </div>
          </div>
        ) : status === 'cancel' ? (
          <div>Cancelled</div>
        ) : (
          <h1 className='text-2xl font-bold'>
            Wrong Status provided! Server problem. Please try again later!
          </h1>
        )}
      </div>
    </div>
  );
};

export default EnrollStatus;
