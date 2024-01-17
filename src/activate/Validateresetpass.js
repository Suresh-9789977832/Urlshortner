import React, { useEffect } from 'react'
import Loader from '../Loader'
import { useNavigate, useParams } from 'react-router-dom'
import Url from '../Url'
import toast from 'react-hot-toast'
import axios from 'axios'


function Confirmuser() {

    const navigate=useNavigate()
    const params = useParams()
    
    
    const activate = async () => {
        try {
            let token=params.id
             await axios.patch(`${Url.API_URL}/confirmuser/${token}`)
            toast.success("Account confirmed Successfully")
            setTimeout(() => {
                navigate('/')
            },2000)
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                console.log(error)
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

export default Confirmuser
