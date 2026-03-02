import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // E line add cheyandi
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* App ni ikkada wrap cheyandi */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();