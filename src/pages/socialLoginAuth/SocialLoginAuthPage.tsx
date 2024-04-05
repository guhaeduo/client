import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import isCustomAxiosError from 'service/isCustomAxiosError';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import instance from 'service/instance';
import fetchUser from 'service/fetchUser';
import ErrorComponent from 'components/common/errorComponent/ErrorComponent';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';

type Props = {
  socialType: 'KAKAO' | 'DISCORD';
};

export default function SocialLoginAuthPage({ socialType }: Props) {
  // 에러 메세지를 관리하는 상태입니다.
  const [error, setError] = useState('');
  // 파라미터 정보를 갖고옵니다.
  const [searchParams] = useSearchParams();
  // 파라미터에서 code라는 이름의 항목을 갖고옵니다.
  const code = searchParams.get('code');
  // 코드가 존재하고 유효한지를 관리하는 값 입니다.
  const isValid = code && code.trim() !== '';
  // 소셜 로그인 타입이 카카오톡인지 확인하는 변수입니다.
  const isKakao = socialType === 'KAKAO';
  // 소셜 로그인 타입에 따라 URL을 설정합니다.
  const redirectUri = isKakao
    ? process.env.REACT_APP_KAKAO_REDIRECT_URL
    : process.env.REACT_APP_DISCORD_REDIRECT_URL;

  async function socialLogin() {
    try {
      // 서버에 로그인 요청을 보냅니다.
      await instance.post(`/api/oauth/${socialType.toLowerCase()}`, {
        authorizeCode: code,
        redirectUri,
      });
      // 로그인 요청이 성공한다면 유저 정보를 받아옵니다.
      await fetchUser();
    } catch (err) {
      // 에러가 발생한다면 setError로 에러 상태를 업데이트 합니다.
      if (isCustomAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
      setError(UNKNOWN_NET_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    // 페이지에 처음 접속하였을때 code가 존재한다면 로그인 요청을 수행합니다.
    if (isValid) socialLogin();
  }, [code]);

  return (
    <>
      <SEOMeta
        pageData={isKakao ? SEO_DATA.kakaoLogin : SEO_DATA.discordLogin}
      />
      {(error || !isValid) && (
        <ErrorComponent errorMessage={error || '잘못된 접근입니다.'} />
      )}
    </>
  );
}
