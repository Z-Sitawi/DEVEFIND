// eslint-disable-next-line no-unused-vars
import React from 'react'

/* styles */
import '../styles/app.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-center py-3 text-light">
          <div className='d-flex gap-2'>
            <a to="/about">About Us</a>
            <a to="/contact">Contact</a>
            <a to="/privacy">Privacy Policy</a>
            <a to="/terms">Terms of Service</a>
          </div>
          <div className='d-flex gap-2'>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
          <p>© 2024 DeveFind. All rights reserved.</p>
          <small>Founder <a href='https://github.com/Z-Sitawi' target='_blank' rel='noopener noreferrer'>Mr. Zakaria Aaichaou</a></small>
    </footer>
  )
}
