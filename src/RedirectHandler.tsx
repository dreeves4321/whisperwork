import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate('/' + redirect, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RedirectHandler; 