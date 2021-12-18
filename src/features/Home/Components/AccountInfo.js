import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from 'antd';

AccountInfo.propTypes = {
    info: PropTypes.object
};


const AccountInfoStyled = styled.div`
    min-height:200px;
    min-width:400px;
    padding:0.5rem 1rem;


`;

const ItemStyled = styled.div`
    border-bottom:1px solid #EEE;
    margin-bottom:0.5rem;
`;
const TitleStyled = styled.span`
    font-size:12px;
    display:inline-block;
    font-style:italic;
    min-width:60px;
    color:#555;
    vertical-align:top;
`;
const ContentStyled = styled.span`
    display:inline-block;
    font-size:13px;
    font-weight:500;
    color:#0074D9;
    max-width:100%;
    word-wrap:break-word;
`;

const TableStyled = styled.table`
    text-align:center;
    width:100%;

    th{
        background:#FFDC00; 
        font-size:12px;
        padding:0.5rem 0.75rem;
    }
    
    td{
        font-size:12px;
        padding:0.5rem 0.75rem;

    }

`;

const Hstyled = styled.h3`
    font-size:15px;
    text-align:center;
    padding:0;
    color:#ff9f43;
    margin-bottom:1rem;
`;

function AccountInfo(props) {
    const { info: { accountInfo, receivers, _id } } = props;
    return (
        <AccountInfoStyled>
            <div style={{ marginBottom: '2rem' }}>
                <Hstyled>Account Infomation</Hstyled>
                <div>
                    <Avatar size="large" src={accountInfo[0].avatar} style={{ marginLeft: "1rem", marginBottom: '1rem' }} />
                    <ItemStyled> <TitleStyled>Uid :</TitleStyled> <ContentStyled>{_id}</ContentStyled> </ItemStyled>
                    <ItemStyled> <TitleStyled>Name :</TitleStyled> <ContentStyled>{accountInfo[0].name}</ContentStyled> </ItemStyled>
                    <ItemStyled> <TitleStyled>Phone :</TitleStyled> <ContentStyled>{accountInfo[0].phoneNumber}</ContentStyled> </ItemStyled>
                    <ItemStyled> <TitleStyled>Address :</TitleStyled> <ContentStyled>{accountInfo[0].address}</ContentStyled> </ItemStyled>
                </div>
            </div>
            <div>
                <Hstyled>Bill Infomation</Hstyled>
                <TableStyled>
                    <thead>
                        <tr>
                            <th>Receiver's name</th>
                            <th>Receiver's phone</th>
                            <th>Bills</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            receivers.map((receiver, index) =>
                                <tr>
                                    <td>{receiver.name}</td>
                                    <td>{receiver.phone}</td>
                                    <td>{receiver.bought}</td>
                                    <td>{receiver.totalSubPrice}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </TableStyled>
            </div>
        </AccountInfoStyled>
    );
}

export default AccountInfo;