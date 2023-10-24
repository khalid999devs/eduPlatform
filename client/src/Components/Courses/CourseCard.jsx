import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Star from './Star';

const Coursecard = ({
  cardDetails: { name, desc, price, id, rating = 5, img },
  onClick,
}) => {
  return (
    <>
      <div
        className=' max-w-sm border rounded-lg shadow bg-onPrimary-main hover:scale-[101%] duration-200 transition-transform cursor-pointer'
        onClick={onClick}
      >
        <img
          className='w-full h-64 rounded-t-lg'
          src={'Images/cardPH.jpg' || img}
          alt='product image'
        />
        <div className='px-5 pb-5 pt-3'>
          <h5 className='text-xl text-left font-bold tracking-tight text-white'>
            {name || 'Lorem ipsum dolor sit amet. lorem10'}
          </h5>

          <p className='text-left text-slate-400 text-[.94rem] mt-1'>
            {desc ||
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            voluptas culpa quos,`}
          </p>

          {/* stars */}
          <div className='flex items-center mt-2.5 mb-5'>
            {Array.from({ length: parseInt(rating) }, (_, i) => (
              <Star key={i} />
            ))}
            {rating && (
              <span className='  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
                {rating}.0
              </span>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold  text-white mr-10 '>
              {price || `2000 tk`}
            </span>
            <Link
              to={`/courses/${id}`}
              className='text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-secondary-main opacity-80 hover:opacity-100 hover:text-black flex justify-center items-center gap-1'
            >
              <h1>See details</h1>
              <FaArrowRight className='pl-.5 inline-block' />{' '}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coursecard;
