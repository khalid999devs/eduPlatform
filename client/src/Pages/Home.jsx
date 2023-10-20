import { ContextConsumer } from '../App';

const Home = () => {
  const { user } = ContextConsumer();
  console.log(user);

  return <div className='h-auto py-12'></div>;
};

export default Home;
