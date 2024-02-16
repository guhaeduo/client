import { useState } from 'react';

type Props = {
  type: 'plural' | 'singular';
  defaultOptions: string[];
};
type ReturnType = [string[], (option: string) => void];

/**
 * 옵션선택을 더 깔끔하게 관리하기 위한 훅입니다.
 * @param {'plural' | 'singular'} type - 옵션의 갯수가 단수인지 복수인지 지정하는 타입입니다.
 * @param {string[]} defaultOptions - 옵션의 기본 옵션을 제공합니다.
 */

export default function useOptionSelector({
  type,
  defaultOptions,
}: Props): ReturnType {
  // 옵션을 관리하는 상태입니다.
  const [options, setOptions] = useState(defaultOptions);

  // 옵션이 변경되었을 때 실행될 함수입니다.
  const optionChangeHandler = (option: string) => {
    // 전달된 옵션이 기존 옵션에 포함되어 있는지 확인
    const includesOption = options.includes(option);
    // 옵션이 기존 옵션에 포함되어 있고, 기존 옵션이 한 개라면 옵션은 1개 이상이어야 하기에 함수를 종료
    if (includesOption && options.length === 1) return;

    setOptions((prevOptions) => {
      if (type === 'plural') {
        // 복수 옵션이라면 전달된 옵션이 기존 옵션에 포함되어 있는지 확인하여 삭제, 추가 로직을 수행
        return includesOption
          ? prevOptions.filter((item) => item !== option)
          : [...prevOptions, option];
      } else if (type === 'singular') {
        // 단일 옵션이라면 전달된 옵션을 그대로 기존 옵션과 변경
        return [option];
      } else {
        return prevOptions;
      }
    });
  };

  // 관리중인 옵션과, 옵션을 변경하기 위한 함수를 리턴
  return [options, optionChangeHandler];
}
