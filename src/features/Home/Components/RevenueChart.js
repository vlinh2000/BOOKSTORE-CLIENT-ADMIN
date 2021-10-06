import React from 'react';
import PropTypes from 'prop-types';
import { REVENUE_DATA, REVENUE_OPTIONS, REVENUE_SERIES } from '../../../constants/Global';
import { Col, Divider, Row, Select } from 'antd'
import styled from 'styled-components';

import Chart from 'react-apexcharts'

RevenueChart.propTypes = {

};

const Wrapper = styled.div``;

const TopStyled = styled.div`
   display:flex;
   justify-content:space-between;
    align-items:center;

   span{
       color:#969696;
       font-size:12px;
   }
`;
const TitleStyled = styled.p`
    color:#6e6b7b;
    font-size:1.15rem;
    font-weight:500;
    letter-spacing:0.5px;
`;

function RevenueChart(props) {
    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Revenue</TitleStyled>
                <Select defaultValue={2021} >
                    <Select.Option key={2019}>2019</Select.Option>
                    <Select.Option key={2020}>2020</Select.Option>
                    <Select.Option key={2021}>2021</Select.Option>
                </Select>
            </TopStyled>
            <div>
                <Chart
                    options={REVENUE_OPTIONS}
                    series={REVENUE_SERIES}
                    type="bar"
                    height="280px"
                />
            </div>

        </Wrapper>
    );
}

export default RevenueChart;