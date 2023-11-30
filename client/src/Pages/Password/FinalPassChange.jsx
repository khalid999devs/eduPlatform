import React from 'react';
import Input from '../../Components/Form/Input';
import ValuedInput from '../../Components/Form/ValuedInput';

const FinalPassChange = ({ handleSetPass }) => {
  return (
    <div>
      <ValuedInput
        label={'New Password'}
        inputProps={{
          name: 'newPass',
          onChange: (e) => {},
          placeholder: 'Enter a strong Pass',
        }}
      />
    </div>
  );
};

export default FinalPassChange;
