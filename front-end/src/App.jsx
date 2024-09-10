/* eslint-disable react/no-unescaped-entities */
// import { useState } from 'react'
import './styles/app.css'
import bgImage from './assets/Deve.png'
import logo from './assets/logo-no-background.png'
import filterIcon from './assets/filterIcon.png'
import accessIcon from './assets/accessIcon.png'
import profileIcon from './assets/profile.png'
import logoOnly from '../public/favicon.png'

function App() {
  return (
    <>
      <header className='col-12'>
        <div className='container py-3 d-flex flex-wrap justify-content-between align-items-center'>
          <img id='logoHeader' src={logo} alt="DeveFind" className='col-2'></img>
          <div className='d-flex gap-3'>
            <button id='signUp' type='button' className='' >Sign up</button>
            <button id='signIn' type='button' className='' >Sign in</button>
          </div>
        </div>
      </header>
      <main>
        <img className='col-12 bgImage' src={bgImage} alt="Background image"/>
        <section className='main col-12'>
          <h1 className='col-12 text-center'>Connect with Top IT Talent Effortlessly</h1>
          <p className='subHeadline col-12 px-3 text-center'>Streamlining the recruitment process for IT professionals and recruiters.</p>
          <section className='subSec1 col-12 row m-0'>
            <div className='container text-center py-5'>
              <img className='col-3' src={logoOnly} alt="DeveFind"/>
            </div>
            <div className=' text-center p-3 col-12 col-md-6'>
              <h3><b>What Is DeveFind?</b></h3>
              <p>
                <b>DeveFind</b> is innovative platform designed to streamline the hiring process for recruiters looking for
                talented developers. It offers a centralized space where recruiters can easily search, filter, and find the right
                developers to meet their specific needs, saving time and effort in the recruitment process.
              </p>
            </div>
            <div className='p-3 col-12 col-md-6 text-left'>
              <h3 className='text-center'><b>Our Mission</b></h3>
              <ul>
                <li><b>Empowering Recruiters:</b> Making it easier for recruiters to find the best talent quickly and efficiently.</li>
                <li><b>Supporting Developers:</b> Providing developers with more opportunities to showcase their skills and connect with great companies.</li>
                <li><b>Building Community:</b> Fostering a vibrant network of tech professionals and companies to drive innovation.</li>
              </ul>
            </div>
          </section>
        </section>
      </main>
      <section className='cards text-center p-3'>
        <h1 className='col-12 py-2'>Why Choose DeveFind?</h1>
        <div className='container d-flex flex-wrap justify-content-center gap-3'>
          <div className='card col-12 col-lg-5 col-xl-3'>
            <div className='card-body'>
              <img className='col-4 col-lg-12' src={filterIcon}></img>
              <h3>Advanced Filtering</h3>
              <p>Find the right candidates faster with our powerful search filters.</p>
            </div>
          </div>
          <div className='card col-12 col-lg-5 col-xl-3'>
            <div className='card-body'>
              <img className='col-4 col-lg-12' src={accessIcon}></img>
              <h3>Easy Access</h3>
              <p>A pool of Tech professionals to choose from.</p>
            </div>
          </div>
          <div className='card col-12 col-lg-5 col-xl-3'>
            <div className='card-body'>
              <img className='col-4 col-lg-12' src={profileIcon}></img>
              <h3>Profile Management</h3>
              <p>Job seekers can easily update and showcase their skills and experience.</p>
            </div>
          </div>
        </div>
        <div className='py-5 row m-0'>
          <div className="col-12 col-md-6">
            <h2>Get found by the right job or internship</h2>
            <h2>or</h2>
            <h2>Get recruiting ...</h2>
          </div>
          <div className="profiles col-12 col-md-6 d-flex flex-wrap justify-content-center">
            <div>
              <button type="button">Front-end Developer</button>
              <button type="button">Back-end Developer</button>
              <button type="button">Mobile App Developer</button>
            </div>
            <div>
              <button type="button">IT Support Specialist</button>
              <button type="button">Cloud Engineer</button>
              <button type="button">UX/UI Designer</button>
            </div>
            <div>
              <button type="button">Research and Development (R&D) Engineer</button>
              <button type="button">DevOps Engineer</button>
              <button type="button">XR Developer (AR/VR)</button>
            </div>
            <div>
              <button type="button">Business Intelligence (BI) Developer</button>
              <button type="button">Wireless Engineer</button>
              <button type="button">Data Analyst</button>
              <button type="button">and More ...</button>
            </div>
          </div>
          
          <section className="testimonials-section d-flex flex-wrap justify-content-center py-3">
            <h2 className='col-12'>What Our Users Say</h2>
            <div className="testimonials container d-flex flex-wrap justify-content-between gap-1">
              <div className="col-12 col-lg-5 p-3">
                <p>"DeveFind helped me find the perfect candidate in just a few hours!"</p>
                <p>⭐⭐⭐⭐⭐</p>
                <p>- <b>Recruiter from TechCorp</b></p>
              </div>
              <div className="col-12 col-lg-5 p-3">
                <p>"I landed my dream job thanks to DeveFind's easy-to-use platform."</p>
                <p>⭐⭐⭐⭐⭐</p>
                <p>- <b>Jane Doe, Software Engineer</b></p>
              </div>
            </div>
          </section>

        </div>
      </section>
      <div className='preFooter p-4 bg-dark col-12'>
        <h3 className='text-light'>Ready to Get Started?</h3>
        <button className='my-3 btn-outline-light'>Join Us Now</button>
        <img className='col-5' src={logo}></img>
      </div>
      <footer className="bg-dark text-center py-3 text-light">
        <div className='d-flex gap-2'>
          <a href="/aboout">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      <div className='d-flex gap-2'>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <p>© 2024 DeveFind. All rights reserved.</p>
      <small>Founder <a href='https://github.com/Z-Sitawi' target='blanc'>Mr. Zakaria Aaichaou</a></small>
    </footer>
    </>
  )
}

export default App
