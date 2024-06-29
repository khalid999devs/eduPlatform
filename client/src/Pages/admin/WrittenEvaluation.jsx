import React from 'react';
import { useParams } from 'react-router-dom';

const WrittenEvaluation = () => {
  const { examId, clientId } = useParams();
  return (
    <div className='min-h-screen w-full'>
      Written Evaluation for {clientId} of exam {examId}
    </div>
  );
};

export default WrittenEvaluation;
