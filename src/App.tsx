import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/header/Header';
import HomePage from 'pages/home/HomePage';
import ProfilePage from 'pages/profile/ProfilePage';
import ResetPasswordPage from 'pages/resetPassword/ResetPasswordPage';
import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/signUp/SignupPage';
import SummonerSearchPage from 'pages/summonerSearch/SummonerSearchPage';
import PasswordResetCodeSendPage from 'pages/passwordResetCodeSend/PasswordResetCodeSendPage';
import FindDuoPage from 'pages/findDuo/FindDuoPage';
import { Routes, Route } from 'react-router-dom';
import updateDDragonData from 'service/updateDDragonData';
import SocialLoginAuthPage from 'pages/socialLoginAuth/SocialLoginAuthPage';
import ProtectedRoute from 'components/ProtectedRoute';
import Footer from 'components/footer/Footer';
import PATH from 'constants/path';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';

const requiredLoginPathname = [PATH.PROFILE];
const requiredUnLoginPathname = [
  PATH.RESET_PASSWORD_EMAIL_SEND,
  PATH.RESET_PASSWORD,
  PATH.LOGIN,
  PATH.SIGN_UP,
  PATH.KAKAO_LOGIN_PAGE,
  PATH.DISCORD_LOGIN_PAGE,
];
const pages = [
  {
    pathname: PATH.HOME,
    element: <HomePage />,
  },
  {
    pathname: PATH.PROFILE,
    element: <ProfilePage />,
  },
  {
    pathname: PATH.RESET_PASSWORD_EMAIL_SEND,
    element: <PasswordResetCodeSendPage />,
  },
  {
    pathname: PATH.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    pathname: PATH.FIND_DUO,
    element: <FindDuoPage />,
  },
  {
    pathname: PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    pathname: PATH.SIGN_UP,
    element: <SignupPage />,
  },
  {
    pathname: PATH.SUMMONER_SEARCH,
    element: <SummonerSearchPage />,
  },
  {
    pathname: PATH.KAKAO_LOGIN_PAGE,
    element: <SocialLoginAuthPage socialType="KAKAO" />,
  },
  {
    pathname: PATH.DISCORD_LOGIN_PAGE,
    element: <SocialLoginAuthPage socialType="DISCORD" />,
  },
];

function App() {
  updateDDragonData();
  return (
    <>
      <div className="App">
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
      </div>
    </>
  );
}

export default App;
