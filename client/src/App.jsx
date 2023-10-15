import { Outlet } from 'react-router-dom';
import Navbar from './Components/Nav/Navbar';
import FooterMain from './Components/Footer/FooterMain';
import { createContext, useContext, useState } from 'react';

const Context = createContext('');

function App() {
  const [user, setUser] = useState({
    name: 'Example FullName',
    usename: 'example012',
    avatar: '',
  });

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      <div className='w-full min-h-screen'>
        <Navbar />

        <div className='m-auto max-w-[1200px] w-[100%]'>
          <Outlet />
        </div>

        <FooterMain />
      </div>
    </Context.Provider>
  );
}

export const ContextConsumer = () => {
  return useContext(Context);
};

export default App;
