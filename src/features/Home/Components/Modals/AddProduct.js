import React from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form, Input, Col, Row, Button, Upload, message } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AddButton } from 'assets/styles/globalStyled';
import SelectField from 'custom-fields/SelectField';
import UploadField from 'custom-fields/UploadField';

import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, productSchema } from 'yup/productSchema';
import { makeDefaultValues, toastError, toastSuccess } from 'utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { ProductApi } from 'api/ProductApi';
import { fetchProducts } from 'features/Home/homeSlice';

AddProduct.propTypes = {

};



function AddProduct(props) {

    const { isVisible, setIsVisible, product, isEdit } = props;

    const [defaultValue, setDefaultValue] = React.useState({});

    const [isLoading, setIsLoading] = React.useState(false);

    const [listRemove, setListRemove] = React.useState({ banner: [], images: [] });

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    //handle setValue 
    React.useEffect(() => {
        if (product && isEdit) {
            const defaultValue = {
                name: product.name,
                author: product.author,
                price: product.price,
                quantity: product.stockQuantity,
                category: product.category[0]?._id,
                description: product?.description,
                banner: [product.banner],
                images: product.images
            }
            setDefaultValue(defaultValue);
            reset(defaultValue);
            form.setFieldsValue(defaultValue);
        } else {

            setDefaultValue(defaultValues);
            reset(defaultValues);
            form.setFieldsValue(defaultValues);

        }
    }, [product, isEdit])

    const { control, handleSubmit, reset, formState, setValue } = useForm({ resolver: yupResolver(productSchema), defaultValues });

    const handleAdd = values => {
        const { images, banner } = values;

        let formData = new FormData();

        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("author", values.author);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);

        images.forEach(file => {
            formData.append("images", file.originFileObj);
        })

        banner.forEach(file => {
            formData.append("banner", file.originFileObj);
        })

        const onPost = async (data) => {
            try {
                setIsLoading(true);
                const response = await ProductApi.post(data);
                toastSuccess(response.message);
                setIsLoading(false);
                setIsVisible(false)
                dispatch(fetchProducts());

                setDefaultValue(defaultValues)
                reset(defaultValues);
                form.setFieldsValue(defaultValues);
            } catch (error) {
                const errMessage = error.response.data;
                setIsLoading(false);
                toastError(errMessage.message);
            }
        }


        onPost(formData);
    }


    const handleUpdate = values => {
        const formData = new FormData();

        //handle other fields
        const fieldChange = ["banner", "images"];
        for (let key in formState.touchedFields) {
            fieldChange.push(key);
        }


        //list files have been removed
        let fileRemove = {};
        for (let key in listRemove) {
            if (listRemove[key].length > 0) fileRemove = { ...fileRemove, [key]: listRemove[key] };
        }
        formData.append("fileRemove", JSON.stringify(fileRemove));

        // Get some data change and fill in formData
        fieldChange.forEach(field => {

            if (Array.isArray(values[field])) {
                values[field].forEach(fd => {
                    fd.originFileObj && formData.append(field, fd.originFileObj);
                })
            }
            else {
                formData.append(field, values[field]);
            }
        })
        const onUpdate = async (data) => {
            try {
                setIsLoading(true);
                const response = await ProductApi.update(product._id, data)
                message.success(response.message);
                setIsLoading(false);
                setIsVisible(false)
                dispatch(fetchProducts());
                setListRemove({ banner: [], images: [] })
            } catch (error) {
                const errMessage = error.response.data;
                setIsLoading(false);
                message.error(errMessage.message);
            }
        }

        onUpdate(formData);

    }


    const { categories } = useSelector(state => state.home);

    return (
        <div>
            <Modal
                width={1000}
                title={isEdit ? "Update product" : "New product"}
                visible={isVisible}
                footer={false}
                onCancel={() => { setIsVisible(false); setListRemove({ banner: [], images: [] }) }}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    form={form}
                    onFinish={handleSubmit(isEdit ? handleUpdate : handleAdd)}
                    layout="vertical">
                    <Row justify="space-between">
                        <Col span={8}>
                            <InputField
                                name="name"
                                placeholder="Name"
                                control={control}
                            />
                            <SelectField
                                name="category"
                                label="Category"
                                control={control}
                                options={categories}
                                value={product?.category?._id}
                            />

                            <InputField
                                name="description"
                                placeholder="Description"
                                type="textarea"
                                control={control}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="author"
                                placeholder="Author"
                                control={control}
                            />
                            <InputField
                                name="quantity"
                                placeholder="Quantity"
                                control={control}
                                type="number"
                            />
                            <UploadField
                                name="banner"
                                label="Banner Image"
                                control={control}
                                options={defaultValue.banner}
                                maxCount={1}
                                listType="picture-card"
                                setListRemove={setListRemove}
                                setValue={setValue}
                            />
                        </Col>
                        <Col span={6}>
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
                                maxCount={3}
                                options={defaultValue.images}
                                listType="picture-card"
                                setListRemove={setListRemove}
                                setValue={setValue}
                            />
                        </Col>
                    </Row>
                    <AddButton
                        loading={isLoading}
                        htmlType="submit"
                        icon={<PlusSquareOutlined />}>
                        {isEdit ? "Update" : "Add"}
                    </AddButton>
                </Form>
            </Modal>
        </div >
    );
}

export default AddProduct;