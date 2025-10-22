import { getProductsAPI } from "@/services/api"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Space, Table, type TableProps } from "antd"
import { useEffect, useState } from "react"

const ProductTable = () => {
    const [data, setData] = useState<{ count: number, products: IProduct[], pageSize: number }>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductsAPI(currentPage, 5, false)
            setData(res.data)
        }
        fetchProducts()
    }, [currentPage])
    const columns: TableProps<IProduct>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "orange", cursor: "pointer" }} />
                    <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                </Space>
            ),
        },
    ];


    return (
        <div style={{ margin: "10px" }}>
            <h3>Table User</h3>
            <Table
                dataSource={data?.products}
                columns={columns}
                rowKey="id"
                pagination={{
                    position: ["bottomCenter"],
                    total: data?.count,
                    current: currentPage,
                    onChange: (pageNumber) => {
                        setCurrentPage(pageNumber)
                    }
                }} />
        </div>
    )

}

export default ProductTable