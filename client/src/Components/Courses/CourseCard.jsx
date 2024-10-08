import { FaArrowRight } from 'react-icons/fa6';
import Star from './Star';
import { reqImgWrapper } from '../../assets/requests';
const Coursecard = ({
  cardDetails: { title, description, price, id, ratings, image },
  onClick,
  hasEnrolled,
  classes,
}) => {
  // console.log(image);
  return (
    <>
      <div
        className={
          'max-w-[350px] w-full border mx-auto rounded-lg shadow bg-onPrimary-main hover:scale-[101%] duration-200 transition-transform cursor-pointer table-cell ' +
          classes
        }
        onClick={onClick}
      >
        <img
          className='rounded-t-lg aspect-auto object-cover h-[200px] w-full'
          src={reqImgWrapper(image)}
          alt='product image'
        />

        <div className='px-5 pb-5 pt-3'>
          <h5 className='text-xl text-left font-bold tracking-tight text-white'>
            {title || 'Lorem ipsum dolor sit amet. lorem10'}
          </h5>

          <p className='text-left text-slate-400 min-h-[70px] mb-4 h-auto text-[.92rem] mt-1 text-ellipsis line-clamp-3'>
            {description ||
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            voluptas culpa quos,`}
          </p>

          {/* stars */}
          <div className='flex items-center mt-2.5 mb-5'>
            {Array.from({ length: parseInt(ratings) }, (_, i) => (
              <Star key={i} />
            ))}
            {ratings && (
              <span className='  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
                {ratings}.0
              </span>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-xl sm:text-2xl font-bold  text-white mr-10 '>
              {price || `2000`} TK
            </span>
            <p
              // to={`/courses/${id}`}
              className='text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-secondary-main opacity-80 hover:opacity-100 hover:text-black flex justify-center items-center gap-1'
            >
              <span>{hasEnrolled ? 'Enter Course' : 'See details'}</span>
              <FaArrowRight className='pl-.5 inline-block' />{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coursecard;
