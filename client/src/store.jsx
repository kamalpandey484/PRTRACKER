import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/indexReducer';

let store;

if(process.env.NODE_ENV === 'production') {
  store = createStore(
    rootReducer, compose(
      applyMiddleware(thunk),
    ),
  );
} else {
  store = createStore(
    rootReducer, compose(
      applyMiddleware(thunk),
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
}

export default store;
