import React from 'react'
import { Form, Input, message } from "antd"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import "../styles/LoginStyles.css"

const Login = () => {
  const navigate = useNavigate()
  // form handler
  const dispatch = useDispatch()

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      window.location.reload()
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success("Login Successfully")
        navigate('/')
      }
      else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("Invalid Id or password")
    }
  }

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h3>Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className='m-2'>Not a user sign up here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login