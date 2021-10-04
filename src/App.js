import './App.css';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import Header from './components/Header';
import { Col, Row } from 'antd';
import SideBar from './components/SideBar';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';


export const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter  >
        <Row>
          <Col span={5}>
            <SideBar />
          </Col>
          <Col span={19}>
            <Header />
            <div className="content">
              <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <Route path="/dashboard" component={DashboardPage}></Route>
                <Route path="/product" component={ProductPage}></Route>
                <Route path="/bill" component={() => <div>bill</div>}></Route>
                <Route path="/category" component={() => <div>category</div>}></Route>
                <Route path="/user" component={() => <div>user</div>}></Route>
                <Route component={<div>not found</div>} />
              </Switch>
            </div>
          </Col>
        </Row>

      </BrowserRouter>
    </div>
  );
}

export default App;
