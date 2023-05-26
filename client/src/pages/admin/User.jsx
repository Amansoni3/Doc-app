import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'


const Users = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllUser",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            if (res.data.success) {
                //alert(JSON.stringify(res.data.data))
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Doctor",
            dataIndex:"isDoctor",
            render:(text,record) => <span>{record.isDoctor ? "Yes" : "No"}</span>
        },
        {
            title:"Actions",
            dataIndex:"actions",
            render:(text, record)=>(
                <div className="d-flex">
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
    ]

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Layout>
            <h4 className='p-3'>User List</h4>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users