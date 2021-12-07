import React from 'react';
import PropTypes from 'prop-types';
import { Button, message, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TableStyled, TitleStyled, TopStyled, Wrapper, OrangeText, GreenText, BackgroundText } from 'assets/styles/globalStyled';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { BillApi } from 'api/BillApi';
import { fetchBills } from '../homeSlice';

BillPage.propTypes = {

};

const ExpandTableStyled = styled(Table)`
    .ant-table-content{
        border:1px solid #ff6085!important;
        margin:1rem 0;
    }

    th{
        background-color:#ff6085!important;
        color:#FFF!important;
    }
    th,td{
        padding:0.5rem 0.75rem!important;
        text-align:center!important;
        font-size:13px!important;
        font-weight:500;
}


`;

function BillPage(props) {
    const { bills } = useSelector(state => state.home);

    const [billSelected, setBillSelected] = React.useState({});
    const dispatch = useDispatch()

    const handleRemove = async orderId => {
        try {
            const response = await BillApi.delete(orderId);
            message.success(response.message);
            dispatch(fetchBills());
        } catch (error) {
            const errorMessage = error.response?.data;
            message.error(errorMessage.message);
        }
    }

    const expandedRowRender = () => {
        const columns = [
            { title: 'Image', dataIndex: 'image', key: 'image', render: text => <img src={text} alt="image" width="40px" height="50px" /> },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            { title: 'SubTotal', dataIndex: 'subTotal', key: 'subTotal' },
        ];

        const data = billSelected.products.map(product => ({
            key: product._id,
            image: product.image,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            subTotal: product.subTotal
        }))
        return <ExpandTableStyled columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Order date', dataIndex: 'orderDate', key: 'orderDate' },
        { title: 'Received', dataIndex: 'receivedDate', key: 'receivedDate' },
        { title: 'Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => { return text === "Shipping" ? <BackgroundText color="#ff9f43">{text}</BackgroundText> : <BackgroundText color="#04AA6D">{text}</BackgroundText> } },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record) => <>
                <Tooltip title="Delete">
                    <Popconfirm
                        onConfirm={() => handleRemove(record.key)}
                        title="Are you sure?"
                        okText="Yes"
                        cancelText="No">

                        <RemoveButtonStyled
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => bills?.map((bill, index) => ({
        key: bill._id,
        index: index + 1,
        name: bill.receiver,
        phone: bill.phoneReceiver,
        address: bill.address,
        receivedDate: moment(bill.receivedDate).format("DD/MM/YYYY"),
        orderDate: moment(bill.deliveryDate).format("DD/MM/YYYY"),
        totalPrice: bill.totalPrice,
        status: bill.status
    })), [bills])

    const onExpand = (expanded, record) => {
        //expanded : true / false
        if (!expanded) return;

        const currentBill = bills.find(bill => bill._id === record.key);
        setBillSelected(currentBill);
    }

    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Bills</TitleStyled>

            </TopStyled>
            <TableStyled
                bordered
                pagination={{ defaultPageSize: 5 }}
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
                onExpand={onExpand}
            />
        </Wrapper>
    );
}


export default BillPage;