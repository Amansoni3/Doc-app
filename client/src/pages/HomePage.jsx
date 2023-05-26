import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'

const HomePage = () => {

  const [doctor, setDoctor] = useState([])

  // Login user data
  const getDoctorData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctor", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      if (res.data.success) {
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctorData()
  }, [])

  return (
    <Layout>
      <h3 className='d-flex justify-content-center p-4'>Home Page</h3>
      <Row>
        {doctor && doctor.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  )
}

export default HomePage