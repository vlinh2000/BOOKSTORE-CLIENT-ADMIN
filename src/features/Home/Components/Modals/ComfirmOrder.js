import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Col, Modal, Row, Menu, Popconfirm, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { AddButton, CancelButton, DolarIconStyled, RemoveButtonStyled } from 'assets/styles/globalStyled';
import { BillApi } from 'api/BillApi';
import { useDispatch } from 'react-redux';
import { fetchBills } from 'features/Home/homeSlice';

ComfirmOrder.propTypes = {

};

const WrapperStyled = styled.div`
    min-height:300px;
    padding:0 1rem;

`;


const InfoStyled = styled.div`
    display:flex;
    font-size:13px;
    border-bottom:1px solid #eee;  
    margin-bottom:0.5rem; 
`;

const TitleInfo = styled.span`
    color:#969696;
    margin-right:1rem;
    min-width:85px;
    font-style:italic;
`;

const ContentStyled = styled.span`
    font-weight:500;
`;
const TitleStyled = styled.p`
    font-size:15px;
    font-weight:bold;
    font-style:italic;
    text-align:center;
    color:#ff9f43;

`;

const PayStatus = styled.div`
    color:#ff9f43;;
    border:1px solid #ff9f43;;
    padding:1px 10px;
    margin-bottom:5px;
   box-shadow:1px 1px 10px 0px #AAA;

    `;

const NotPayStatus = styled.div`
    color:#ea5455;
    border:1px solid #ea5455;
    padding:1px 10px;
    margin-bottom:5px;
    box-shadow:1px 1px 10px 0px #AAA;

    `;

const TraddingCodeStyled = styled.div`
    color:#7367f0;
    border:1px solid #7367f0;
    padding:1px 10px;
    margin-bottom:5px;
    box-shadow:1px 1px 10px 0px #AAA;

    `;

const NameStyled = styled.span`
    font-weight:bold;
    color:#7367f0;
`;

const TotalStyled = styled.span`
    font-size:20px;
    color:#ea5455;
`;

const DolarTextStyle = styled.span`
    font-size:10px;
    margin-left:0.5rem;
    color:#969696;
`;

const ProductStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding-bottom:0.5rem;
    border-bottom:1px solid #eee;  
    font-size:12px;
    width:90%;
    margin-bottom:0.2rem;

`;

const ProductListStyled = styled.div`
    min-height:300px;
    border-left:1px solid #eee;
    padding-left:2rem;

`;

const ControlButton = styled.div`
    text-align:end;
`;

function ComfirmOrder(props) {
    const { order, isVisible, setIsVisible } = props;
    const dispatch = useDispatch()

    //handle update bill
    const onUpdate = async (data, successMessage) => {
        try {
            await BillApi.update(order._id, data);
            message.success(successMessage);
            setIsVisible(false);
            dispatch(fetchBills());
        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message)
        }
    }

    const handleComfirm = () => {
        const data = {
            status: "Shipping"
        }
        onUpdate(data, "Comfirm order successfully!");
    }
    const handleCancelOrder = () => {
        const data = {
            status: "Canceled"
        }
        onUpdate(data, "Canceled order successfully!");
    }

    return (
        <div>
            <Modal
                width={800}
                title="Handle Order"
                visible={isVisible}
                footer={false}
                onCancel={() => setIsVisible(false)}
            >
                <WrapperStyled>
                    <Row justify="space-around">
                        <Col span={10}>
                            <div>

                                <TitleStyled>Order Infomation</TitleStyled>
                                <InfoStyled>
                                    <TitleInfo>Uid:</TitleInfo>
                                    <ContentStyled>{order.uid}</ContentStyled>
                                </InfoStyled>
                                <InfoStyled>
                                    <TitleInfo>Name:</TitleInfo>
                                    <ContentStyled>
                                        <NameStyled>
                                            {order.receiver}
                                        </NameStyled>
                                    </ContentStyled>
                                </InfoStyled>
                                <InfoStyled>
                                    <TitleInfo>Phone:</TitleInfo>
                                    <ContentStyled>{order.phoneReceiver}</ContentStyled>
                                </InfoStyled>
                                <InfoStyled>
                                    <TitleInfo>Address:</TitleInfo>
                                    <ContentStyled>{order.address}</ContentStyled>
                                </InfoStyled>
                                <br />
                                <InfoStyled>
                                    <TitleInfo>Order Id:</TitleInfo>
                                    <ContentStyled>{order._id}</ContentStyled>
                                </InfoStyled>
                                <InfoStyled>
                                    <TitleInfo>Create at:</TitleInfo>
                                    <ContentStyled>{moment(order.createAt).format("DD/MM/YYYY HH:mm A")}</ContentStyled>
                                </InfoStyled>
                                <InfoStyled>
                                    <TitleInfo>Pay status:</TitleInfo>

                                    <ContentStyled>
                                        {order.pay ? <PayStatus>paid</PayStatus> : <NotPayStatus>not paid</NotPayStatus>}
                                    </ContentStyled>
                                </InfoStyled>
                                {
                                    order.pay && <InfoStyled>
                                        <TitleInfo>Tradding code:</TitleInfo>
                                        <ContentStyled>
                                            <TraddingCodeStyled>{order.traddingCode}</TraddingCodeStyled>
                                        </ContentStyled>
                                    </InfoStyled>
                                }
                                <br />

                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <TitleStyled>Products</TitleStyled>
                                <ProductListStyled>
                                    {
                                        order.products?.map(product => <ProductStyled key={product._id} >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                width="40px"
                                                height="50px" />
                                            <span>{product.name}</span>
                                            <span>x{product.quantity}</span>
                                            <span>{product.subTotal} <DolarIconStyled style={{ fontSize: 10 }} /></span>
                                        </ProductStyled>)
                                    }

                                    <br />
                                    <InfoStyled>
                                        <TitleInfo>Total:</TitleInfo>
                                        <ContentStyled>
                                            <TotalStyled>{order.totalPrice}</TotalStyled><DolarTextStyle>dolars</DolarTextStyle>
                                        </ContentStyled>
                                    </InfoStyled>
                                </ProductListStyled>

                            </div>

                        </Col>
                    </Row>
                    <br />
                    <ControlButton>
                        <Popconfirm
                            title="Are you sure to cancel this order ?"
                            onConfirm={handleCancelOrder}>
                            <CancelButton>Cancel order</CancelButton>
                        </Popconfirm>
                        <AddButton onClick={handleComfirm}>Comfirm order</AddButton>
                    </ControlButton>
                </WrapperStyled>
            </Modal>
        </div >
    );
}

export default ComfirmOrder;