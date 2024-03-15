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
    <div className="App">
      <Header />
      <main>
        <Routes>
          {pages.map((page) => (
            <Route
              path={page.pathname}
              element={
                <ProtectedRoute
                  requiredLogin={requiredLoginPathname.includes(page.pathname)}
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
  );
}

export default App;
