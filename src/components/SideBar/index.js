import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { DashboardOutlined, ReadOutlined, ShopOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { LOGO } from '../../constants/Global';
import { Link } from 'react-router-dom';

SideBar.propTypes = {

};

const SideBarStyled = styled.div`
    height:100vh;
    background-color:#FFF;
    margin-right:3rem;
    padding:2rem 1.5rem;
    position:fixed;
    width:270px;
    box-shadow:1px 1px 20px 1px #EEE;
    `;

const LogoStyled = styled.div`
    margin-bottom:3rem;
`;

const MenuItemStyled = styled(Menu.Item)`

    border-radius: 5px;
    font-size:15px;
    color: #6e6b7b;
    transition: all .3s;
`;

const MenuStyled = styled(Menu)`
    border-right:none;

    .ant-menu-item-selected {
        background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));
        color: #fff !important;
        box-shadow: 0 0 10px 1px rgb(115 103 240);

        a { 
            color: #fff!important;
        } 
    }

    .ant-menu-item-active{
        color: #6e6b7b!important;
        transform:translate(2%);
    }
`;

const LinkStyled = styled(Link)`
    transition:all .3s;
    color: #6e6b7b!important;
`;

function SideBar(props) {
    return (
        <SideBarStyled>
            <Link to="/dashboard">
                <LogoStyled>
                    <img
                        width="100px"
                        height="30px"
                        src={LOGO}
                        alt="logo" />
                </LogoStyled>
            </Link>
            <MenuStyled>
                <MenuItemStyled
                    icon={<DashboardOutlined />}>
                    <LinkStyled to="/dashboard">
                        Dashboard
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled icon={<ReadOutlined />}>
                    <LinkStyled to="product">
                        Product
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled icon={<ShopOutlined />}>
                    <LinkStyled to="/category">
                        Category
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled icon={<WalletOutlined />}>
                    <LinkStyled to="/bill">
                        Bill
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled icon={<UserOutlined />}>
                    <LinkStyled to="/user">
                        User
                    </LinkStyled>
                </MenuItemStyled>
            </MenuStyled>
        </SideBarStyled>
    );
}

export default SideBar;