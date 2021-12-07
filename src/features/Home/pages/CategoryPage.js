import React from 'react';
import PropTypes from 'prop-types';
import { Button, message, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TableStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import AddCategory from '../Components/Modals/AddCategory';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryApi } from 'api/CategoryApi';
import { fetchCategories } from '../homeSlice';

CategoryPage.propTypes = {

};


function CategoryPage(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    const [isEdit, setIsEdit] = React.useState(false);

    const { categories } = useSelector(state => state.home)

    const [categorySelected, setCategorySelected] = React.useState({});

    const dispatch = useDispatch()

    const handleEdit = categoryId => {
        const category = categories.find(cate => cate._id === categoryId);
        setCategorySelected(category);
        setIsVisible(true);
        setIsEdit(true);
    }

    const handleRemove = async categoryId => {

        try {
            const response = await CategoryApi.delete(categoryId);
            message.success(response.message)
            dispatch(fetchCategories());
        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
        }

    }

    const onAdd = () => {
        setIsEdit(false);
        setIsVisible(true);
    }

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
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

    const data = React.useMemo(() => categories.map((category, index) => ({ key: category._id, index: index + 1, name: category.name })), [categories]);

    return (
        <Wrapper>
            <AddCategory
                isEdit={isEdit}
                category={categorySelected}
                isVisible={isVisible}
                setIsVisible={setIsVisible} />
            <TopStyled>
                <TitleStyled>Categories</TitleStyled>
                <Tooltip title="Add product">
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

export default CategoryPage;