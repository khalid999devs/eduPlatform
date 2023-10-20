import { ContextConsumer } from '../App';
import Hero from '../Components/Home/Hero';
import InfoCards from '../Components/Home/InfoCards';

const Home = () => {
  const { user } = ContextConsumer();

  return (
    <div className='h-auto py-12'>
      <Hero />
      <InfoCards />
    </div>
  );
};

export default Home;
