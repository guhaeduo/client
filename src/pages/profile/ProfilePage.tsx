import { useState, MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from 'store/userSlice';
import { SiRiotgames } from 'react-icons/si';
import { FaPlus } from 'react-icons/fa';
import useCustomNavigation from 'hooks/useCustomNavigation';
import Modal from 'components/common/modal/Modal';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
import PasswordChangeModal from './components/passwordChangeModal/PasswordChangeModal';
import AccountDeleteModal from './components/accountDeleteModal/AccountDeleteModal';
import styles from './profilePage.module.scss';

const cn = classNames.bind(styles);

/** 소환사 프로필 페이지 */
export default function ProfilePage() {
  // 유저의 정보를 가져옵니다.
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { navHome } = useCustomNavigation();

  // 비밀번호 변경 모달의 오픈 값을 관리하는 상태입니다.
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // 계정 삭제 모달의 오픈 값을 관리하는 상태입니다.
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);

  // 계정 생성 날짜를 년 월 일로 배열에 저장합니다.
  const [year, month, day] = user.createdAt?.split('-') as string[];

  // 로그아웃시 실행되는 함수입니다.
  const logoutHandler = () => {
    // 스토어에 logout 함수를 실행하고 홈으로 이동시킵니다.
    dispatch(logout());
    navHome();
  };

  // 패스워드 변경 모달창을 열어주는 핸들러 입니다.
  const onPasswordChangeModalOpenHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPasswordChangeModalOpen(true);
  };

  // 계정 모달창을 열어주는 핸들러 입니다.
  const onAccountDeleteModalOpenHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsAccountDeleteModalOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={isAccountDeleteModalOpen}
        setIsOpen={setIsAccountDeleteModalOpen}
      >
        <AccountDeleteModal setIsModalOpen={setIsAccountDeleteModalOpen} />
      </Modal>
      <Modal
        isOpen={isPasswordChangeModalOpen}
        setIsOpen={setIsPasswordChangeModalOpen}
      >
        <PasswordChangeModal setIsModalOpen={setIsPasswordChangeModalOpen} />
      </Modal>
      <SEOMeta pageData={SEO_DATA.profile} />
      <div className={cn('centerContainer')}>
        <div className={cn('main')}>
          <div className={cn('myAccount')}>
            <h3>내 계정</h3>
            <div className={cn('email')}>
              <h6>이메일</h6>
              <span>{user.email}</span>
            </div>
            <div className={cn('createdAt')}>
              <h6>가입 날짜</h6>
              <span>
                {year}년 {month}월 {day}일
              </span>
            </div>
            {user.loginType === 'SITE' && (
              <div className={cn('passwordChange')}>
                <h6>비밀번호 변경</h6>
                <button onClick={onPasswordChangeModalOpenHandler}>변경</button>
              </div>
            )}
          </div>
          <div className={cn('riotAccount')}>
            <h3>게임 계정 연동</h3>
            <div className={cn('riotAccountBox')}>
              <div className={cn('header')}>
                <div className={cn('riotIcon')}>
                  <SiRiotgames />
                </div>
                <h6>라이엇 게임즈</h6>
                <button>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          <div className={cn('accountManagement')}>
            <button className={cn('logoutBtn')} onClick={logoutHandler}>
              로그아웃
            </button>
            <button
              className={cn('accountDeleteBtn')}
              onClick={onAccountDeleteModalOpenHandler}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
