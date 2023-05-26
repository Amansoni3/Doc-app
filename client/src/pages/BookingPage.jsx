import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment/moment'

const BookingPage = () => {
    const [doctor, setDoctor] = useState([])
    const [date, setDate] = useState()
    const [timing, setTiming] = useState()
    const [isAvailable, setIsAvailable] = useState()
    const params = useParams()

    // Login user data
    const getDoctorData = async () => {
        try {
            const res = await axios.post("/api/v1/doctor/getDoctorById", {
                doctorId: params.doctorId
            }, {
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
            <h3 className='text-center'>Booking Page</h3>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <h4>Dr.{doctor.firstName} {doctor.lastName}</h4>
                        <h4>Fees : {doctor.feesForConsultation}</h4>
                        <h4>Timing :{doctor.timings}</h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker className='m-2' format="DD-MM-YYYY"
                                onChange={(value) => setDate(moment(value).format('DD-MM-YYYY'))}
                            />
                            <TimePicker className='m-2' format={"HH:mm"}
                                onChange={(values) => setTiming([
                                    moment(values[0]).format("HH:mm"),
                                    moment(values[1]).format("HH:mm"),
                                ])}
                            />
                            <button className='btn btn-primary'>
                                Check Availability
                            </button>
                            <button className='btn btn-dark mt-2'>
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage