import { BsFillPeopleFill } from 'react-icons/bs';
import { PiStudentBold } from 'react-icons/pi';
import { GiSandsOfTime } from 'react-icons/gi';

const InfoCard = ({ icon, number, text }) => {
  return (
    <div className='grid place-items-center gap-1 p-12 bg-onPrimary-main text-primary-main rounded-lg min-w-[250px]'>
      <div className='p-3 text-4xl'>{icon}</div>
      <h1 className='text-4xl'>{number}</h1>
      <p className='text-sm'>{text}</p>
    </div>
  );
};

const InfoCards = () => {
  return (
    <div className='flex flex-row gap-6 m-auto items-center justify-center flex-wrap py-10 mt-[70px]'>
      <InfoCard
        icon={<BsFillPeopleFill />}
        text={'Community Members'}
        number={'26,000+'}
      />
      <InfoCard icon={<PiStudentBold />} text={'Students'} number={'6000+'} />
      <InfoCard icon={<GiSandsOfTime />} text={'Hours'} number={'300+'} />
    </div>
  );
};

export default InfoCards;
