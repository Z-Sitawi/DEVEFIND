import { useState } from 'react';

/* components */
import UserIdentifyer from './components/UserIdentifyer';
import SignIn from './components/SignIn';
import Footer from './components/Footer';

/* styles */
import './styles/signup.css';

function SigninPage () {
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
        <div className='col-9 col-sm-8 col-md-7 col-lg-5 container text-center'>
          <UserIdentifyer
            title='Sign In'
            onJobSeekerClick={onJobSeekerClick}
            onRecruiterClick={onRecruiterClick}
          />
          <div className={'form_area ' + eff}>
            {
              user === ''
                ? (null)
                : user === 'jobSeeker'
                  ? (
                    <SignIn user='dev' apiUrl='http://0.0.0.0:3000/developer/login' page='jobSeeker' />
                    )
                  : (
                    <SignIn user='rec' apiUrl='http://0.0.0.0:3000/recruiter/login' page='recruiter' />
                    )
          }
          </div>

        </div>
      </main>
      <Footer />
    </>

  );
}

export default SigninPage;
