import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


// ReactDOM. render() controls the contents of the container node you pass in.
ReactDOM.render(

  // The <Provider /> makes the Redux store available to any nested components 
  // that have been wrapped in the connect() function.
  <Provider store={store}>

  {/* The first one, <BrowserRouter>, is usually given an alias of 'Router' and 
  this is the parent component that is used to store all of your <Route> components. 
  The <Route> components are what tell your app which other components to display based on the route. */}
  <BrowserRouter>

  {/* Main entry point for the application */}
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
