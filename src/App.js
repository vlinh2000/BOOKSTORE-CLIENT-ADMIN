import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import React from 'react';
import { Suspense } from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const Login = React.lazy(() => import('features/Authentication/pages/Login'));
const Home = React.lazy(() => import('features/Home'));



export const history = createBrowserHistory();

function App() {
  const { isAuth } = useSelector(state => state.auth)


  return (
    <div className="App">
      <Suspense fallback={<Spin />}>

        <Router history={history}  >
          {/* TOASTIFY CONPONENT */}
          <ToastContainer />
          <Switch>
            <Redirect exact from="/" to="/home/dashboard" />
            <Route path="/authentication/login" component={Login} />
            <Route
              path="/home"
              render={() => {
                if (!isAuth) return <Redirect to="/authentication/login" />;
                return <Home />;
              }}
            ></Route>
            <Route component={() => <div>NOT FOUND</div>} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
