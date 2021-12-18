import React from 'react';
import { Row, Col, Button, Badge, Avatar, Popover } from 'antd'
import styled from 'styled-components';
import {
    BellOutlined, DollarOutlined, ExclamationCircleOutlined,
    EyeOutlined, ReadOutlined, RiseOutlined, SendOutlined,
    ShoppingCartOutlined, UserOutlined
} from '@ant-design/icons';

import { useSelector } from "react-redux"

import { DolarTextStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import BillConfirm from '../Components/BillConfirm';
import RevenueChart from '../Components/RevenueChart';
import { getTopSelling, revenue } from 'utils/common';
import { BillApi } from 'api/BillApi';
import AccountInfo from '../Components/AccountInfo';
DashboardPage.propTypes = {

};


const ItemStyled = styled.div`
   display:flex;
   width:25%;
   div{
       font-size:20px;
       font-weight:bold;
       color:#666;
   }
`;

const SubTitle = styled.p`
   color:#AAA;
   font-size:12px;
   font-style:italic;
   font-weight:500;
   text-decoration: underline;
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
`;

const SellingItemStyled = styled.div`
   display:flex;
   align-items:center;
   justify-content:space-between;
   color:#444;
   margin-bottom:0.75rem;
   font-size:13px;
`;
const CustomerItemStyled = styled.div`
   display:flex;
   align-items:center;
   justify-content:space-between;
   color:#444;
   margin-bottom:0.75rem;
   font-size:13px;
`;

const BookNameStyled = styled.span`
   font-weight:bold;
   margin-left:1rem

`;

const ReceiverNameStyled = styled.div`
   font-weight:bold;
   margin-left:1rem

`;

const PriceStyled = styled.span`
   margin-right:3rem;
   font-weight:bold;
   color:#ff9f43;
`;

const NullStyled = styled.p`
   color:#ea5455;
   font-weight:bold;
   font-style:italic;
   font-size:12px;
   margin-left:1rem;
`;


function DashboardPage(props) {
    const { users, bills, products, orders } = useSelector(state => state.home);

    const [topSelling, setTopSelling] = React.useState([]);

    const [topCustomers, setTopCustomers] = React.useState([]);

    React.useEffect(() => {
        const topSell = getTopSelling(bills, 3);
        setTopSelling(topSell);
    }, [bills])

    React.useEffect(() => {
        const fetTopchCustomers = async () => {
            try {
                const topCustomerNumber = 3;
                const response = await BillApi.get_TopCustomers(topCustomerNumber);
                setTopCustomers(response.topCustomers);
            } catch (error) {
                console.log(error);
            }
        }
        fetTopchCustomers();
    }, [])

    return (
        <div>
            <Row justify="space-between" gutter={[20, 20]}>
                <Col span={9}>


                    <Wrapper style={{ minHeight: 270 }}>
                        <TopStyled>
                            <TitleStyled>Most selling</TitleStyled>
                        </TopStyled>
                        <div>
                            {
                                topSelling?.map(product => <SellingItemStyled>
                                    <div key={product._id}>
                                        <img
                                            width="40px"
                                            height="50px"
                                            src={product.image}
                                            alt="imageProduct" />
                                        <BookNameStyled>{product.name}</BookNameStyled>
                                    </div>
                                    <div>
                                        <PriceStyled>{product.price} <DolarTextStyled>dolars</DolarTextStyled></PriceStyled>
                                        <span><SendOutlined style={{ transform: 'rotate(-30deg)' }} /> {product.bought}</span>
                                    </div>
                                </SellingItemStyled>)
                            }

                        </div>
                    </Wrapper>
                    <Wrapper style={{ minHeight: 307 }}>
                        <TopStyled>
                            <TitleStyled>Top customers</TitleStyled>
                        </TopStyled>
                        <div>
                            {
                                topCustomers?.map((customer) =>
                                    <CustomerItemStyled key={customer._id}>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <Popover content={<AccountInfo info={customer} />}>
                                                    <EyeOutlined style={{ fontSize: 15, marginRight: '1rem', cursor: "pointer", color: "#ff6085", padding: "2px 6px", border: "1px solid #ff6085" }} />
                                                </Popover>
                                                <Avatar
                                                    size="large"
                                                    src={customer.accountInfo[0].avatar} alt="image" />
                                            </div>
                                            <div>
                                                {
                                                    customer.receivers?.map((receiver, index) =>
                                                        <ReceiverNameStyled key={index}>
                                                            {receiver.name}
                                                        </ReceiverNameStyled>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <PriceStyled>{parseFloat(customer.totalPrice).toFixed(2)} <DolarTextStyled>dolars</DolarTextStyled></PriceStyled>
                                            <span><ShoppingCartOutlined /> {customer.total}</span>
                                        </div>
                                    </CustomerItemStyled>
                                )
                            }

                        </div>
                    </Wrapper>

                </Col>
                <Col span={15}>
                    <Wrapper>
                        <div>
                            <TopStyled>
                                <TitleStyled>Statistics</TitleStyled>
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
                                <BellOutlined style={{ fontSize: 15, color: "#222" }} />
                            </Badge>
                        }>
                    </Button>
                </TopStyled>
                <div>
                    {orders.length > 0 ? <BillConfirm orders={orders} /> : <NullStyled><ExclamationCircleOutlined /> No orders yet  </NullStyled>}
                </div>
            </Wrapper>
        </div >
    );
}

export default DashboardPage;