import { Lane } from 'types/summoner';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import styles from './laneSelector.module.scss';

const cn = classNames.bind(styles);

const LANE_OPTIONS: Lane[] = ['ALL', 'TOP', 'JUG', 'MID', 'ADC', 'SUP'];

interface Props {
  option: string[] | string;
  size?: number;
  onChange: (option: string) => void;
  className?: string;
  disableLane?: Lane[];
}

/**
 * 옵션과 옵션 변경 함수를 받아 라인선택 컴포넌트를 렌더링 합니다.
 * @param {string[] | string} option - 현재 선택된 옵션 값입니다.
 * @param {number} size - 요소 한 개의 가로 세로 크기를 결정하는 값입니다. (선택 사항)
 * @param {(option: string) => void} onChange - 값이 변경되었을 때 실행할 함수 입니다.
 * @param {string} className - 클래스 입니다.
 * @param {Lane[]} disableLane - 비활성화 라인입니다.
 * @return 라인선택 요소
 */

export default function LaneSelector({
  option,
  size = 40,
  onChange,
  className,
  disableLane = [],
}: Props) {
  // 라인을 옵션을 클릭했을때 실행할 함수입니다.
  const laneOnclick = (lane: Lane) => {
    // disableLane에 옵션이 포함이 되어있지 않으면 onChangee에 option을 전달합니다.
    if (!disableLane.includes(lane)) onChange(lane);
  };

  return (
    <div className={cn(className, 'laneSelectorWrapper')}>
      {LANE_OPTIONS.map((lane) => (
        <button
          key={lane}
          className={cn('laneSelector', { active: option.includes(lane) })}
          onClick={() => laneOnclick(lane)}
        >
          <div
            className={cn('imageWrapper', {
              disabled: disableLane.includes(lane),
            })}
          >
            <img
              style={{ width: size, height: size }}
              src={URL.laneIcon(lane)}
              alt={lane}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
