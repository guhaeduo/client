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
const requiredLoginPathname = ['/profile'];
const requiredUnLoginPathname = [
  '/accounts/reset-password',
  '/auth/reset-password',
  '/login',
  '/signup',
  '/oauth/kakao',
];
const pages = [
  {
    pathname: '/',
    element: <HomePage />,
  },
  {
    pathname: '/profile',
    element: <ProfilePage />,
  },
  {
    pathname: '/accounts/reset-password',
    element: <PasswordResetCodeSendPage />,
  },
  {
    pathname: '/auth/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    pathname: '/find-duo',
    element: <FindDuoPage />,
  },
  {
    pathname: '/login',
    element: <LoginPage />,
  },
  {
    pathname: '/signup',
    element: <SignupPage />,
  },
  {
    pathname: '/summoners/:country/:summonerName',
    element: <SummonerSearchPage />,
  },
  {
    pathname: '/oauth/kakao',
    element: <SocialLoginAuthPage socialType="KAKAO" />,
  },
  {
    pathname: '/oauth/discord',
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
