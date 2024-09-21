import { useState } from 'react';

/* components */
import UserIdentifyer from './components/UserIdentifyer';
import JobSeekerSignUp from './components/JobSeekerSignUp';
import RecruiterSignUp from './components/RecruiterSignUp';
import Footer from './components/Footer';

/* styles */
import './styles/signup.css';

function SignupPage () {
  const [user, setUser] = useState('');
  const [eff, setEff] = useState('');
  const onJobSeekerClick = () => {
    setUser('jobSeeker');
    setEff('bg-jobSeeker');
  };

  const onRecruiterClick = () => {
    setUser('recruiter');
    setEff('bg-recruiter');
  };

  return (
    <>
      <main id='signUpBody' className=' py-3 p-lg-5'>
        <div className='container text-center'>
          <UserIdentifyer
            title='Sign Up'
            onJobSeekerClick={onJobSeekerClick}
            onRecruiterClick={onRecruiterClick}
          />
          <div className={'form_area ' + eff}>
            {
              user === ''
                ? (null)
                : user === 'jobSeeker'
                  ? (
                    <JobSeekerSignUp />
                    )
                  : (
                    <RecruiterSignUp />
                    )
          }
          </div>

        </div>
      </main>
      <h1 />

      <Footer />
    </>

  );
}

export default SignupPage;
