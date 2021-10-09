import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { useSelector } from 'react-redux';

UserPage.propTypes = {

};


function UserPage(props) {
    const { users } = useSelector(state => state.home);

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        {
            title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render(text, record) {
                return (
                    <Avatar src={text} alt="avatar" > {!text && record.name?.charAt(0)?.toUpperCase()} </Avatar>
                )
            }
        },
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

    const data = React.useMemo(() => users.map((user, index) => (
        {
            key: user._id, index: index + 1, avatar: user.avatar,
            name: user.name, phone: user.phoneNumber, address: user.address,
            email: user.email, permission: user.key === 0 ? "admin" : "customer"
        }
    )), [users]);

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
                pagination={{ defaultPageSize: 5 }}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    );
}


export default UserPage;