import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* styles */
import '../styles/index.css';

/* pages */
import Loader from './Loader';
import App from '../App.jsx';
import SignupPage from '../SignupPage.jsx';
import SigninPage from '../SigninPage.jsx';
import JobSeekerDash from '../JobSeekerDash.jsx';
import RecruiterDash from '../RecruiterDash.jsx';

async function fetchAndStoreFilters () {
  try {
    const response = await fetch('http://0.0.0.0:3000/api/filters');

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('filters', JSON.stringify({
        data,
        timestamp: Date.now() // Store timestamp for expiration checks
      }));
      return data;
    } else {
      console.error(`Error Fetching filters: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

export default function AppWithLoader () {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await fetchAndStoreFilters();
      setLoading(false); // Set loading to false after fetching data
    };

    initializeData();
  }, []);

  if (loading) {
    return <Loader height='100vh' />;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/recruiter/' element={<RecruiterDash />} />
        <Route path='/jobSeeker/' element={<JobSeekerDash />} />
      </Routes>
    </Router>
  );
}
