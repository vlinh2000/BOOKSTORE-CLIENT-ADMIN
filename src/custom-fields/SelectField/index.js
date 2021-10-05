import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Form, Select } from 'antd'
import styled from 'styled-components';
import { FormItemStyled } from 'assets/styles/globalStyled';

SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    name: '',
    label: '',
    options: [],
};

const SelectStyled = styled(Select)`
    .ant-select-selector,input{
        min-height:45px;
        border-radius:4px!important;
    }
`;

function SelectField(props) {
    const { name, label, options, control } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors, } }) => <FormItemStyled
                validateStatus={errors[field.name] && 'error'}
                help={errors[field.name]?.message}
                label={label}>
                <SelectStyled {...field} placeholder={label} >
                    {options.map(option => <Select.Option key={option._id} value={option._id}>{option.categoryName}</Select.Option>)}
                </SelectStyled>
            </FormItemStyled>}
        />
    );
}

export default SelectField;