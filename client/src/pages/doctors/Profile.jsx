import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'


const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()

    //get doc details
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo', { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setDoctor(res.data.data)
            }
        } catch (error) {
            message.error('Something went wrong')
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorInfo()
        //eslint-disable-next-line
    }, [])

    const handleUpdate = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/doctor/updateDoctorInfo', { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error("Something went wrong")
            console.log(error)
        }
    }

    return (
        <Layout>
            <h4 className='d-flex justify-content-center p-4'>Doctor Profile</h4>
            {doctor && (
                <Form layout='vertical' onFinish={handleUpdate} className='m-4' initialValues={doctor}>
                    <h4 className=''>Personal Details</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='First Name' name="firstName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Last Name' name="lastName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Last Name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Phone Number' name="phone" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Phone Number' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Email' name="email" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Email' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Website' name="website">
                                <Input type='text' placeholder='Website' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Address' name="address" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Address' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4 className=''>Professional Details</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Specialization' name="specialization" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Specialization' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Experience' name="experience" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Experience' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Fees' name="feesForConsultation" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Fees' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Timings' name="timings" required rules={[{ required: true }]}>
                                {doctor.timings}
                                {/* <TimePicker.RangePicker format='HH:mm' /> */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <button className='btn btn-primary form-btn' type='submit'>Update Profile</button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Layout>
    )
}

export default Profile