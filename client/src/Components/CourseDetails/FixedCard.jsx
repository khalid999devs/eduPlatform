import { FaAngleRight } from 'react-icons/fa6';
import Star from '../Courses/Star';
import { reqImgWrapper } from '../../assets/requests';
import { Link } from 'react-router-dom';

const FixedCard = ({ cardDetails: { id = 1, rating = 5, img, price } }) => {
  return (
    <div className='md:sticky right-0 md:float-right lg:right-[5%] xl:right-[10%] top-3 z-30'>
      <div className='w-auto md:w-80 lg:w-96 max-w-sm border mb-10  rounded-lg shadow bg-onPrimary-main '>
        <a href='#'>
          <img
            className='w-full h-64 rounded-t-lg'
            src={reqImgWrapper(img)}
            alt='product image'
          />
        </a>
        <div className='px-5 pb-5'>
          <div className='flex items-center mt-2.5 mb-5'>
            {Array.from({ length: parseInt(rating) }, (_, i) => (
              <Star key={i} />
            ))}
            {rating && (
              <span className='flex  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
                {rating}.0
              </span>
            )}
          </div>
          {/* <div className="flex items-center justify-between"> */}
          <span className='mb-10 flex text-3xl font-bold  text-white mr-10 '>
            {price || ` 2000`} TK
          </span>

          <Link
            to={`/course/${id}/enroll`}
            className='mb-5 block text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-400 hover:text-black '
          >
            Enroll now <FaAngleRight className='inline-block' />{' '}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FixedCard;
