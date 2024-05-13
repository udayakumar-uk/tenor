import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery'
// import './index.css';
import App from './App';
import NoInternet from '../src/img/no_connection.png'

// import './script'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function OfflineContent(){
    return(
      <div className='offlineContent'>
        <img src={NoInternet} width='100' alt='no connection' />
        <h2>No Internet Connection</h2>
        <p>Please check your internet connectivity and try again</p>
      </div>
    )
}

root.render(
  <React.StrictMode>
    {window.navigator.onLine ? <App /> : <OfflineContent/>}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
