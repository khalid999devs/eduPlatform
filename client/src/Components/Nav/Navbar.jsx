import { links } from '../../assets/LinkInfo';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsCaretRight } from 'react-icons/bs';
import PrimaryButton from '../Buttons/PrimaryButton';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full h-auto py-2 px-2 md:px-[4]'>
      <div
        id='navbar'
        className='flex flex-row gap-4 m-auto max-w-[1200px] w-[100%] items-center'
      >
        {/* logo */}
        <div>
          <h1 className='text-2xl font-bold text-black w-fit pr-3'>Logo</h1>
        </div>
        {/* main nav */}
        <div className='flex flex-row justify-between w-full'>
          {/* menus */}
          <div className='flex flex-row gap-6 px-4 items-center'>
            {links.map((item, value) => {
              return (
                <NavLink
                  key={value}
                  to={item.path}
                  className={`text-md transition-transform${({
                    isActive,
                    isPending,
                  }) =>
                    isPending
                      ? 'text-orange-400'
                      : isActive
                      ? 'text-yellow-700'
                      : 'text-black'}`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* buttons */}
          <div className='flex flex-row gap-3'>
            <PrimaryButton
              icon={<AiFillCaretDown fontSize={'.9rem'} />}
              text={'All Courses'}
            />
            <PrimaryButton
              icon={<BsCaretRight fontSize={'.9rem'} />}
              text={'Login'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
