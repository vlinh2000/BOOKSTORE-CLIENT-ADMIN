import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { DollarOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DolarIconStyled } from 'assets/styles/globalStyled';

import moment from "moment";
import ComfirmOrder from './Modals/ComfirmOrder';

BillConfirm.propTypes = {

};

const TableStyled = styled(Table)`
    min-height:257px!important;

    .ant-table table{
        font-size:10px;
        // min-height:200px!important;

       & .ant-table-cell{
           padding:7px;
       }
    }
    
    .ant-table-pagination{
        font-size:10px!important;
        position:absolute;
        bottom:-200px;
        right:0px;
        margin-bottom:8px;
        .ant-pagination-item  ,.ant-pagination-item-link{
            border-radius:20px!important;
        }
    }
`;

const EyeIconStyled = styled(EyeOutlined)`
    cursor:pointer;
    color:#7367f0;
    padding: 2px 3px;
    font-size:13px;
`;


function BillConfirm(props) {

    const { orders } = props;

    const [orderSelected, setOrderSelected] = React.useState({});

    const [isVisible, setIsVisible] = React.useState(false);

    const handleCheckOrder = orderId => {
        const order = orders.find(order => order._id === orderId);
        setOrderSelected(order);
        setIsVisible(true)
    }

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Create at', dataIndex: 'createAt', key: 'createAt', render: text => moment(text).fromNow() },
        { title: 'Total price', dataIndex: 'totalPrice', key: 'totalPrice', render: text => <> {text} <DolarIconStyled /> </> },
        { title: <SettingOutlined />, key: 'action', render: (text) => <><EyeIconStyled onClick={() => handleCheckOrder(text.action)} /></> },
    ];

    const data = React.useMemo(() => orders.map(order => (
        {
            name: order.receiver,
            createAt: order.createAt,
            totalPrice: order.totalPrice,
            action: order._id
        }
    )), [orders])



    return (
        <div>
            <ComfirmOrder
                order={orderSelected}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
            <TableStyled
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 3 }}
            />
        </div>
    );
}

export default BillConfirm;