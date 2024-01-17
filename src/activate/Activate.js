import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import Url from '../Url'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../Loader'


function Activate() {
    const navigate=useNavigate()
    const params=useParams()
    const activate = async () => {
        try {
            let token=params.token
            let res = await axios.patch(`${Url.API_URL}/activate/${token}`)
            if (res.status == 200)
                navigate('/login')
                toast.success("Your account is activated")
        } catch (error) {
            if (error.response.status == 500) {
                toast.error("Invalid link try again")
                navigate('/')
           }
        }
    }
    useEffect(() => {
        activate()
    },[])
    

  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
        <Loader/>
    </div>
  )
}

export default Activate
