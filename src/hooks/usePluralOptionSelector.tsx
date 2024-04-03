import { useState } from 'react';

type Props = {
  defaultOptions: string[];
};
type ReturnType = [string[], (option: string) => void];

export default function usePluralOptionSelector({
  defaultOptions,
}: Props): ReturnType {
  const [options, setOptions] = useState(defaultOptions);

  const optionChangeHandler = (option: string) => {
    const includesOption = options.includes(option);
    if (includesOption && options.length === 1) return;

    setOptions((prevOptions) =>
      includesOption
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option],
    );
  };

  return [options, optionChangeHandler];
}
