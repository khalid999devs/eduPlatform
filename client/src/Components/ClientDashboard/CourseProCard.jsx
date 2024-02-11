import { useNavigate } from 'react-router-dom';
import Star from '../Courses/Star';
import { useEffect, useState } from 'react';
import { clientFCourse } from '../../axios/global';
import { reqImgWrapper } from '../../assets/requests';
const CourseProCard = ({ id }) => {
  const navigate = useNavigate();
  const [courseInfo, setCInfor] = useState({
    id: 0,
    title: '',
    image: '',
    price: 0,
    schedule: '',
    ratings: 5,
  });
  useEffect(() => {
    clientFCourse(id, setCInfor);
  }, [id]);

  return (
    <div
      key={`cid${id}`}
      className='max-w-md md:max-w-full w-full overflow-hidden rounded-md cursor-pointer transition-transform hover:scale-[101%] hover:shadow-md border md:grid md:grid-cols-[1fr,2fr] md:gap-1'
      onClick={() => {
        navigate(`/courses/onClientReq/${id}`);
      }}
    >
      <div className='w-full grid md:h-full'>
        <img
          className='w-full h-full aspect-square max-w-sm'
          width={300}
          height={300}
          src={reqImgWrapper(courseInfo.image)}
          alt={courseInfo.title}
        />
      </div>
      <div className='grid p-3 gap-3 md:gap-2 py-5 md:py-4'>
        <div className='flex flex-row gap-2'>
          {Array.from({ length: parseInt(courseInfo.ratings) }, (_, value) => {
            return <Star key={value} />;
          })}
        </div>
        <h1 className='text-xl'>{courseInfo.title}</h1>
        <div className='mt-1 hidden'>
          <h3 className='text-sm opacity-60 mb-3 md:mb-2'>
            Sessional progress:
          </h3>
          <div className='flex flex-col w-full gap-1'>
            <div className='w-full relative bg-onPrimary-light h-[3px] rounded-md'>
              <div
                className={`h-full bg-onPrimary-main rounded-full`}
                style={{
                  width: 30 + '%',
                }}
              ></div>
            </div>
            <p className='text-xs opacity-60'>{30}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProCard;
