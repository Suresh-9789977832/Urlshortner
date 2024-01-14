import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Urlshortner.css'
import Shorturl from '../Shorturl/Shorturl'
import axios from 'axios'
import Url from '../../Url'
import toast from 'react-hot-toast'

function Urlshortner() {

  const [store,setstore]=useState('')
  const [url, seturl] = useState("")

  const handleurl = async () => {
    try {
      seturl("")
      let res = await axios.post(`${Url.API_URL}/createshorturl`, { url })
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      if (error.response.status == 400) {
        seturl("")
        toast.error(error.response.data.error)
        console.log(error)
      }
      if (error.response.status == 401) {
        seturl("")
        toast.error(error.response.data.message)
        console.log(error)
    }
    }
  }

  const getallurl = async () => {
    let res = await axios.get(`${Url.API_URL}/`)
    if (res.status === 200) {
      setstore(res.data.getall)
    }
  }

  useEffect(() => {
  getallurl()
  }, [])
  


  return (
    <div className='url'>
      <div className='url_top'>
      <h1>Free URL Shortner</h1>
      <p>Create short & memorable links in seconds</p>
      </div>
      
      <div className='url_input'>
        <input  type='text' placeholder='Enter link here' onChange={(e)=>seturl(e.target.value)} value={url}/>
        <Button variant='contained' style={{backgroundColor:"#2C96DF"}} onClick={handleurl}>ShorTURL</Button>
      </div>

      <div className='shorturl_main'>
        {
          (store.length===0)?"":
          store.map((e, i) => (
            <Shorturl store={e}  key={i}/>
          ))
        }
        </div>

    </div>
  )
}

export default Urlshortner
