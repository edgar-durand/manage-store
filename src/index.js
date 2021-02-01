import 'bootstrap/dist/css/bootstrap.css';
import './static/css/animate.css';
import './static/css/style.css';
import './static/pe-icon-7-stroke/css/pe-icon-7-stroke.css';
import './static/pe-icon-7-stroke/css/helper.css';
import 'react-app-polyfill/ie11'; // For IE 11 support
import "core-js/es";
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

