import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='px-3 m-auto my-10'>
      <Outlet />
    </div>
  );
};

export default Dashboard;
