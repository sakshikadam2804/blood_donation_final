import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const goToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTo', sectionId);
      navigate('/');
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 py-4 flex flex-wrap justify-center gap-6 text-sm font-medium text-red-700">
      <button onClick={() => goToSection('home')} className="hover:text-red-900">Home</button>
      <button onClick={() => goToSection('about')} className="hover:text-red-900">About</button>
      <button onClick={() => goToSection('why-donate')} className="hover:text-red-900">Why Donate</button>
      <button onClick={() => goToSection('blood-types')} className="hover:text-red-900">Blood Types</button>
      <button onClick={() => goToSection('centers')} className="hover:text-red-900">Donation Centers</button>
      <button onClick={() => goToSection('contact')} className="hover:text-red-900">Contact</button>

      {user ? (
        <>
          <button onClick={() => navigate('/admin')} className="hover:text-red-900">Admin Panel</button>
          <button onClick={handleLogout} className="hover:text-red-900">Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')} className="hover:text-red-900">Admin Login</button>
      )}
    </nav>
  );
};

export default Navbar;
