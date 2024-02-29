import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LOCATION from 'constants/location';
import { useEffect } from 'react';

export default function KakaoAuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  useEffect(() => {
    if (!code || code.trim() === '') {
      navigate(LOCATION.HOME, { replace: true });
      alert('잘못된 접근입니다.');
    }
  }, [code]);
  return <></>;
}
