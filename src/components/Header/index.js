import React from 'react';
import { Avatar, Button, Popover, Tooltip } from 'antd';

import styled from 'styled-components';

import { DatabaseOutlined, FileProtectOutlined, LogoutOutlined, ReadOutlined, UserOutlined, } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { switchProfile } from 'features/Home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'features/Authentication/authSlice';

const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0.5rem 2rem;
    background:#FFF;
    border:1px solid #0074D9;
    margin-top:1.5rem;
    margin-right:2rem;
    border-radius:10px;
    align-items:center;
    position:fixed;
    width:75%;
    z-index:1000;
    `;

const MenuRightStyled = styled.div`
    display:flex;
    align-items:center;
    `;

const UserInfo = styled.div`

    font-size:13px;
    letter-spacing:0.5px;
    font-weight:bold;
    color:#555;
    margin:0 0.5rem;


`;

const PopoverStyled = styled(Popover)`
    cursor:pointer;
    display:flex;
`;

const ModalUserInfo = styled.div`
`;

const ButtonStyled = styled(Button)`
    color:#555;
`;
Header.propTypes = {

};



function Header(props) {

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = React.useState(false);

    const { user } = useSelector(state => state.auth.currentUser);

    const handleVisibleChange = visible => {
        setIsVisible(visible);
    };

    const handleOpenProfile = () => {
        setIsVisible(false);
        dispatch(switchProfile(true));
    }

    const handleLogout = () => {
        dispatch(logOut());
    }

    return (
        <HeaderStyled>
            <div>
                <Link to="/home/product">
                    <Tooltip title="Product">
                        <ButtonStyled
                            size="large"
                            shape="circle"
                            type="text"
                            icon={<ReadOutlined />} />
                    </Tooltip>
                </Link>
                <Link to="/home/category">
                    <Tooltip title="Category">
                        <ButtonStyled
                            size="large"
                            shape="circle"
                            type="text"
                            icon={<DatabaseOutlined />} />
                    </Tooltip>
                </Link>
                <Link to="/home/bill">
                    <Tooltip title="Bill">
                        <ButtonStyled
                            size="large"
                            shape="circle"
                            type="text"
                            icon={<FileProtectOutlined />} />
                    </Tooltip>
                </Link>
                <Link to="/home/user">
                    <Tooltip title="Users">
                        <ButtonStyled
                            size="large"
                            shape="circle"
                            type="text"
                            icon={<UserOutlined />} />
                    </Tooltip>
                </Link>

            </div>
            <MenuRightStyled>

                <PopoverStyled
                    content={
                        <ModalUserInfo>
                            <div>
                                <Button
                                    onClick={handleOpenProfile}
                                    style={{ textAlign: 'start' }}
                                    type="text"
                                    icon={<UserOutlined />}>
                                    Profile
                                </Button>
                            </div>
                            <Button
                                style={{ textAlign: 'start' }}
                                type="text"
                                onClick={handleLogout}
                                icon={<LogoutOutlined />}>
                                Logout
                            </Button>
                        </ModalUserInfo>
                    }
                    visible={isVisible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click" >

                    <UserInfo>
                        <span>{user.name}</span>
                        <div style={{ color: "#FFDC00", textAlign: 'end', fontSize: 10 }} >admin</div>
                    </UserInfo>

                    <Avatar src={user.avatar}>L</Avatar>
                </PopoverStyled>
            </MenuRightStyled>
        </HeaderStyled>
    );
}

export default Header;