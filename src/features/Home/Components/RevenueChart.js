import React from 'react';
import PropTypes from 'prop-types';
import { REVENUE_DATA, REVENUE_OPTIONS, REVENUE_SERIES } from '../../../constants/Global';
import { Col, Divider, Row, Select } from 'antd'
import styled from 'styled-components';

import { useSelector } from 'react-redux'

import Chart from 'react-apexcharts'
import moment from 'moment';
import { TitleStyled } from 'assets/styles/globalStyled';
import { BillApi } from 'api/BillApi';

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



function RevenueChart(props) {

    const { bills } = useSelector(state => state.home);
    const [revenues, setRevenues] = React.useState([{
        name: 'revenues',
        data: []
    }]);

    const [selectedYear, setSelectedYear] = React.useState(() => moment().format("Y"));

    React.useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const response = await BillApi.get_Revenues(selectedYear);
                setRevenues(prev => [{ ...prev[0], data: response.revenues }])
            } catch (error) {
                console.log(error);
            }
        }

        fetchRevenues();
    }, [bills, selectedYear])

    const handleOnchange = value => {
        setSelectedYear(value);
    }

    return (
        <Wrapper>
            <TopStyled>
                <TitleStyled>Revenue</TitleStyled>
                <Select defaultValue={2021} onChange={handleOnchange}>
                    <Select.Option key={2019}>2019</Select.Option>
                    <Select.Option key={2020}>2020</Select.Option>
                    <Select.Option key={2021}>2021</Select.Option>
                </Select>

            </TopStyled>
            <div style={{ marginTop: "1rem" }}>
                <Chart
                    options={REVENUE_OPTIONS}
                    series={revenues}
                    type="line"
                    height="295px"
                />
            </div>

        </Wrapper>
    );
}

export default RevenueChart;