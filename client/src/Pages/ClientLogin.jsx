
import { Link } from 'react-router-dom';
import LoginForm from '../Components/Account/Client/LoginForm';

function ClientLogin() {

  return (
    <div className=' signin min-h-[60vh] max-w-[700px] m-auto p-4 mb-24 mt-14'>
      <LoginForm />
      <div className='mt-5'>
        <h1 className='text-center '>
          Don't have an account?{' '}
          <Link
            to={'/signup'}
            className='text-blue-500 text-center transition-color hover:text-blue-700'
          >
            Register now
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default ClientLogin;
