import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Button, Popover, Breadcrumb, Badge, Tooltip } from 'antd';

import styled from 'styled-components';

import { BellOutlined, BookOutlined, LogoutOutlined, NotificationOutlined, ReadOutlined, SearchOutlined, ShopOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { switchProfile } from 'features/Home/homeSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0.5rem 2rem;
    background:#FFF;
    margin-top:1.5rem;
    margin-right:2rem;
    border-radius:10px;
    align-items:center;
    box-shadow: 1px 1px 3px 0px #CCC;
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
    color:#888;
    margin:0 0.5rem;


`;

const PopoverStyled = styled(Popover)`
    cursor:pointer;
    display:flex;
`;

const ModalUserInfo = styled.div`
`;

const ButtonStyled = styled(Button)`
    color:#888;
`;
Header.propTypes = {

};



function Header(props) {

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = React.useState(false);

    const handleVisibleChange = visible => {
        setIsVisible(visible);
    };

    const handleOpenProfile = () => {
        setIsVisible(false);
        dispatch(switchProfile(true));
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
                            icon={<ShopOutlined />} />
                    </Tooltip>
                </Link>
                <Link to="/home/bill">
                    <Tooltip title="Bill">
                        <ButtonStyled
                            size="large"
                            shape="circle"
                            type="text"
                            icon={<WalletOutlined />} />
                    </Tooltip>
                </Link>

            </div>
            <MenuRightStyled>
                <ButtonStyled
                    size="large"
                    shape="circle"
                    type="text"
                    icon={<SearchOutlined />} />
                <ButtonStyled
                    size="large"
                    shape="circle"
                    type="text"
                    icon={
                        <Badge
                            dot
                            size="small">
                            <BellOutlined />
                        </Badge>} >
                </ButtonStyled>

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
                                icon={<LogoutOutlined />}>
                                Logout
                            </Button>
                        </ModalUserInfo>
                    }
                    visible={isVisible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click" >

                    <UserInfo>
                        <span>John Dong</span>
                        <div style={{ color: "#AAA", textAlign: 'end', fontSize: 10 }} >admin</div>
                    </UserInfo>

                    <Avatar src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png" size="large">L</Avatar>
                </PopoverStyled>
            </MenuRightStyled>
        </HeaderStyled>
    );
}

export default Header;