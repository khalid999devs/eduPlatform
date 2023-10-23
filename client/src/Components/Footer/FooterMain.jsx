import { companyLinks, quickLinks } from '../../assets/LinkInfo';
import { Link } from 'react-router-dom';
import IconText from '../Typography/IconText';
import { contacts } from '../../assets/pageInfo';
import { FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

const FooterMain = () => {
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
          </div>
          <div>
            <p className='font-[300] text-onPrimary-light opacity-90 text-sm max-w-[80%]'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint ea
              excepturi et id eveniet? Voluptas.
            </p>
          </div>
        </div>

        {/* quick link */}
        <div className='flex flex-col gap-3 md:gap-6'>
          <div>
            <h2 className='text-xl font-medium text-onPrimary-light'>
              Quick Links
            </h2>
          </div>
          <div className='flex flex-col gap-2'>
            {quickLinks.map((item, value) => {
              return (
                <Link
                  to={item.path}
                  key={value}
                  className='text-sm font-light md:text-[1rem] hover:underline hover:text-blue-400'
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* contact */}
        <div className='flex flex-col gap-3 md:gap-6'>
          <div>
            <h2 className='text-xl font-medium text-onPrimary-light'>
              Contact
            </h2>
          </div>
          <div className='flex flex-col gap-2 font-light'>
            <IconText text={contacts.mobileNos[0]} icon={<FaPhone />} />
            <IconText text={contacts.emails[0]} icon={<FaEnvelope />} />
            <IconText text={contacts.location} icon={<FaLocationDot />} />
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
      <div className='grid place-items-center gap-8 mt-10'>
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
        <p className='opacity-60 text-xs'>
          &copy; {new Date().getFullYear()} Chemgeni all rights reserved
        </p>
      </div>
    </div>
  );
};

export default FooterMain;
