import { useEffect, Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import updateDDragonData from 'service/updateDDragonData';
import ProtectedRoute from 'components/ProtectedRoute';
import PATH from 'constants/path';
import ErrorComponent from 'components/common/errorComponent/ErrorComponent';

// 모든 페이지 lazy import 적용
const HomePage = lazy(() => import('pages/home/HomePage'));
const ProfilePage = lazy(() => import('pages/profile/ProfilePage'));
const ResetPasswordPage = lazy(
  () => import('pages/resetPassword/ResetPasswordPage'),
);
const LoginPage = lazy(() => import('pages/login/LoginPage'));
const SignupPage = lazy(() => import('pages/signUp/SignupPage'));
const SummonerSearchPage = lazy(
  () => import('pages/summonerSearch/SummonerSearchPage'),
);
const PasswordResetCodeSendPage = lazy(
  () => import('pages/passwordResetCodeSend/PasswordResetCodeSendPage'),
);
const FindDuoPage = lazy(() => import('pages/findDuo/FindDuoPage'));
const SocialLoginAuthPage = lazy(
  () => import('pages/socialLoginAuth/SocialLoginAuthPage'),
);

// 로그인 한 유저만 접속할 수 있는 경로
const requiredLoginPathname = [PATH.profile];

// 로그인 하지 않은 유저만 접속할 수 있는 경로
const requiredUnLoginPathname = [
  PATH.resetPasswordEmailSend,
  PATH.resetPassword,
  PATH.login,
  PATH.signup,
  PATH.kakaoLogin,
  PATH.discordLogin,
];

// 모든 페이지에 대한 정보를 저장한 배열
const pages = [
  {
    pathname: PATH.home,
    element: <HomePage />,
  },
  {
    pathname: PATH.profile,
    element: <ProfilePage />,
  },
  {
    pathname: PATH.resetPasswordEmailSend,
    element: <PasswordResetCodeSendPage />,
  },
  {
    pathname: PATH.resetPassword,
    element: <ResetPasswordPage />,
  },
  {
    pathname: PATH.findDuo,
    element: <FindDuoPage />,
  },
  {
    pathname: PATH.login,
    element: <LoginPage />,
  },
  {
    pathname: PATH.signup,
    element: <SignupPage />,
  },
  {
    pathname: PATH.summonerSearch,
    element: <SummonerSearchPage />,
  },
  {
    pathname: PATH.kakaoLogin,
    element: <SocialLoginAuthPage socialType="KAKAO" />,
  },
  {
    pathname: PATH.discordLogin,
    element: <SocialLoginAuthPage socialType="DISCORD" />,
  },
  {
    pathname: '*',
    element: <ErrorComponent errorMessage="존재하지 않는 페이지입니다." />,
  },
];

function App() {
  useEffect(() => {
    // 최초 1회 DDragon의 데이터를 최신 상태로 업데이트 시키는 함수입니다.
    updateDDragonData();
  }, []);

  return (
    <>
      <div className="App">
        <Suspense fallback={null}>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={true} // 진행시간바 숨김
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            theme="dark"
            limit={3} // 알람 개수 제한
          />
          <Header />
          <main>
            <Routes>
              {pages.map((page) => (
                <Route
                  path={page.pathname}
                  element={
                    <ProtectedRoute
                      requiredLogin={requiredLoginPathname.includes(
                        page.pathname,
                      )}
                      requiredUnLogin={requiredUnLoginPathname.includes(
                        page.pathname,
                      )}
                    >
                      {page.element}
                    </ProtectedRoute>
                  }
                  key={page.pathname}
                />
              ))}
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
