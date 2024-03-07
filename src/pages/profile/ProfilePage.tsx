import React, { useState } from 'react';
import styles from './profilePage.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { SiRiotgames } from 'react-icons/si';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from 'store/userSlice';
import useCustomNavigation from 'hooks/useCustomNavigation';
import AccountDeleteModal from './component/accountDeleteModal/AccountDeleteModal';
import PasswordChangeModal from './component/passwordChangeModal/PasswordChangeModal';
import Modal from 'components/modal/Modal';
const cn = classNames.bind(styles);

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { navHome } = useCustomNavigation();
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navHome();
  };

  return (
    <div className={cn('centerContainer')}>
      <Modal
        isOpen={isAccountDeleteModalOpen}
        setIsOpen={setIsAccountDeleteModalOpen}
      >
        <AccountDeleteModal setIsModalOpen={setIsAccountDeleteModalOpen} />
      </Modal>
      <Modal
        isOpen={isPasswordChangeModalOpen}
        setIsOpen={setIsPasswordChangeModalOpen}
        closeButton
      >
        <PasswordChangeModal />
      </Modal>
      <div className={cn('main')}>
        <div className={cn('myAccount')}>
          <h3>내 계정</h3>
          <div className={cn('email')}>
            <h6>이메일</h6>
            <span>{user.email}</span>
          </div>
          {user.loginType === 'SITE' && (
            <div className={cn('passwordChange')}>
              <h6>비밀번호 변경</h6>
              <button onClick={() => setIsPasswordChangeModalOpen(true)}>
                변경
              </button>
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
            onClick={() => setIsAccountDeleteModalOpen(true)}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
