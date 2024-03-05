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
const cn = classNames.bind(styles);

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { navHome } = useCustomNavigation();
  console.log(user);
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
      <div className={cn('main')}>
        <div className={cn('myAccount')}>
          <h3>내 계정</h3>
          <div className={cn('email')}>
            <h6>이메일</h6>
            <span>{user.email}</span>
          </div>
          <div className={cn('passwordChange')}>
            <h6>비밀번호 변경</h6>
            <button>변경</button>
          </div>
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
          <div className={cn('logout')}>
            <h6>로그아웃</h6>
            <button onClick={logoutHandler}>로그아웃</button>
          </div>
          <div className={cn('accountDelete')}>
            <h6>계정 삭제</h6>
            <button>회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
}
