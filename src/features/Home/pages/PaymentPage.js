import React from 'react';
import { message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TableStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../homeSlice';
import AddPayment from '../Components/Modals/AddPayment';
import { PaymentApi } from 'api/PaymentApi';

PaymentPage.propTypes = {

};


function PaymentPage(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    const [isEdit, setIsEdit] = React.useState(false);

    const { payments } = useSelector(state => state.home)

    const [paymentSelected, setPaymentSelected] = React.useState({});


    const dispatch = useDispatch()

    const handleEdit = paymentId => {
        const payment = payments.find(payment => payment._id === paymentId);
        setPaymentSelected(payment);
        setIsVisible(true);
        setIsEdit(true);
    }

    const handleRemove = async paymentId => {
        try {
            const response = await PaymentApi.delete(paymentId);
            message.success(response.message)
            dispatch(fetchPayments());
        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
        }
    }

    const onAdd = () => {
        setIsEdit(false);
        setIsVisible(true);
        setPaymentSelected({})
    }

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Type', dataIndex: 'type', key: 'type', render: (text) => <img width={70} height={50} src={text} alt="type" /> },
        { title: 'Holder', dataIndex: 'holder', key: 'holder' },
        { title: 'Account number', dataIndex: 'accountNumber', key: 'accountNumber' },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record) => <>
                <Tooltip title="Edit">
                    <EditButtonStyled
                        onClick={() => handleEdit(record.key)}
                        shape="circle"
                        icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip
                    title="Delete">
                    <Popconfirm

                        onConfirm={() => handleRemove(record.key)}
                        title="Are you sure?"
                        okText="Yes"
                        cancelText="No">

                        <RemoveButtonStyled
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => payments?.map((payment, index) => (
        {
            key: payment._id,
            index: index + 1,
            type: payment.paymentLogo,
            holder: payment.holder,
            accountNumber: payment.accountNumber
        })), [payments]);

    return (
        <Wrapper>
            <AddPayment
                isEdit={isEdit}
                payment={paymentSelected}
                isVisible={isVisible}
                setIsVisible={setIsVisible} />
            <TopStyled>
                <TitleStyled>Payments</TitleStyled>
                <Tooltip title="Add payment">
                    <AddButtonStyled
                        onClick={onAdd}
                        shape="circle"
                        icon={<PlusOutlined />} />
                </Tooltip>


            </TopStyled>
            <TableStyled
                bordered
                pagination={{ defaultPageSize: 5 }}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    );
}

export default PaymentPage;