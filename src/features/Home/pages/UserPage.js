import React from 'react';
import { Avatar, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { BackgroundText, RemoveButtonStyled, TableStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { useDispatch, useSelector } from 'react-redux';
import { UserApi } from 'api/UserApi';
import { fetchUsers } from '../homeSlice';



function UserPage(props) {
    const { users } = useSelector(state => state.home);

    const { user } = useSelector(state => state.auth?.currentUser)

    const dispatch = useDispatch()

    const handleRemove = async uid => {
        try {
            const response = await UserApi.delete(uid);
            message.success(response.message)
            dispatch(fetchUsers());
        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
        }
    }

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
            title: <SettingOutlined />, key: 'action', render: (text, record) => <>
                <Tooltip title="Delete">
                    <Popconfirm
                        disabled={record.key === user._id}
                        onConfirm={() => handleRemove(record.key)}
                        title="Are you sure?"
                        okText="Yes"
                        cancelText="No">

                        <RemoveButtonStyled
                            disabled={record.key === user._id}
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => users.map((user, index) => (
        {
            key: user._id, index: index + 1, avatar: user.avatar,
            name: user.name, phone: user.phoneNumber, address: user.address,
            email: user.email, permission: user.key === 0 ? <BackgroundText color="#FFDC00">Admin</BackgroundText> : <BackgroundText color="#01FF70">Customer</BackgroundText>
        }
    )), [users]);




    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Users</TitleStyled>

            </TopStyled>
            <TableStyled
                bordered
                pagination={{ defaultPageSize: 5 }}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    );
}


export default UserPage;