import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import { Controller } from 'react-hook-form'
import styled from 'styled-components';
import { FormItemStyled } from 'assets/styles/globalStyled';

InputField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

InputField.defaultProps = {
    name: '',
    value: '',
    type: 'text',
    disabled: false,
    placeholder: ''
};



const InputStyled = styled(Input)`
    min-height:45px;
    border-radius:5px;
`;

function InputField(props) {

    const { name, type, disabled, placeholder, control } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {

                return < FormItemStyled
                    validateStatus={errors[field.name] && 'error'}
                    help={errors[field.name]?.message}
                    name={field.name}
                    label={placeholder}>
                    {
                        type === 'textarea' ?
                            <InputStyled.TextArea
                                {...field}
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                allowClear
                                disabled={disabled}
                                type={type}
                                placeholder={placeholder} />
                            :
                            <InputStyled
                                {...field}
                                allowClear
                                disabled={disabled}
                                type={type}
                                placeholder={placeholder} />
                    }


                </FormItemStyled>
            }
            }
        >


        </Controller >
    );
}

export default InputField;