import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import AddProduct from '../Components/Modals/AddProduct';
import { useSelector } from 'react-redux';

ProductPage.propTypes = {

};


function ProductPage(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    const { products } = useSelector(state => state.home);

    const [selectedRow, setSelectedRow] = React.useState([]);

    const filters = React.useMemo(() => {
        return products.map(product => ({ text: product.name, value: product.name }));
    }, [products])

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index' },
        {
            title: 'Image', dataIndex: 'image', key: 'image',
            render: (text) => <><img src={text} alt="book" width="40px" height="50px" /> </>
        },
        {
            title: 'Name', dataIndex: 'name', key: 'name', filters, onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
        { title: 'Author ', dataIndex: 'author', key: 'author' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Stock quantity', dataIndex: 'stockQuantity', key: 'stockQuantity', sorter: (a, b) => a - b },
        { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a - b },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record, index) => <>
                <Tooltip title="Edit">
                    <EditButtonStyled
                        onClick={() => alert(JSON.stringify({ text, record, index }))}
                        shape="circle"
                        icon={<EditOutlined />} />
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => products.map((product, index) => {

        return {
            key: product._id, index: index + 1, image: product.image[0],
            name: product.name, author: product.author, category: product.categoryId,
            stockQuantity: product.stockQuantity, price: product.price
        }
    }), [products])


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows);

        }    // },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    return (
        <Wrapper>
            <AddProduct isVisible={isVisible} setIsVisible={setIsVisible} />
            <TopStyled>
                <TitleStyled>Products</TitleStyled>
                <div>
                    <Tooltip title="Add product">
                        <AddButtonStyled
                            onClick={() => setIsVisible(true)}
                            shape="circle"
                            icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="Remove these products">
                        <Popconfirm
                            disabled={selectedRow.length < 1}
                            title="Are you sure?"
                            okText="Yes"
                            cancelText="No">

                            <RemoveButtonStyled
                                danger
                                disabled={selectedRow.length < 1}
                                shape="circle"
                                icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </div>

            </TopStyled>
            <Table
                bordered
                rowSelection={rowSelection}
                pagination={{ defaultPageSize: 4 }}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    );
}

export default ProductPage;