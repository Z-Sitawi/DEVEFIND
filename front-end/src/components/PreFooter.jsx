// eslint-disable-next-line no-unused-vars
import React from 'react'

/* images */
import logo from '../assets/logo-no-background.png';

/* styles */
import '../styles/app.css';

export default function PreFooter() {
  return (
    <div className='preFooter p-4 bg-dark col-12'>
          <h3 className='text-light'>Ready to Get Started?</h3>
          <a to='/signup' className='my-3 button btn-outline-light'>Join Us Now</a>
          <img className='col-5' src={logo} alt="DeveFind" />
    </div>
  )
}
