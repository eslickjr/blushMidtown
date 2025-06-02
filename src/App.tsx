import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [loadOut, setLoadOut] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // const timeout = setTimeout(() => {
    //   setLoaded(false);
    // }, 500); // Adjust the timeout duration as needed

    // return () => clearTimeout(timeout);
  }, [location.pathname]);

  const bloomOut = () => {
    setLoadOut(true);
    setLoaded(false);
    setTimeout(() => {
      setLoadOut(false);
    }, 500); // Adjust the timeout duration as needed
  }

  return (
    <div className="project-app">
        <div className={`loading-screen ${loaded ? 'hidden' : ''} ${loadOut ? 'changeScreen' : ''}`} />
        <Header bloomOut={bloomOut}/>
        <main className="mx-3">
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer bloomOut={bloomOut}/>
    </div>
  );
}

export default App;
