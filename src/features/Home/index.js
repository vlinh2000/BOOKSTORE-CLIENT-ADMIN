import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import SideBar from 'components/SideBar';
import Header from 'components/Header';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import BillPage from './pages/BillPage';
import CategoryPage from './pages/CategoryPage';
import UserPage from './pages/UserPage';
import Profile from './Components/Modals/Profile';
import { useDispatch } from 'react-redux';
import { fetchBills, fetchCategories, fetchProducts, fetchUsers } from './homeSlice';

Home.propTypes = {

};

function Home(props) {

    const match = useRouteMatch();

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchBills());
        dispatch(fetchUsers());

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
                            <Route path={`${match.url}/bill`} component={BillPage}></Route>
                            <Route path={`${match.url}/category`} component={CategoryPage}></Route>
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