import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserDataProvider } from './context/UserDataContext';
import { BookingDataProvider } from './context/BookingDataContext';
import ClientI from './types/client';

import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [loadOut, setLoadOut] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight);
  const [client, setClient] = useState<ClientI | null>(null);
  const [clientNav, setClientNav] = useState<string>("Appointments");

  useEffect(() => {
    if (!mobile) setLoaded(true);

    const handleResize = () => {
      setMobile(window.innerWidth <= window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  const handleClientNav = (navItem: string) => {
        if (clientNav === navItem) {
            setClientNav("");
        } else {
            setClientNav(navItem);
        }
    }

  const bloomOut = () => {
    setLoadOut(true);
    setLoaded(false);
    setTimeout(() => {
      setLoadOut(false);
    }, 250); // Adjust the timeout duration as needed
  }

  return (
    <div className="project-app">
        <div className={`loading-screen ${loaded ? 'hidden' : ''} ${loadOut ? 'changeScreen' : ''}`} />
        <Header client={client} setClient={setClient} clientNav={clientNav} handleClientNav={handleClientNav} bloomOut={bloomOut}/>
        <main className="mx-3">
          <ScrollToTop />
          <BookingDataProvider>
            <UserDataProvider>
              <Outlet context={{client, setClient, clientNav, handleClientNav, bloomOut}}/>
            </UserDataProvider>
          </BookingDataProvider>
        </main>
        <Footer bloomOut={bloomOut}/>
    </div>
  );
}

export default App;
