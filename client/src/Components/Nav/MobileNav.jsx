import { RxCross1 } from 'react-icons/rx';
import PrimaryButton from '../Buttons/PrimaryButton';
import { links } from '../../assets/LinkInfo';
import { NavLink } from 'react-router-dom';
import { BsCaretRight } from 'react-icons/bs';

const MobileNav = ({ isMobOpen, setIsMobOpen, user, setUser }) => {
  return (
    <div
      className={`block z-50 fixed top-0 min-h-screen min-w-[300px] w-[60vw] bg-secondary-main md:hidden transition-all duration-500 ${
        isMobOpen ? 'right-0' : 'right-[-100%]'
      }`}
    >
      <div className='flex w-full mb-6 flex-row justify-end items-center p-3 pr-6'>
        <PrimaryButton
          icon={<RxCross1 fontSize={'1.4rem'} />}
          classes={
            'bg-secondary-main p-2 hover:text-white hover:bg-onPrimary-main transition-all'
          }
          onClick={() => {
            setIsMobOpen(false);
          }}
        />
      </div>
      <div className='flex flex-col w-full p-3 gap-12'>
        <div className='flex flex-col gap-3 w-[85%] m-auto  opacity-85 text-left'>
          {links.map((item, value) => {
            return (
              <NavLink
                key={value}
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-orange-400'
                    : isActive
                    ? 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-secondary-dark'
                    : 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-black'
                }
              >
                {item.name}
              </NavLink>
            );
          })}
          {user.username && (
            <NavLink
              to={`/dashboard`}
              className={({ isActive, isPending }) =>
                isPending
                  ? 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-orange-400'
                  : isActive
                  ? 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-secondary-dark'
                  : 'text-[1.4rem] hover:text-secondary-dark w-fit p-1 px-2 pr-4 transition-transform text-black'
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>
        <div className=''>
          <div className='w-[80%] m-auto'>
            <PrimaryButton
              icon={<BsCaretRight fontSize={'1.2rem'} color='white' />}
              text={'Login'}
              classes={'bg-onPrimary-main py-3.5 px-6'}
              textClasses={'text-white text-[1rem] tracking-wider'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
