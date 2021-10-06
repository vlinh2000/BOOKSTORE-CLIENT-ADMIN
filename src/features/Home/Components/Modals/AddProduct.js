import React from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form, Input, Col, Row, Button, Upload } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AddButton } from 'assets/styles/globalStyled';
import SelectField from 'custom-fields/SelectField';
import UploadField from 'custom-fields/UploadField';

import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, productSchema } from 'yup/productSchema';

AddProduct.propTypes = {

};



function AddProduct(props) {

    const { isVisible, setIsVisible } = props;


    const { control, handleSubmit } = useForm({ resolver: yupResolver(productSchema), defaultValues });


    const onSubmit = values => {
        alert(JSON.stringify(values));
    }
    return (
        <div>
            <Modal
                width={700}
                title="New product"
                visible={isVisible}
                footer={false}
                onCancel={() => setIsVisible(false)}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    onFinish={handleSubmit(onSubmit)}
                    layout="vertical">
                    <InputField
                        name="name"
                        placeholder="Name"
                        control={control}
                    />
                    <Row justify="space-between">
                        <Col span="6">
                            <SelectField
                                name="category"
                                label="Category"
                                control={control}
                                options={[{ _id: 'a', categoryName: "test1" }]}
                            />

                            <InputField
                                name="description"
                                placeholder="Description"
                                type="textarea"
                                control={control}
                            />
                        </Col>
                        <Col span="7">
                            <InputField
                                name="author"
                                placeholder="Author"
                                control={control}
                            />
                            <InputField
                                name="stockQuantity"
                                placeholder="Quantity"
                                control={control}
                                type="number"
                            />
                            <UploadField
                                name="banner"
                                label="Banner Image"
                                control={control}
                                maxCount={1}
                            />
                        </Col>
                        <Col span={7}>
                            <InputField
                                name="price"
                                placeholder="Price"
                                control={control}
                                type="number"
                            />

                            <UploadField
                                name="images"
                                label="Images Detail"
                                control={control}
                                maxCount={4}
                            />
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