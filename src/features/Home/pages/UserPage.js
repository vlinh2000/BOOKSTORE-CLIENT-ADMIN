import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from '../../assets/styles/globalStyled';

UserPage.propTypes = {

};


function UserPage(props) {

    const columns = [
        { title: '#', dataIndex: '_id', key: '_id' },
        { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Permission', dataIndex: 'permission', key: 'permission' },
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
        { key: 0, name: "Trương Việt Linh", },
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

    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Users</TitleStyled>
                <div>
                    <Tooltip title="Remove these users">
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
                dataSource={data}
            />
        </Wrapper>
    );
}


export default UserPage;