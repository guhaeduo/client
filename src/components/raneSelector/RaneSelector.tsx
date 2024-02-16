import styles from './raneSelector.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const RANE_OPTIONS = ['ALL', 'TOP', 'JUG', 'MID', 'ADC', 'SUP'];

interface Props {
  options: string[];
  size?: number;
  onChange: (option: string) => void;
  className?: string;
}

/**
 * 미리 스타일을 지정해둔 라인선택 컴포넌트 입니다.
 * @param {string[]} options - 현재 선택된 옵션 값입니다.
 * @param {number} size - 요소 한 개의 가로 세로 크기를 결정하는 값입니다.
 * @param {(option: string) => void} onChange - 값이 변경되었을 때 실행할 함수 입니다.
 * @param {string} className - 클래스 입니다.
 */

export default function RaneSelector({
  options,
  size = 40,
  onChange,
  className,
}: Props) {
  console.log(process.env.REACT_APP_PUBLIC_URL + `/images/rane/ALL.png`);
  return (
    <div className={cn(className, 'raneSelectorWrapper')}>
      {RANE_OPTIONS.map((rane) => (
        <button
          key={rane}
          className={cn('raneSelector', { active: options.includes(rane) })}
          onClick={() => onChange(rane)}
        >
          <div className={cn('imageWrapper')}>
            <img
              style={{ width: size, height: size }}
              src={
                process.env.REACT_APP_PUBLIC_URL + `/images/rane/${rane}.png`
              }
              alt={rane}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
