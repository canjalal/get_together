import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import eventsReducer from './events';
import groupKeywordsReducer from './groupkeywords';
import groupReducer from './groups';
import keywordReducer from './keywords';
import membershipsReducer from './memberships';
import sessionReducer from './session';
import signupsReducer from './signups';
import usersReducer from './users';

export const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    keywords: keywordReducer,
    groups: groupReducer,
    groupKeywords: groupKeywordsReducer,
    memberships: membershipsReducer,
    events: eventsReducer,
    signups: signupsReducer,
});

const middleware = [thunk]; // array of middlewares, initiate it with thunk but also add 'logger' if not in production:

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export default store;
