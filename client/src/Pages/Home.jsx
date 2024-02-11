import { ContextConsumer } from '../App';
import Hero from '../Components/Home/Hero';
import InfoCards from '../Components/Home/InfoCards';
import MyCourses from '../Components/Home/MyCourses';

const Home = () => {
  const { user } = ContextConsumer();

  return (
    <div className='h-auto py-12'>
      <Hero />
      <InfoCards />
      <MyCourses user={user} />
    </div>
  );
};

export default Home;
