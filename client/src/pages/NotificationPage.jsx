import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NotificationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/v1/user/get-all-notification",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            }
            else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong.')
        }
    }
    // delete notification
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            }
            else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong.')
        }
    }

    return (
        <Layout>
            <h4 className='p-3 text-center'>Notifications</h4>
            <Tabs className='p-3'>
                <Tabs.TabPane tab="UnRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h5 className='p-4' style={{ cursor: "pointer" }} onClick={handleMarkAllRead}>Mark all read</h5>
                    </div>
                    {
                        user?.notification.map(item => (
                            <div className="card" style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {item.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h5 className='p-4 text-primary' style={{ cursor: "pointer" }} onClick={handleDeleteAllRead}>Delete all read</h5>
                    </div>
                    {
                        user?.seennotification.map(item => (
                            <div className="card" style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {item.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage