import { useState } from 'react';

const useInput = (initialValue: string = '', func?: (val: string) => void) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (func) {
      func(value);
    }

    setValue(value);
  };

  return { value, onChange };
};

export default useInput;
