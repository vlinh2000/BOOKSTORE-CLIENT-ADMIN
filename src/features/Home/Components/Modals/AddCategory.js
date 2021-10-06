import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import { AddButton } from 'assets/styles/globalStyled';

import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema, defaultValues } from 'yup/categorySchema';

AddCategory.propTypes = {

};



function AddCategory(props) {

    const { isVisible, setIsVisible } = props;

    const { control, handleSubmit } = useForm({ resolver: yupResolver(categorySchema), defaultValues });

    const onSubmit = values => {
        alert(JSON.stringify(values));
    }
    return (
        <div>
            <Modal
                width={700}
                title="New Category"
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

export default AddCategory;