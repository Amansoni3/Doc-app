import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'


const Doctor = () => {
  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      if (res.data.success) {
        //alert(JSON.stringify(res.data.data))
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (res.data.success) {
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }


  useEffect(() => {
    getDoctors()
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: "Contact Details",
      dataIndex: "email",
      render: (text, record) => (
        <span>{record.email} {record.phone}</span>
      )
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (text, record) => (
        <span>{record.website}</span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span>{record.status}</span>
      )
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      render: (text, record) => <span>{record.specialization}</span>
    },
    {
      title: "Fees for consult",
      dataIndex: "feesForConsultation",
      render: (text, record) => <span>{record.feesForConsultation}</span>
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: (text, record) => <span>{record.experience}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, "approved")}>Approve</button> : <button className='btn btn-danger'>Reject</button>}
        </div>
      )
    },
  ]

  return (
    <Layout>
      <h4 className='p-3'>Doctor List</h4>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )

}

export default Doctor