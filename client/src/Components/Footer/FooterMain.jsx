import { companyLinks, quickLinks } from '../../assets/LinkInfo';
import { Link, useNavigate } from 'react-router-dom';
import IconText from '../Typography/IconText';
import { contacts } from '../../assets/pageInfo';
import { FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import PrimaryButton from '../Buttons/PrimaryButton';
const FooterMain = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full p-2 md:p-4 py-14 md:py-10 px-2 md:px-3 mt-16 bg-onPrimary-main text-white'>
      <div
        id='mainFooter'
        className='grid md:grid-cols-[2fr,1.5fr,1.5fr] gap-12 md:gap-12 pl-5 md:pl-0 md:ml-auto m-auto max-w-6xl w-full opacity-80'
      >
        {/* left logo */}
        <div className='flex flex-col gap-2 md:gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-secondary-main opacity-80'>
              Chemgenie
            </h1>
            <p className='opacity-60 text-xs mt-2'>
              &copy; 2023 - {new Date().getFullYear()} Chemgenie all rights
              reserved
            </p>
          </div>
          <div></div>
        </div>

        {/* quick link */}
        <div className='flex flex-col gap-3 md:gap-4'>
          <div>
            <h2 className='text-xl font-medium text-onPrimary-light'>
              Quick Links
            </h2>
          </div>
          <div className='flex flex-col pl-0.5 gap-2'>
            {quickLinks.map((item, value) => {
              return (
                <Link
                  to={item.path}
                  key={value}
                  className='text-sm font-light md:text-[.95rem] hover:underline hover:text-blue-400'
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* contact */}
        <div className='flex flex-col gap-3 md:gap-4  '>
          <div>
            <h2 className='text-xl font-medium text-onPrimary-light'>
              Contact
            </h2>
          </div>
          <div className='flex flex-col pl-0.5 gap-2 font-light'>
            <IconText text={contacts.phone[0]} icon={<FaPhone />} />
            <IconText text={contacts.emails[0]} icon={<FaEnvelope />} />
            <IconText text={contacts.location} icon={<FaLocationDot />} />
            <PrimaryButton
              text={'contact us'}
              classes={
                'bg-purple-500 hidden w-fit my-4 px-5 py-2 hover:bg-purple-600 hover:text-purple-50 transition-colors'
              }
              onClick={() => {
                navigate('/contact-us');
              }}
            />
          </div>
        </div>

        {/* company policy */}
        {/* <div className='flex flex-col gap-6'>
          <div>
            <h2 className='text-xl font-medium text-onPrimary-light'>
              Company
            </h2>
          </div>
          <div className='flex flex-col gap-2 pl-0.5'>
            {companyLinks.map((item, value) => {
              return (
                <Link
                  to={item.path}
                  key={value}
                  className='text-xs font-light md:text-[1rem] hover:underline hover:text-blue-400'
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className='grid place-items-center gap-4 mt-10'>
        <div className='flex flex-row gap-4 pt-2'>
          {contacts.socials.map((social, value) => {
            return (
              <a
                key={value}
                className='hover:scale-105 transition-transform'
                href={social.link}
                target='_blank'
              >
                <social.icon color={social.color} fontSize={'1.8rem'} />
              </a>
            );
          })}
        </div>

        <p className='opacity-80 text-xs mt-2'>
          Developed by{' '}
          <a href='https://devgenit.com' target='_blank'>
            <span className='bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-500 font-bold'>
              DevGenit
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterMain;
