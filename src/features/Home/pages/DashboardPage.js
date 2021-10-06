import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Select } from 'antd'
import styled from 'styled-components';
import { ArrowRightOutlined, DollarCircleFilled, DollarOutlined, ReadOutlined, RightOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons';


import Chart from 'react-apexcharts'

import { TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { ORDERS_OPTIONS, ORDERS_SERIES } from 'constants/Global';
import BillConfirm from '../Components/BillConfirm';
import RevenueChart from '../Components/RevenueChart';
DashboardPage.propTypes = {

};



const EarningStyled = styled.div`
    display:flex;
    justify-content:space-between;

`;

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
       font-size:1.1rem;
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
   margin-right:1rem;
`;

const WrapperStatistic = styled.div`
   display:flex;
   justify-content:space-between;
   margin-top:1rem;
`;
function DashboardPage(props) {
    return (
        <div>
            <Row justify="space-between">
                <Col span={8}>
                    <Wrapper>
                        <TopStyled>
                            <TitleStyled>Overviews</TitleStyled>
                            <span>Octobor</span>
                        </TopStyled>
                        <div>
                            <div></div>
                        </div>
                    </Wrapper>

                    <Wrapper>
                        <TopStyled>
                            <TitleStyled>Orders</TitleStyled>
                            <span>
                                1/1/2021 <ArrowRightOutlined /> now
                            </span>
                        </TopStyled>
                        <div>
                            <Chart
                                height="270px"
                                options={ORDERS_OPTIONS}
                                series={ORDERS_SERIES}
                            />
                        </div>
                    </Wrapper>

                </Col>
                <Col span={15}>
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
                                        <div>230k</div>
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
                                        <div>8.549k</div>
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
                                        <div>1.423k</div>
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
                                        <div>9745</div>
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
            <Wrapper>
                <TitleStyled>Bill confirm</TitleStyled>
                <div>
                    <BillConfirm />
                </div>
            </Wrapper>
        </div >
    );
}

export default DashboardPage;