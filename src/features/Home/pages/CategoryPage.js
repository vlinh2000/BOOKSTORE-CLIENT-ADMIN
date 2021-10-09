import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import AddCategory from '../Components/Modals/AddCategory';
import { useSelector } from 'react-redux';

CategoryPage.propTypes = {

};


function CategoryPage(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    const { categories } = useSelector(state => state.home)

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record) => <>
                <Tooltip title="Edit">
                    <EditButtonStyled
                        shape="circle"
                        icon={<EditOutlined />} />
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => categories.map((category, index) => ({ key: category._id, index: index + 1, name: category.categoryName })), [categories]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Wrapper>
            <AddCategory isVisible={isVisible} setIsVisible={setIsVisible} />
            <TopStyled>
                <TitleStyled>Categories</TitleStyled>
                <div>
                    <Tooltip title="Add product">
                        <AddButtonStyled
                            onClick={() => setIsVisible(true)}
                            shape="circle"
                            icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="Remove these products">
                        <Popconfirm
                            title="Are you sure?"
                            okText="Yes"
                            cancelText="No">

                            <RemoveButtonStyled
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </div>

            </TopStyled>
            <Table
                bordered
                rowSelection={rowSelection}
                pagination={{ defaultPageSize: 6 }}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    );
}

export default CategoryPage;