import { useNavigate } from 'react-router-dom';
import Star from '../Courses/Star';
import { useEffect, useRef } from 'react';

const CourseProCard = ({ rating, title, progress, img, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className='max-w-md md:max-w-full w-full overflow-hidden rounded-md cursor-pointer transition-transform hover:scale-[101%] hover:shadow-md border md:grid md:grid-cols-[1fr,2fr] md:gap-1'
      onClick={() => {
        navigate(`/courses/${id}`);
      }}
    >
      <div className='w-full grid md:h-full'>
        <img src={img} alt={title} className='w-full h-full' />
      </div>
      <div className='grid p-3 gap-3 md:gap-2 py-5 md:py-4'>
        <div className='flex flex-row gap-2'>
          {Array.from({ length: parseInt(rating) }, (_, value) => {
            return <Star key={value} />;
          })}
        </div>
        <h1 className='text-xl'>{title}</h1>
        <div className='mt-1'>
          <h3 className='text-sm opacity-60 mb-3 md:mb-2'>
            Sessional progress:
          </h3>
          <div className='flex flex-col w-full gap-1'>
            <div className='w-full relative bg-onPrimary-light h-[3px] rounded-md'>
              <div
                className={`h-full bg-onPrimary-main`}
                style={{
                  width: progress + '%',
                }}
              ></div>
            </div>
            <p className='text-xs opacity-60'>{progress}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProCard;
