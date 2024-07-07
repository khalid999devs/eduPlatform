import { useState, useEffect } from 'react';
import './RoundedRiseAnime.css';

const RoundedRiseAnime = ({ totalNumber = 100, label }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalDuration = Math.floor(2000 / totalNumber);
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < totalNumber ? prevProgress + 1 : totalNumber
      );
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [totalNumber]);

  const circumference = 2 * Math.PI * 15.9155;
  const strokeDasharray = `${
    (progress / totalNumber) * circumference
  }, ${circumference}`;

  return (
    <svg className='progress-circle' viewBox='0 0 36 36'>
      <path
        className='circle-bg'
        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
      />
      <path
        className='circle'
        strokeDasharray={strokeDasharray}
        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
      />
      <text x='18' y='19' className='percentage'>
        {progress}+
        {label && (
          <tspan x='18' dy='1.7em' className='label-text'>
            {label}
          </tspan>
        )}
      </text>
    </svg>
  );
};

export default RoundedRiseAnime;
