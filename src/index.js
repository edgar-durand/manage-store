// import 'bootstrap/dist/css/bootstrap.css';
import "./components/styles/css/bootstrap.min.css";
import './static/css/animate.css';
import './static/css/style.css';
import './static/pe-icon-7-stroke/css/pe-icon-7-stroke.css';
import './static/pe-icon-7-stroke/css/helper.css';
import './nca.scss';
import './index.css';
import 'react-app-polyfill/ie11'; // For IE 11 support
import "core-js/es";
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
window.SitePath = window.location.protocol + '//' + window.location.host + baseUrl;

ReactDOM.render(
    <Router basename={baseUrl}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    rootElement
);
