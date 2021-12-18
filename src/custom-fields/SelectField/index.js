import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Select } from 'antd'
import styled from 'styled-components';
import { FormItemStyled } from 'assets/styles/globalStyled';

SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string
};

SelectField.defaultProps = {
    name: '',
    label: '',
    options: [],
    value: ''
};

const SelectStyled = styled(Select)`
    .ant-select-selector,input{
        min-height:45px;
        border-radius:4px!important;
    }
`;

function SelectField(props) {
    const { name, label, options, control, value } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors, } }) => <FormItemStyled
                validateStatus={errors[field.name] && 'error'}
                help={errors[field.name]?.message}
                label={label}>
                <SelectStyled {...field} placeholder={label} defaultValue={value}>
                    {options.map(option => <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>)}
                </SelectStyled>
            </FormItemStyled>}
        />
    );
}

export default SelectField;