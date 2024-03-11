import { useState } from 'react';

type Props = {
  defaultOption: string;
};
type ReturnType = [string, (newOption: string) => void];

export default function useSignularOptionSelector({
  defaultOption,
}: Props): ReturnType {
  const [option, setOption] = useState(defaultOption);

  const optionChangeHandler = (newOption: string) => {
    setOption(newOption);
  };

  return [option, optionChangeHandler];
}
