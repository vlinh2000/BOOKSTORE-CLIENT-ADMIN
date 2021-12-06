import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { DollarOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DolarIconStyled, DolarTextStyled } from 'assets/styles/globalStyled';

import moment from "moment";
import ComfirmOrder from './Modals/ComfirmOrder';

BillConfirm.propTypes = {

};

const TableStyled = styled(Table)`
.ant-spin-container{
    position:relative;
    min-height:257px!important;
}

.ant-table table{
    font-size:14px;
    
    th{
        background:#39CCCC;
        color:#FFF;
        font-weight:bold;
    }
    
    td{ 
        font-weight:500;
        color:#222;
        border-bottom:0.1px solid #CCC;
    }

    .ant-table-cell{
          text-align:center;
           padding:7px;
       }
    }
    
    .ant-table-pagination{
        position:absolute!important;
        bottom:0;
        right:0px;
        margin-bottom:8px;
        .ant-pagination-item  ,.ant-pagination-item-link{
            border-radius:20px!important;
        }
    }
`;

const ViewButtonStyled = styled(Button)`
    border: 1px solid #2ECC40;
    color:#2ECC40;
    
    &:hover,&:focus{
        border-color:#001f3f;
        color:#2ECC40;
    }
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
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Create at', dataIndex: 'createAt', key: 'createAt', render: text => moment(text).fromNow() },
        { title: 'Total price', dataIndex: 'totalPrice', key: 'totalPrice', render: text => <> {text} <DolarTextStyled>dolars</DolarTextStyled> </> },
        { title: <SettingOutlined />, key: 'action', render: (text) => <><ViewButtonStyled onClick={() => handleCheckOrder(text.action)}>view</ViewButtonStyled></> },
    ];

    const data = React.useMemo(() => orders.map((order, index) => (
        {
            index: index + 1,
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
                pagination={{ pageSize: 6 }}
            />
        </div>
    );
}

export default BillConfirm;