import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from '../../assets/styles/globalStyled';

BillPage.propTypes = {

};


function BillPage(props) {

    const [currentBill, setCurrentBill] = React.useState(0);

    const expandedRowRender = () => {
        const columns = [
            { title: 'Image', dataIndex: 'image', key: 'image' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: '#', dataIndex: '_id', key: '_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Order date', dataIndex: 'orderDate', key: 'orderDate' },
        { title: 'Delivery date', dataIndex: 'deliveryDate', key: 'deliveryDate' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: <SettingOutlined />, key: 'action', render: () => <>
                <Tooltip title="Edit">
                    <EditButtonStyled
                        shape="circle"
                        icon={<EditOutlined />} />
                </Tooltip>
            </>
        },
    ];

    const data = [
        {
            key: 0, name: "Trương Việt Linh"
        },
        { key: 1, name: "Trương Việt Linh", },
        { key: 2, name: "Trương Việt Linh", },
        { key: 3, name: "Trương Việt Linh", },
        { key: 4, name: "Trương Việt Linh", },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const onExpand = (expanded, record) => {
        console.log(record);
    }

    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Bills</TitleStyled>
                <div>
                    <Tooltip title="Remove these products">
                        <Popconfirm
                            title="Are you sure?"
                            okText="Yes"
                            cancelText="No">

                            <RemoveButtonStyled
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </div>

            </TopStyled>
            <Table
                bordered
                rowSelection={rowSelection}
                pagination={{ defaultPageSize: 6 }}
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
                onExpand={onExpand}
            />
        </Wrapper>
    );
}


export default BillPage;