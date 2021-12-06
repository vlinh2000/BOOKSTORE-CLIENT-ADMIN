import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { DashboardOutlined, DatabaseOutlined, FileOutlined, FileProtectOutlined, ReadOutlined, ShopOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { LOGO } from '../../constants/Global';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

SideBar.propTypes = {

};

const SideBarStyled = styled.div`
    height:100vh;
    background-color:#FFF;
    margin-right:3rem;
    padding:2rem 1.5rem;
    position:fixed;
    width:270px;
    box-shadow:1px 1px 20px 10px #DDD;
    `;

const LogoStyled = styled.div`
    margin-bottom:3rem;
`;

const MenuItemStyled = styled(Menu.Item)`

    border-radius: 5px;
    font-size:16px;
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

    const match = useRouteMatch();

    const location = useLocation()

    return (
        <SideBarStyled>
            <Link to="/home/dashboard">
                <LogoStyled>
                    <img
                        width="100px"
                        height="30px"
                        src={LOGO}
                        alt="logo" />
                </LogoStyled>
            </Link>
            <MenuStyled
                selectedKeys={location.pathname.split("/").pop()}
            >
                <MenuItemStyled
                    key="dashboard"
                    icon={<DashboardOutlined />}>
                    <LinkStyled to="/home/dashboard">
                        Dashboard
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled
                    key="product"
                    icon={<ReadOutlined />}>
                    <LinkStyled to="/home/product">
                        Product
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled
                    key="category"
                    icon={<DatabaseOutlined />}>
                    <LinkStyled to="/home/category">
                        Category
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled
                    key="bill"
                    icon={<FileProtectOutlined />}>
                    <LinkStyled to="/home/bill">
                        Bill
                    </LinkStyled>
                </MenuItemStyled>
                <MenuItemStyled
                    key="user"
                    icon={<UserOutlined />}>
                    <LinkStyled to="/home/user">
                        User
                    </LinkStyled>
                </MenuItemStyled>
            </MenuStyled>
        </SideBarStyled>
    );
}

export default SideBar;