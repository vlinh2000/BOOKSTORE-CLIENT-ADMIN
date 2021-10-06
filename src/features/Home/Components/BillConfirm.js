import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

BillConfirm.propTypes = {

};

function BillConfirm(props) {
    const columns = [
        { title: '#', dataIndex: '_id', key: '_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone ', dataIndex: 'phone', key: 'phone' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: () => <span>Chờ xác nhận</span> },
        { title: 'Create at', dataIndex: 'createAt', key: 'createAt' },
        { title: 'Total price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: <SettingOutlined />, key: 'action', render: () => <><Button type="primary">Xác nhận</Button> <Button danger>Hủy</Button> </> },
    ];

    const data = [
        { _id: 0, name: "Trương Việt Linh", phone: "0387746557", status: "" }


    ];



    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}

export default BillConfirm;