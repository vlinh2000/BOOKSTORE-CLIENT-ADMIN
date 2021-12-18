import React from 'react';
import { Modal, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AddButton } from 'assets/styles/globalStyled';

import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema, defaultValues } from 'yup/categorySchema';
import { CategoryApi } from 'api/CategoryApi';
import { useDispatch } from 'react-redux';
import { fetchCategories } from 'features/Home/homeSlice';



function AddCategory(props) {

    const { isVisible, setIsVisible, category, isEdit } = props;

    const { control, handleSubmit, reset, formState: { touchedFields } } = useForm({ resolver: yupResolver(categorySchema), defaultValues });

    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch()

    const [form] = Form.useForm();


    React.useEffect(() => {
        if (category && isEdit) {

            const initialValues = {
                name: category.name
            }
            form.setFieldsValue(initialValues)
            reset(initialValues)

        } else {
            form.setFieldsValue(defaultValues)
            reset(defaultValues)
        }


    }, [category, isEdit]);

    const handleAdd = async values => {

        try {
            setIsLoading(true);
            const response = await CategoryApi.post(values);

            message.success(response.message);
            setIsVisible(false);
            setIsLoading(false);
            dispatch(fetchCategories());

        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
            setIsLoading(false);
        }
    }

    const handleUpdate = async values => {
        try {
            console.log(values)
            setIsLoading(true);
            const response = await CategoryApi.update(category._id, values);

            message.success(response.message);
            setIsVisible(false);
            setIsLoading(false);
            dispatch(fetchCategories());

        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
            setIsLoading(false);
        }
    }


    return (
        <div>
            <Modal
                width={700}
                title={isEdit ? "Update Category" : "New Category"}
                visible={isVisible}
                footer={false}
                onCancel={() => setIsVisible(false)}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    initialValues={defaultValues}
                    form={form}
                    onFinish={handleSubmit(isEdit ? handleUpdate : handleAdd)}
                    layout="vertical">
                    <InputField
                        name="name"
                        placeholder="Name"
                        control={control}
                    />
                    <AddButton
                        disabled={isEdit ? Object.keys(touchedFields).length < 1 : false}
                        htmlType="submit"
                        loading={isLoading}
                        icon={<PlusSquareOutlined />}>
                        {isEdit ? "Update" : "Add"}
                    </AddButton>
                </Form>
            </Modal>
        </div>
    );
}

export default AddCategory;