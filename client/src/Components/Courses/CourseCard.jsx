import { FaArrowRight } from 'react-icons/fa6';
import { BiBookReader } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Coursecard = ({
  cardDetails: { name, desc, price, id, rating, img },
  onClick,
}) => {
  return (
    <>
      <div
        className='w-[350px] max-w-sm border rounded-lg shadow bg-onPrimary-main hover:scale-[101%] duration-200 transition-transform cursor-pointer'
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
            <svg
              className='w-4 h-4 text-yellow-300 mr-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 mr-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 mr-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 mr-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 mr-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <span className='  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
              5.0
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold  text-white mr-10 '>
              2000 tk
            </span>
            <Link
              to={`/`}
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
