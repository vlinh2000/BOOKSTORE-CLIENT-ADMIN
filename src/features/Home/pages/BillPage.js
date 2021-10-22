import React from 'react';
import PropTypes from 'prop-types';
import { Button, message, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { BillApi } from 'api/BillApi';
import { fetchBills } from '../homeSlice';

BillPage.propTypes = {

};


const TableStyled = styled(Table)`
.ant-table{
    font-size:12px;
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
            { title: 'Image', dataIndex: 'image', key: 'image', render: text => <img src={text} alt="image" width="30px" height="50px" /> },
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
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Order date', dataIndex: 'orderDate', key: 'orderDate' },
        { title: 'Received date', dataIndex: 'receivedDate', key: 'receivedDate' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record) => <>
                <Tooltip title="Remove these products">
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