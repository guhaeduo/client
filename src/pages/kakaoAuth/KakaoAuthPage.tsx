import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LOCATION from 'constants/location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerAPIErrorResponse } from 'types/Api';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import styles from './kakaoAuthPage.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import instance from 'service/instance';
import { fetchUser } from 'service/fetchUser';
const cn = classNames.bind(styles);

export default function KakaoAuthPage() {
  const [kakaoError, setKakaoError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const { navHome } = useCustomNavigation();

  async function kakaoLogin() {
    try {
      await instance.post('/api/oauth/kakao', {
        authorizeCode: code,
        redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URL,
      });

      await fetchUser();
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
        setKakaoError(err.response.data.error);
      }
      setKakaoError(UNKNOWN_NET_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    if (!code || code.trim() === '') {
      navigate(LOCATION.HOME, { replace: true });
      alert('잘못된 접근입니다.');
    }
    kakaoLogin();
  }, [code]);

  return kakaoError ? (
    <div className={cn('kakaoAuthPage')}>
      <span>{kakaoError}</span>
      <button className={'toHomeBtn'} onClick={navHome}>
        홈으로 이동
      </button>
    </div>
  ) : (
    <></>
  );
}
