import Header from 'components/header/Header';
import HomePage from 'pages/home/HomePage';
import ProfilePage from 'pages/profile/ProfilePage';
import ResetPasswordPage from 'pages/resetPassword/ResetPasswordPage';
import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/signUp/page';
import SummonerSearchPage from 'pages/summonerSearch/SummonerSearchPage';
import EmailSendPage from 'pages/EmailSend/EmailSendPage';
import FindDuoPage from 'pages/findDuo/FindDuoPage';
import { Routes, Route } from 'react-router-dom';
import updateDDragonData from 'service/updateDDragonData';
function App() {
  updateDDragonData();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/accounts/reset-password" element={<EmailSendPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/find-duo" element={<FindDuoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/summoners/:country/:summonerName"
          element={<SummonerSearchPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
