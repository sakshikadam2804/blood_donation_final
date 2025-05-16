import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './components/Contact';
import PrivateRoute from './components/PrivateRoute';
import ScrollToHash from './components/ScrollToHash';
import Navbar from './components/Navbar';



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <ScrollToHash /> {/* ✅ Enable section scroll from any route */}
       <Navbar /> {/* ✅ Use updated navbar here */}
      {/* ✅ Updated nav with login check */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 py-4 flex flex-wrap justify-center gap-6 text-sm font-medium text-red-700">
        <a href="#home" className="hover:text-red-900">Home</a>
        <a href="#about" className="hover:text-red-900">About</a>
        <a href="#why-donate" className="hover:text-red-900">Why Donate</a>
        <a href="#blood-types" className="hover:text-red-900">Blood Types</a>
        <a href="#centers" className="hover:text-red-900">Donation Centers</a>
        <a href="#contact" className="hover:text-red-900">Contact</a>

        {user ? (
          <>
            <a href="/admin" className="hover:text-red-900">Admin Panel</a>
            <button
              onClick={() => {
                signOut(auth);
                window.location.href = '/'; // ✅ Redirect to homepage
              }}
              className="hover:text-red-900"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="hover:text-red-900">Admin Login</a>
        )}
      </nav>

      {/* Your routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
