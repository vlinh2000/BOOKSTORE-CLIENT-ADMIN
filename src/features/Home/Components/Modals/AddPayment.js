import React from 'react';
import { Modal, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import InputField from '../../../../custom-fields/InputField';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AddButton } from 'assets/styles/globalStyled';

import { defaultValues } from 'yup/categorySchema';
import { useDispatch } from 'react-redux';
import { fetchPayments } from 'features/Home/homeSlice';
import UploadField from 'custom-fields/UploadField';
import { PaymentApi } from 'api/PaymentApi';


function AddPayment(props) {

    const { isVisible, setIsVisible, payment, isEdit } = props;

    const { control, handleSubmit, reset, setValue, formState: { touchedFields } } = useForm();

    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch()


    const [form] = Form.useForm();


    React.useEffect(() => {
        if (payment && isEdit) {
            console.log({ payment, isEdit });
            console.log(true);
            const initialValues = {
                holder: payment.holder,
                accountNumber: payment.accountNumber,
                paymentType: payment.paymentLogo
            }
            console.log(initialValues);
            form.setFieldsValue(initialValues)
            reset(initialValues)

        } else {
            console.log(false);
            form.setFieldsValue({
                holder: '',
                accountNumber: '',
                paymentType: ''
            })
            reset({
                holder: '',
                accountNumber: '',
                paymentType: ''
            })
        }


    }, [payment, isEdit]);

    const handleAdd = async values => {

        try {
            setIsLoading(true);

            const data = new FormData();
            data.append("holder", values.holder);
            data.append("accountNumber", values.accountNumber);
            data.append("paymentLogo", values.paymentType[0].originFileObj);

            const response = await PaymentApi.post(data);

            message.success(response.message);
            setIsVisible(false);
            setIsLoading(false);
            dispatch(fetchPayments());

            reset();
            form.resetFields();

        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
            setIsLoading(false);
        }
    }

    const handleUpdate = async values => {
        try {
            //handle other fields
            let fieldUpdate = values.paymentType[0].originFileObj ? { paymentLogo: values.paymentType[0].originFileObj } : {};

            for (let key in touchedFields) {
                fieldUpdate = { ...fieldUpdate, [key]: values[key] }
            }

            if (Object.keys(fieldUpdate).length < 1) {
                message.warning("No infomation change");
                return;
            }

            const data = new FormData();

            for (let key in fieldUpdate) {
                data.append(key, fieldUpdate[key]);
            }

            setIsLoading(true);
            const response = await PaymentApi.update(payment._id, data);

            message.success(response.message);
            setIsVisible(false);
            setIsLoading(false);
            dispatch(fetchPayments());

        } catch (error) {
            console.log(error)
            const errMessage = error.response.data;
            message.error(errMessage.message);
            setIsLoading(false);
        }
    }


    return (
        <div>
            <Modal
                width={700}
                title={isEdit ? "Update payment" : "New payment"}
                visible={isVisible}
                footer={false}
                onCancel={() => setIsVisible(false)}
                bodyStyle={{ padding: '2rem 3rem' }}>
                <Form
                    initialValues={defaultValues}
                    form={form}
                    onFinish={handleSubmit(isEdit ? handleUpdate : handleAdd)}
                    layout="vertical">
                    {/* {currentPay &&
                        <img src={currentPay} alt='payment' />
                    } */}
                    <p>Payment logo</p>
                    <UploadField
                        name="paymentType"
                        placeholder="Payment Type"
                        control={control}
                        listType="picture-card"
                        setValue={setValue}
                        maxCount={1}
                        options={isEdit && [payment.paymentLogo]}
                    />
                    <InputField
                        name="holder"
                        placeholder="Holder"
                        control={control}
                    />
                    <InputField
                        name="accountNumber"
                        placeholder="Account Number"
                        control={control}
                    />
                    <AddButton
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

export default AddPayment;