import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import groupKeywordsReducer from './groupkeywords';
import groupReducer from './groups';
import keywordReducer from './keywords';
import sessionReducer from './session';

export const rootReducer = combineReducers({
    session: sessionReducer,
    keywords: keywordReducer,
    groups: groupReducer,
    groupKeywords: groupKeywordsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => createStore(rootReducer, preloadedState, enhancer);
export default configureStore;