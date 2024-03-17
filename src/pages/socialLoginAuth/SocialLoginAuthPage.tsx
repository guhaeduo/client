import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import isCustomAxiosError from 'service/customAxiosError';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import instance from 'service/instance';
import { fetchUser } from 'service/fetchUser';
import ErrorComponent from 'components/errorComponent/ErrorComponent';

type Props = {
  socialType: 'KAKAO' | 'DISCORD';
};

export default function SocialLoginAuthPage({ socialType }: Props) {
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const isFail = !code || code.trim() === '';
  const redirectUri =
    socialType === 'KAKAO'
      ? process.env.REACT_APP_KAKAO_REDIRECT_URL
      : process.env.REACT_APP_DISCORD_REDIRECT_URL;

  async function socialLogin() {
    try {
      await instance.post(`/api/oauth/${socialType.toLowerCase()}`, {
        authorizeCode: code,
        redirectUri,
      });
      await fetchUser();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
      setError(UNKNOWN_NET_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    if (!isFail) socialLogin();
  }, [code]);

  return error || isFail ? (
    <ErrorComponent errorMessage={error || '잘못된 접근입니다.'} />
  ) : (
    <></>
  );
}
