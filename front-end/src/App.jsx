import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

/* components */
import Header from './components/Header';
import MainSection from './components/MainSection';
import SubSection from './components/SubSection';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';

/* pages */
import SignupPage from './SignupPage';

function App() {
  return (
    <Router>
      <>
        <Header/>
        <MainSection/>
        <SubSection/>
        <PreFooter/>
        <Footer/>

        {/* Define Routes */}
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes here */}
        </Routes>
      </>
    </Router>
  );
}


export default App
