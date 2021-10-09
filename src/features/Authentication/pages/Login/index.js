import React from 'react';
import { Wrapper } from 'assets/styles/globalStyled';
import styled from 'styled-components';
import { LOGO } from 'constants/Global';

import { Button, Form } from 'antd'
import InputField from 'custom-fields/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, defaultValues } from 'yup/loginSchema';
import { getMe, login } from 'features/Authentication/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSuccess } from 'utils/common';
import { history } from 'App';


const LoginStyled = styled.div`
    width:400px;
    margin:0 auto;
    padding-top:5rem;
    color:#6e6b7b;
`;

const ButtonStyled = styled(Button)`
    background-color:#7367f0;
    color:#DDD;
    font-weight:500;
    height:45px;
    border-radius:4px;
    margin-top:2rem;
    
    &:hover,&:focus{
        color:#EEE;
        background-color:#7367f0;
        border-color:#7367f0;
        box-shadow:1px 8px 25px -8px #7367f0;
    }


`;

const HeaderLoginStyled = styled.div`
    margin-bottom:1rem;    
    div{
        text-align:center;
        margin-bottom:1.5rem;
    }

    p{
        font-size:1.2rem;
    }

    span{
        font-styled:italic;
        letter-spacing:0.5px;
        font-size:13px;
    }
`;

function Login(props) {
    const { handleSubmit, control } = useForm({ resolver: yupResolver(loginSchema), defaultValues });

    const { isLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const onSubmit = values => {

        const handleLogin = async () => {

            const { error, payload: { message } } = await dispatch(login(values));

            if (error) {
                toastError(message);
                return;
            }

            await dispatch(getMe());
            history.push("/");
            toastSuccess("Welcome back !", "HI");
        }
        handleLogin();
    }

    return (
        <LoginStyled>
            <Wrapper style={{ padding: "2rem 2rem 4rem 2rem", borderRadius: 3 }}>
                <HeaderLoginStyled>
                    <div>
                        <img width="120px" height="30px" src={LOGO} alt="logo" />
                    </div>
                    <p>Welcome to Tikie! 👋 </p>
                    <span>Please sign-in to your account and start the adventure</span>
                </HeaderLoginStyled>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    <InputField
                        name="userName"
                        control={control}
                        placeholder="User name"
                    />
                    <InputField
                        name="passWord"
                        control={control}
                        placeholder="Pass word"
                        type="password"
                    />
                    <ButtonStyled
                        loading={isLoading}
                        block
                        htmlType="submit">Sign in</ButtonStyled>
                </Form>

            </Wrapper>
        </LoginStyled>
    );
}

export default Login;