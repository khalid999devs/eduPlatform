import React, { useEffect, useState } from 'react';
import { dashboardLinks } from '../../assets/LinkInfo';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import IconText from '../Typography/IconText';
import { MdLogout } from 'react-icons/md';
import { ContextConsumer } from '../../App';

const Nav = () => {
  const location = useLocation();
  const { logout } = ContextConsumer();
  const navigate = useNavigate();

  return (
    <div className='hidden md:flex flex-col gap-2 min-w-[100px] pt-6 border-r-2 border-gray-300'>
      {dashboardLinks.map((item, value) => {
        return (
          <Link
            key={value}
            to={item.path}
            className={`py-3 px-3 pr-8 hover:bg-onPrimary-main hover:text-primary-main rounded-tl-md rounded-bl-md transition-all ${
              location.pathname === item.path
                ? ` bg-onPrimary-main text-primary-main`
                : ''
            }`}
          >
            <IconText
              text={item.name}
              textClasses={'text-[1.04rem]'}
              classes={'gap-3 text-2xl'}
              icon={<item.icon />}
            />
          </Link>
        );
      })}
      <div
        className='py-3 px-3 pr-8 hover:bg-onPrimary-main hover:text-primary-main hover:rounded-tl-md rounded-bl-md transition-all mt-10 border-t-2 border-gray-300 cursor-pointer'
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        <IconText
          text={'Logout'}
          textClasses={'text-[1.04rem]'}
          classes={'gap-3 text-2xl'}
          icon={<MdLogout />}
        />
      </div>
    </div>
  );
};

export default Nav;
