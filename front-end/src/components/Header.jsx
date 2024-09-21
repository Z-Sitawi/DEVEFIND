import { Link } from 'react-router-dom';

/* images */
import logo from '../assets/logo-no-background.png';

export default function Header () {
  return (
    <header className='col-12'>
      <div className='container py-3 d-flex flex-wrap justify-content-between align-items-center'>
        <img id='logoHeader' src={logo} alt='DeveFind' className='col-2' />
        <div className='d-flex gap-3'>
          <Link id='signUp' className='button' to='/signup'>Sign up</Link>
          <Link id='signIn' className='button' to='/signin'>Sign in</Link>
        </div>
      </div>
    </header>
  );
}
