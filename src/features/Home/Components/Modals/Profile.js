import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Avatar, Col, Row } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { AddButton, AddButtonStyled, RemoveButtonStyled } from 'assets/styles/globalStyled';

import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import UploadField from 'custom-fields/UploadField';

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

    const { isVisible, setIsVisible } = props;

    const { control, handleSubmit } = useForm();

    const [currentAvatar, setCurrentAvatar] = React.useState("https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-11.14cf1734.jpg");

    const handleReadFile = url => {
        setCurrentAvatar(url);
    }

    const onSubmit = values => {
        alert(JSON.stringify(values));
    }
    return (
        <div>
            <Modal
                width={700}
                title="Account Settings"
                visible={true}
                footer={false}
                onCancel={() => setIsVisible(false)}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
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
                        icon={<SaveOutlined />}>
                        Save changes
                    </AddButton>
                </Form>
            </Modal>
        </div>
    );
}

export default Profile;