// eslint-disable-next-line no-unused-vars
import React from 'react'

/* images */
import logo from '../assets/logo-no-background.png';

/* styles */
import '../styles/app.css';



export default function Header() {
  return (
    <header className='col-12'>
          <div className='container py-3 d-flex flex-wrap justify-content-between align-items-center'>
            <img id='logoHeader' src={logo} alt="DeveFind" className='col-2' />
            <div className='d-flex gap-3'>
              <a id='signUp' type='button' className='button' to='/signup'>Sign up</a>
              <a id='signIn' type='button' className='button' to='/signin'>Sign in</a>
            </div>
          </div>
    </header>
  )
}
