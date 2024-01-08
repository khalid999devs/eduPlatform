import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../Components/Admin/admin/Navbar';

const Admin = () => {
  return (
    <div className='bg-transparent p-5 rounded-lg flex justify-between items-start relative h-screen overflow-y-hidden bg-slate-100'>
      <AdminNavbar />

      <main className="relative h-full transition-all duration-200 ease-in-out mx-auto w-auto flex-1">

        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
