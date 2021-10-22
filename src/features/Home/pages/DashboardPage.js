import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Select, Badge, Tooltip } from 'antd'
import styled from 'styled-components';
import { ArrowRightOutlined, BellOutlined, DollarCircleFilled, DollarOutlined, ReadOutlined, RightOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons';

import { useSelector } from "react-redux"

import Chart from 'react-apexcharts'

import { DolarIconStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { ORDERS_OPTIONS, ORDERS_SERIES } from 'constants/Global';
import BillConfirm from '../Components/BillConfirm';
import RevenueChart from '../Components/RevenueChart';
import { revenue } from 'utils/common';
DashboardPage.propTypes = {

};


const InfoEarningStyled = styled.div`
   color:#969696;
    width:50%;

   span{
       color:#666;
       font-size:16px;
       font-weight:bold;
   }

   p{
     font-size:12px;
     margin-top:1rem;   
   }
`;



const ItemStyled = styled.div`
   display:flex;
   width:25%;
   div{
       font-weight:bold;
       color:#666;
   }
`;

const SubTitle = styled.span`
   color:#AAA;
   font-size:12px;
`;
const IconStyled = styled.div`
   color:${props => props.color}!important;
   background-color:${props => props.bgColor};
   width:48px;
   height:48px;
   border-radius:50%;
   text-align:center;
   line-height:48px;
   font-size:1.4rem!important;
   margin-right:0.75rem;
`;

const WrapperStatistic = styled.div`
   display:flex;
   justify-content:space-between;
   margin-top:1rem;
`;

const SellingItemStyled = styled.div`
   display:flex;
   align-items:center;
   justify-content:space-between;
   color:#969696;
   margin-bottom:0.5rem;
   font-size:13px;
`;

const BookNameStyled = styled.span`
   font-weight:bold;
   margin-left:1rem

`;

const PriceStyled = styled.span`
   margin-right:3rem;
`;
function DashboardPage(props) {
    const { users, bills, products, orders } = useSelector(state => state.home);


    return (
        <div>
            <Row justify="space-between" gutter={[20, 20]}>
                <Col span={10}>
                    <Wrapper>
                        <TopStyled>
                            <TitleStyled>Orders</TitleStyled>
                            <Button
                                size="large"
                                shape="circle"
                                type="text"
                                icon={
                                    <Badge
                                        dot={orders.length > 0}
                                        size="small">
                                        <BellOutlined style={{ fontSize: 13 }} />
                                    </Badge>
                                }>
                            </Button>
                        </TopStyled>
                        <div>
                            <BillConfirm orders={orders} />
                        </div>
                    </Wrapper>

                    <Wrapper>
                        <TopStyled>
                            <TitleStyled>Most selling</TitleStyled>
                        </TopStyled>
                        <div>
                            <SellingItemStyled>
                                <div>
                                    <img
                                        width="40px"
                                        height="50px"
                                        src="http://localhost:8000/api/images/image99826200.png" alt="image" />
                                    <BookNameStyled>Tên sách</BookNameStyled>
                                </div>
                                <div>
                                    <PriceStyled>880 <DolarIconStyled /></PriceStyled>
                                    <span>Đã bán</span>
                                </div>
                            </SellingItemStyled>
                            <SellingItemStyled>
                                <div>
                                    <img
                                        width="40px"
                                        height="50px"
                                        src="http://localhost:8000/api/images/image99826200.png" alt="image" />
                                    <BookNameStyled>Tên sách</BookNameStyled>
                                </div>
                                <div>
                                    <PriceStyled>880 <DolarIconStyled /></PriceStyled>
                                    <span>Đã bán</span>
                                </div>
                            </SellingItemStyled>
                            <SellingItemStyled>
                                <div>
                                    <img
                                        width="40px"
                                        height="50px"
                                        src="http://localhost:8000/api/images/image99826200.png" alt="image" />
                                    <BookNameStyled>Tên sách</BookNameStyled>
                                </div>
                                <div>
                                    <PriceStyled>880 <DolarIconStyled /></PriceStyled>
                                    <span>Đã bán</span>
                                </div>
                            </SellingItemStyled>
                        </div>
                    </Wrapper>

                </Col>
                <Col span={14}>
                    <Wrapper>
                        <div>
                            <TopStyled>
                                <TitleStyled>Statistics</TitleStyled>
                                <span>Update 1 month ago</span>
                            </TopStyled>
                            <WrapperStatistic>
                                <ItemStyled>
                                    <IconStyled
                                        color="#7367f0"
                                        bgColor="rgba(115,103,240,.12)">
                                        <RiseOutlined />
                                    </IconStyled>
                                    <div>
                                        <div>{bills.length}</div>
                                        <SubTitle>Sales</SubTitle>
                                    </div>
                                </ItemStyled>
                                <ItemStyled>
                                    <IconStyled
                                        color="#00cfe8"
                                        bgColor="rgba(0,207,232,.12)">
                                        <UserOutlined />
                                    </IconStyled>
                                    <div>
                                        <div>{users.length - 1}</div>
                                        <SubTitle>Customers</SubTitle>
                                    </div>
                                </ItemStyled>
                                <ItemStyled>
                                    <IconStyled
                                        color="#ea5455"
                                        bgColor="rgba(234,84,85,.12)">
                                        <ReadOutlined />
                                    </IconStyled>
                                    <div>
                                        <div>{products.length}</div>
                                        <SubTitle>Products</SubTitle>
                                    </div>
                                </ItemStyled>
                                <ItemStyled>
                                    <IconStyled
                                        color="#28c76f"
                                        bgColor="rgba(40,199,111,.12)">
                                        <DollarOutlined />
                                    </IconStyled>
                                    <div>
                                        <div>{revenue(bills)}</div>
                                        <SubTitle>Revenue</SubTitle>
                                    </div>
                                </ItemStyled>
                            </WrapperStatistic>
                        </div>

                    </Wrapper>

                    <Wrapper>
                        <RevenueChart />
                    </Wrapper>
                </Col>
            </Row>
        </div >
    );
}

export default DashboardPage;