import React, { useState, MouseEventHandler } from 'react';
import styles from './profilePage.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { SiRiotgames } from 'react-icons/si';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from 'store/userSlice';
import useCustomNavigation from 'hooks/useCustomNavigation';
import AccountDeleteModal from './components/accountDeleteModal/AccountDeleteModal';
import PasswordChangeModal from './components/passwordChangeModal/PasswordChangeModal';
import Modal from 'components/common/modal/Modal';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';

const cn = classNames.bind(styles);

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { navHome } = useCustomNavigation();
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);
  const createdAt: string[] = user.createdAt?.split('-') as string[];
  const logoutHandler = () => {
    dispatch(logout());
    navHome();
  };
  const onPasswordChangeOnClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPasswordChangeModalOpen(true);
  };
  const onAccountDeleteClick: MouseEventHandler = (e) => {
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
                {createdAt[0]}년 {createdAt[1]}월 {createdAt[2]}일
              </span>
            </div>
            {user.loginType === 'SITE' && (
              <div className={cn('passwordChange')}>
                <h6>비밀번호 변경</h6>
                <button onClick={onPasswordChangeOnClick}>변경</button>
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
              onClick={onAccountDeleteClick}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
