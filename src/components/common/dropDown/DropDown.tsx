import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { IoCaretDownSharp } from 'react-icons/io5';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import styles from './dropDown.module.scss';

const cn = classNames.bind(styles);

type Props = {
  options: { key: string; display: string; icon?: string }[];
  onChange: (option: string) => void;
  className?: string;
  currentOptionKey: string;
  type: 'dark' | 'border';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  label: string;
  isSearch?: boolean;
};

/**
 * 미리 스타일을 지정해둔 드롭다운 메뉴입니다.
 * @param {{ key: string; display: string; icon?: string  }[]} options - 드롭다운 메뉴의 옵션 리스트 값입니다.
 * @param {(option: string) => void} onChange - 드롭다운 메뉴의 항목을 선택했을 때 실행되는 함수 입니다.
 * @param {string} className - 드롭다운 메뉴의 클래스입니다. (선택 사항)
 * @param {string[]} currentOptionKey - 드롭다운 메뉴의 현재 옵션 값입니다.
 * @param {string} type - 드롭다운 메뉴의 스타일 타입 값입니다.
 * @param {string} isOpen - 드롭다운 메뉴의 오픈 여부를 관리하는 상태입니다
 * @param {string} setIsOpen - 드롭다운 메뉴의 오픈 여부를 제어하는 함수입니다.
 * @param {React.RefObject<HTMLDivElement>} dropMenuRef - 드롭다운 메뉴의 ref입니다.
 * @param {boolean} isSearch - 검색이 가능한 드롭박스인지 나타내는 값입니다.
 */

export default function DropDown({
  options,
  currentOptionKey,
  onChange,
  className,
  type,
  isOpen,
  setIsOpen,
  label,
  isSearch,
}: Props) {
  // dropMenuRef를 생성하여 dropDown에 연결합니다.
  const dropMenuRef = useRef<HTMLDivElement | null>(null);

  // searchInputRef
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // 검색 가능한 드롭다운일때 검색 키워드를 저장합니다.
  const [searchValue, setSearchValue] = useState('');

  const onClickHandler = (option: string) => {
    // 전달받은 onChange함수로 option을 전달하고, 드롭다운 메뉴를 닫습니다.
    onChange(option);
    setIsOpen(false);
  };

  const onSearchValueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  // dropDown이 아닌 외부가 클릭되면 dropDown을 닫습니다.
  useHandleOutsideClick<HTMLDivElement>({
    isOpen,
    setIsOpen,
    ref: dropMenuRef,
  });

  // 드롭다운 메뉴의 오픈 여부를 제어하는 함수로, 변경된 오픈값을 전달합니다.
  const dropDownOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  // 현재 옵션의 display값을 빼옵니다.
  const currentOption = options.find(
    (el) => el.key === currentOptionKey,
  )?.display;

  // 검색 인풋일 경우 키워드에 따라 옵션 분류
  const filteredOptions =
    isSearch && searchValue
      ? options.filter((option) => {
          const displayName = option.display;
          const searchValueNormalized = searchValue.normalize('NFC');
          return [...searchValueNormalized].every((char) =>
            displayName.includes(char),
          );
        })
      : options;

  return (
    <div
      ref={dropMenuRef}
      className={cn('dropDownContainer', { search: isSearch }, className, type)}
    >
      <div
        onClick={dropDownOpenHandler}
        className={`${cn('dropDownHeader')} dropDownHeader`}
      >
        {currentOption}
        <button className={cn({ open: isOpen })}>
          <span className="visuallyHidden">
            {label} {isOpen ? '닫기' : '열기'} 버튼
          </span>
          <IoCaretDownSharp className="dropDownSharpIcon" />
        </button>
      </div>
      {isSearch && isOpen && (
        <input
          type="text"
          value={searchValue}
          onChange={onSearchValueChangeHandler}
          ref={searchInputRef}
          autoFocus
          className={cn('searchInput')}
        />
      )}
      <div
        className={`${cn('dropDownContent', { visibleOption: isOpen })} dropDownContent`}
      >
        {filteredOptions.map(({ key, display, icon }) => (
          <button key={key} onClick={() => onClickHandler(key)}>
            {icon && (
              <div className={cn('icon')}>
                <img src={icon} />
              </div>
            )}
            <span className={cn('visuallyHidden')}>{label}</span>
            {display}
          </button>
        ))}
      </div>
    </div>
  );
}
