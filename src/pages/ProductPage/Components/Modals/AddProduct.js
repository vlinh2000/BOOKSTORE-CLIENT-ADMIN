import React from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form, Input, Col, Row, Button, Upload } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AddButton } from '../../../../assets/styles/globalStyled';

AddProduct.propTypes = {

};

const UploadStyled = styled(Upload)`
    .ant-upload-list{
        max-height:100px;
        overflow-y:auto;
        padding:0 1rem;
    }

`;

function AddProduct(props) {

    const { isVisible, setIsVisible } = props;

    const { control, handleSubmit } = useForm();



    const onSubmit = values => {
        alert(JSON.stringify(values));
    }
    return (
        <div>
            <Modal
                width={700}
                title="Add product"
                visible={isVisible}
                footer={false}
                onCancel={() => setIsVisible(false)}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    onFinish={handleSubmit(onSubmit)}
                    layout="vertical">
                    <Row justify="space-between">
                        <Col span="6">
                            <InputField
                                name="name"
                                placeholder="Name"
                                control={control}
                            />
                            <InputField
                                name="stockQuantity"
                                placeholder="Quantity"
                                control={control}
                                type="number"
                            />
                            <InputField
                                name="decription"
                                placeholder="Description"
                                type="textarea"
                                control={control}
                            />
                        </Col>
                        <Col span="6">
                            <InputField
                                name="author"
                                placeholder="Author"
                                control={control}
                            />
                            <Form.Item label="Category">
                                <Select defaultValue={1}>
                                    <Select.Option value={1}>1</Select.Option>
                                    <Select.Option value={2}>2</Select.Option>
                                </Select>
                            </Form.Item>
                            <InputField
                                name="price"
                                placeholder="Price"
                                control={control}
                                type="number"
                            />
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Banner Image">
                                <UploadStyled >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </UploadStyled>
                            </Form.Item>
                            <Form.Item label="Images Detail">
                                <UploadStyled >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </UploadStyled>
                            </Form.Item>
                        </Col>
                    </Row>
                    <AddButton
                        htmlType="submit"
                        icon={<PlusSquareOutlined />}>
                        Add
                    </AddButton>
                </Form>
            </Modal>
        </div>
    );
}

export default AddProduct;