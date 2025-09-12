import { useEffect, useState } from "react";
import { getUsersAPI } from "../../services/api";
import { Space, Table, Tag } from "antd";
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";




const User = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const accessToken = localStorage.getItem("accessToken")
            const res = await getUsersAPI(accessToken!)
            setData(res.data)
        }
        fetchUsers()
    }, [])





    const columns: TableProps['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
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
            <Table dataSource={data} columns={columns} />;
        </div>
    )
}

export default User;