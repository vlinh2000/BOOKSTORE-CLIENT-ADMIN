import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Avatar, Col, Row, message } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, SaveOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { AddButton, AddButtonStyled, RemoveButtonStyled, ResetButton, resetButton } from 'assets/styles/globalStyled';

import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import UploadField from 'custom-fields/UploadField';
import { profileSchema } from 'yup/profileSchema';
import { checkChangeValue, saveAble } from 'utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { switchProfile } from 'features/Home/homeSlice';
import { UserApi } from 'api/UserApi';
import { getMe } from 'features/Authentication/authSlice';

Profile.propTypes = {

};

const TopProfile = styled.div`
    display:flex;
    margin-bottom:2rem;

    p{
        font-size:13px;
        margin-top:0.5rem;
        color:#6e6b7b;
    }
`;

const AvatarStyled = styled(Avatar)`
    width:80px;
    height:80px;
    line-height:80px;
    border-radius:5px;
    margin-right:2rem;
    font-size:2rem;
`;

const UploadStyled = styled.div`
    button {
            height:30px!important;
            width:30px;
            background-color:#7367f0;
            border-color:#7367f0;
            color:#EEE;

            &:hover{
                background-color:#7367f0;
                border-color:#7367f0;
                color:#EEE;
                box-shadow:0px 8px 25px -8px #7367f0;

            }
        }

    .ant-upload-list-item-info,.ant-upload-list{
        display:none;
    }

`;

function Profile(props) {

    const { isVisibleProfile } = useSelector(state => state.home);

    const { user } = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();

    const defaultValues = React.useMemo(() => ({
        avatar: user.avatar ? [user.avatar] : [],
        name: user.name,
        address: user.address,
        phone: user.phoneNumber,
        email: user.email,
    }), [user]);

    const { control, handleSubmit, reset, formState: { touchedFields } } = useForm({ resolver: yupResolver(profileSchema), defaultValues });

    const [currentAvatar, setCurrentAvatar] = React.useState(() => defaultValues.avatar[0]);

    const [form] = Form.useForm();

    const handleReadFile = url => {
        setCurrentAvatar(url);
    }

    const onReset = () => {
        //handle reset of react hook form
        reset();
        //handle reset avatar
        setCurrentAvatar(defaultValues.avatar[0])
        //handle reset of form antd
        form.resetFields();
    }

    const onSubmit = values => {

        // alert(JSON.stringify(values));
        // return;
        const fieldUpdate = [];

        for (let key in touchedFields) {
            if (key !== undefined) fieldUpdate.push(key);
        }

        const formData = new FormData();

        //handle  field
        fieldUpdate.forEach(field => {
            formData.append(field, typeof values[field] !== "string" ? values[field][0].originFileObj : values[field])
        })

        const onPost = async (data) => {
            try {
                const response = await UserApi.update(user._id, data);
                message.success(response.message);
                dispatch(switchProfile(false));
                dispatch(getMe());
            } catch (error) {
                const errorMessage = error.response.data;
                message.error(errorMessage.message)
            }
        }

        onPost(formData);
    }

    const onCancel = () => {
        dispatch(switchProfile(false));
        onReset();
    }
    return (
        <div>
            <Modal
                width={700}
                title="Account Settings"
                visible={isVisibleProfile}
                footer={false}
                onCancel={onCancel}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    initialValues={defaultValues}
                    form={form}
                    onFinish={handleSubmit(onSubmit)}
                    layout="vertical">
                    <TopProfile>
                        <AvatarStyled src={currentAvatar} alt="avatar">A</AvatarStyled>
                        <div>
                            <UploadStyled>
                                <UploadField
                                    handleReadFile={handleReadFile}
                                    maxCount={1}
                                    name="avatar"
                                    control={control} />
                            </UploadStyled>
                            <p>Allow JPGE or PNG . Max size of 800kB</p>
                        </div>
                    </TopProfile>
                    <Row justify="space-between">
                        <Col span={11}>
                            <InputField
                                name="name"
                                placeholder="Name"
                                control={control}
                            />
                            <InputField
                                name="phone"
                                placeholder="Phone"
                                control={control}
                            />
                        </Col>
                        <Col span={11}>

                            <InputField
                                name="address"
                                placeholder="Address"
                                control={control}
                            />
                            <InputField
                                name="email"
                                placeholder="Email"
                                control={control}
                            />
                        </Col>
                    </Row>
                    <AddButton
                        htmlType="submit"
                        disabled={(Object.keys(touchedFields).length < 1)}
                        icon={<SaveOutlined />}>
                        Save changes
                    </AddButton>
                    <ResetButton
                        onClick={onReset}
                        disabled={(Object.keys(touchedFields).length < 1)}
                        icon={<UndoOutlined />}>
                        Reset
                    </ResetButton>
                </Form>
            </Modal>
        </div >
    );
}

export default Profile;