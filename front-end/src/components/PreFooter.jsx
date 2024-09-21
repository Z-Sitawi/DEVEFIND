/* images */
import logo from '../assets/logo-no-background.png';

export default function PreFooter () {
  return (
    <div className='preFooter p-4 bg-dark col-12'>
      <h3 className='text-light'>Ready to Get Started?</h3>
      <a href='/signup' className='my-3 button btn-outline-light'>Join Us Now</a>
      <img className='col-5' src={logo} alt='DeveFind' />
    </div>
  );
}
