import React, { useEffect } from 'react';
import AOS from 'aos';
import { useSelector } from 'react-redux';
import BaseRouter from './utils/router';
import { Layout } from './components';
import './style/main.scss';
import 'aos/dist/aos.css'



declare global {
  interface Window {
    LIFECYCLE: string,
    API_URL: string;
    AUTH_DOMAIN: string;
    FIREBASE_KEY: string;
    STATIC_BUCKET: string;
    GOOGLE_NUMBER?: string,
  }
}

const App: React.FC = () => {
  // const [user, loading, err] = useAuthState(auth);
  const data = useSelector((store: any) => store);

  useEffect(() => {
    AOS.init({
      duration: 4000
    })
  }, [])
  return (
    <div className="cgs">
      <Layout>
        <BaseRouter data={data} />
      </Layout>
    </div>)
};

export default App;
