import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  // ReactDOM.render(
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
  //  document.getElementById('root')
  // );  
}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}