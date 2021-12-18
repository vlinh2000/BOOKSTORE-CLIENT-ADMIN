import React from 'react';
import { message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddButtonStyled, EditButtonStyled, RemoveButtonStyled, TableStyled, TitleStyled, TopStyled, Wrapper } from 'assets/styles/globalStyled';
import AddProduct from '../Components/Modals/AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { ProductApi } from 'api/ProductApi';
import { fetchProducts } from '../homeSlice';



function ProductPage(props) {

    const [isVisible, setIsVisible] = React.useState(false);

    const { products } = useSelector(state => state.home);

    const [isEdit, setIsEdit] = React.useState(false);

    const [currentProductSelected, setCurrentProductSelected] = React.useState(null);

    const dispatch = useDispatch();

    const filters = React.useMemo(() => {
        return products.map(product => ({ text: product.name, value: product.name }));
    }, [products])



    //handle edit product
    const handleEdit = productId => {
        const product = products.find(book => book._id === productId);
        setIsVisible(true);
        setIsEdit(true);
        setCurrentProductSelected(product);
    }

    //handle remove product
    const handleRemove = async productId => {

        console.log(productId);
        try {
            const response = await ProductApi.delete(productId);
            message.success(response.message);
            dispatch(fetchProducts());

        } catch (error) {
            const errMessage = error.response.data;
            message.error(errMessage.message);
        }


    }

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
        { title: 'Stock quantity', dataIndex: 'stockQuantity', key: 'stockQuantity', sorter: (a, b) => a.stockQuantity - b.stockQuantity },
        { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
        {
            title: <SettingOutlined />, key: 'action', render: (text, record, index) => <>
                <Tooltip title="Edit">
                    <EditButtonStyled
                        onClick={() => handleEdit(record.key)}
                        shape="circle"
                        icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip title="Delete">
                    <Popconfirm
                        // disabled={selectedRow.length < 1}
                        onConfirm={() => handleRemove(record.key)}
                        title="Are you sure?"
                        okText="Yes"
                        cancelText="No">

                        <RemoveButtonStyled
                            danger
                            // disabled={selectedRow.length < 1}
                            shape="circle"
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </>
        },
    ];

    const data = React.useMemo(() => products?.map((product, index) => {

        return {
            key: product._id, index: index + 1, image: product.banner,
            name: product.name, author: product.author, category: product.category[0].name,
            stockQuantity: product.stockQuantity, price: product.price
        }
    }), [products])

    //handle when add button clicked
    const handleAdd = () => {
        setIsVisible(true)
        setIsEdit(false)
    }

    return (
        <Wrapper>
            <AddProduct
                isEdit={isEdit}
                product={currentProductSelected}
                isVisible={isVisible}
                setIsVisible={setIsVisible} />
            <TopStyled>
                <TitleStyled>Products</TitleStyled>
                <Tooltip title="Add product">
                    <AddButtonStyled
                        onClick={handleAdd}
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

export default ProductPage;