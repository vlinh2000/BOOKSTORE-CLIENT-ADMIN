import './App.css';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import React from 'react';
import { Suspense } from 'react';
import { Spin } from 'antd';

const Login = React.lazy(() => import('features/Authentication/pages/Login'));
const Home = React.lazy(() => import('features/Home'));



export const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spin />}>
        <BrowserRouter  >
          <Switch>
            <Redirect exact from="/" to="/home/dashboard" />
            <Route path="/authentication/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
