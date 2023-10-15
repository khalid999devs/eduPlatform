import { ContextConsumer } from '../App';

const Home = () => {
  const { user } = ContextConsumer();
  console.log(user);

  return <div className='min-h-[60vh] grid place-items-center'>Home Page</div>;
};

export default Home;
