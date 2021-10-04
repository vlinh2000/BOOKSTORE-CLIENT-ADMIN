import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Button, Popover, Breadcrumb, Badge } from 'antd';

import styled from 'styled-components';

import { BellOutlined, BookOutlined, LogoutOutlined, NotificationOutlined, ReadOutlined, SearchOutlined, ShopOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

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
    return (
        <HeaderStyled>
            <div>
                <Link to="/product">
                    <ButtonStyled
                        size="large"
                        shape="circle"
                        type="text"
                        icon={<ReadOutlined />} />
                </Link>
                <Link to="/category">
                    <ButtonStyled
                        size="large"
                        shape="circle"
                        type="text"
                        icon={<ShopOutlined />} />
                </Link>
                <Link to="/bill">
                    <ButtonStyled
                        size="large"
                        shape="circle"
                        type="text"
                        icon={<WalletOutlined />} />
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