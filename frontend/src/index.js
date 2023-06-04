import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import * as sessionActions from './store/session';

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
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );

}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
