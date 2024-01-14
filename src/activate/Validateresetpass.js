import React, { useEffect } from 'react'
import Loader from '../Loader'
import { useNavigate, useParams } from 'react-router-dom'
import Url from '../Url'
import toast from 'react-hot-toast'
import axios from 'axios'


function Validateresetpass() {

    const navigate=useNavigate()
    const params=useParams()
    const activate = async () => {
        try {
            let token = params.token
            let id=params.id
            let res = await axios.get(`${Url.API_URL}/getresetpassword/${token}/${id}`)
            if (res.status == 200)
                window.location.replace(`http://localhost:3000/reset/${token}/${id}`)
        } catch (error) {
            if (error.response.status == 500) {
                toast.error("Invalid link try again")
                navigate('/')
            }
            if (error.response.status == 400) {
                toast.error(error.response.data.message)
                navigate('/')
            }
            
        }
    }
    useEffect(() => {
        activate()
    },[])
    

  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <Loader/>
    </div>
  )
}

export default Validateresetpass
