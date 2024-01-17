import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Forgot.css'
import axios from 'axios';
import Url from '../../Url';
import toast from 'react-hot-toast';
import Loader from '../../Loader';

function Forgot() {

  const [email, setemail] = useState("")
  const [loader, setloader] = useState(false)
  const navigate=useNavigate()
  
  const handleforgot = async () => {
    try {
      setloader(true)
      setemail("")
      const res = await axios.put(`${Url.API_URL}/forgotpassword`, { email })
    if (res.status === 200) {
      setloader(false)
      toast.success('Link send your mail')
    }
    } catch (error) {
      if (error.response.status == 400) { 
        setloader(false)
        toast.error(error.response.data.message)
        console.log(error)
      }
    }
    
  }



    return <>
            <div className='forgot_box'>
            <div className='forgot_innerbox'>

            <h1 className='forgot_title'>Forgot Password</h1>

 <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '42ch' },
      }}
      noValidate
          autoComplete="off"
          className='field'
                  display={'flex'}
                  flexDirection={"column"}
                    alignItems={"center"}
                  justifyContent={"center"}
                >   
                  <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e)=>setemail(e.target.value)} value={email} className='field'/>
                    <Stack spacing={2}>
                    <Button variant='contained' className='forgot_button' onClick={handleforgot}>{loader?<Loader/>:"send login link"}</Button>
                    </Stack><br/>

    </Box>
          </div>
   
    </div>
    </>
}

export default Forgot
