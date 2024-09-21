import PropTypes from 'prop-types';
/* images */
import logo from '/public/favicon.png';

export default function UserIdentifyer ({ title, onJobSeekerClick, onRecruiterClick }) {
  return (
    <>
      <span><a href='/'><img id='DeveFindLogo' src={logo} alt='DeveFind' /></a><h1>{title}</h1></span>
      <section className='col-12 d-flex justify-content-center gap-3 py-3'>
        <button id='jobSeeker' className='Btn jobSeekerBtn col-5' onClick={onJobSeekerClick}>Job Seeker</button>
        <button id='recruiter' className='Btn recruiterBtn col-5' onClick={onRecruiterClick}>Recruiter</button>
      </section>
    </>
  );
}

UserIdentifyer.propTypes = {
  title: PropTypes.string.isRequired,
  onJobSeekerClick: PropTypes.func,
  onRecruiterClick: PropTypes.func
};
