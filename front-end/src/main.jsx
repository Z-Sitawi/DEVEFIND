import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWithLoader from './components/AppWithLoader';

/* styles */
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithLoader />
  </StrictMode>
);
