import React from 'react';
import { Col, Row } from 'antd';
import SideBar from 'components/SideBar';
import Header from 'components/Header';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import BillPage from './pages/BillPage';
import PaymentPage from './pages/PaymentPage.js';
import CategoryPage from './pages/CategoryPage';
import UserPage from './pages/UserPage';
import Profile from './Components/Modals/Profile';
import { useDispatch } from 'react-redux';
import { fetchBills, fetchCategories, fetchPayments, fetchProducts, fetchUsers } from './homeSlice';


function Home(props) {

    const match = useRouteMatch();

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchBills());
        dispatch(fetchUsers());
        dispatch(fetchPayments());
    }, []);

    return (
        <div>
            <Row>
                <Col span={5}>
                    <SideBar />
                </Col>
                <Col span={19}>
                    <Header />
                    <Profile />
                    <div className="content">
                        <Switch>
                            <Redirect exact from="/home" to="/home/dashboard" />
                            <Route path={`${match.url}/dashboard`} component={DashboardPage}></Route>
                            <Route path={`${match.url}/product`} component={ProductPage}></Route>
                            <Route path={`${match.url}/category`} component={CategoryPage}></Route>
                            <Route path={`${match.url}/bill`} component={BillPage}></Route>
                            <Route path={`${match.url}/payment`} component={PaymentPage}></Route>
                            <Route path={`${match.url}/user`} component={UserPage}></Route>
                            <Route component={() => <div>not found</div>} />
                        </Switch>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Home;