import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { startSetExpenses } from './actions/expenses';
import { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  // Log user out
  if (!user) {
    store.dispatch(logout());
    renderApp();
    return history.push('/');
  }
  store.dispatch(login(user.uid));
  // Log user in
  // Wait until expenses are loaded from DB before rendering application
  store.dispatch(startSetExpenses())
  .then(() => {
    renderApp();
    if (history.location.pathname === '/') {
      return history.push('/dashboard');
    }
  });
});
