import React from 'react';
import { quickLinks } from '../../assets/LinkInfo';
import { Link } from 'react-router-dom';

const FooterMain = () => {
  return (
    <div className='w-full p-2 md:p-4 px-2 md:px-6 mt-6'>
      <div
        id='mainFooter'
        className='grid md:grid-cols-4 gap-4 md:gap-10 m-auto max-w-[1200px] w-full'
      >
        {/* left logo */}
        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-2xl font-bold'>Logo</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint ea
              excepturi et id eveniet? Voluptas.
            </p>
          </div>
        </div>

        {/* quick link */}
        <div className='flex flex-col gap-6'>
          <div>
            <h2 className='text-xl font-medium'>Quick Links</h2>
          </div>
          <div className='flex flex-col gap-1'>
            {quickLinks.map((item, value) => {
              return (
                <Link to={item.path} key={value} className='text-sm md:text-lg'>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* contact */}
        <div className='flex flex-col gap-6'>
          <div>
            <h2 className='text-xl font-medium'>Contact Us</h2>
          </div>
          <div className='flex flex-col gap-3'>
            <div>icon text</div>
          </div>
        </div>

        {/* company policy */}
        <div className='flex flex-col gap-6'>
          <div>
            <h2 className='text-xl font-medium'>Company</h2>
          </div>
          <div className='flex flex-col gap-3'>
            <div>icon text</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
