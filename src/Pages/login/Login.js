import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import Url from '../../Url';
import Loader from '../../Loader';
import toast from 'react-hot-toast';


function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  const [loader, setloader] = useState(false)
  const navigate=useNavigate()


  const handlelogin = async () => {
    try {
      setloader(true)
      let res = await axios.post(`${Url.API_URL}/login`, { email, password })
      if (res.status == 200) {
      setloader(false)
      navigate('/urlshortner')
      toast.success('login successfull')
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast.error(error.response.data.message)
        setloader(false)
      }
      if (error.response.status == 400) {
        toast.error(error.response.data.message)
        setloader(false)
    }
    }
    
  }
  


    return <>
      <div className='login_box'>
            <div className='login_innerbox'>

            <h1 className='login_title'>Login</h1>

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

                  <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e)=>setemail(e.target.value)} className='field'/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e)=>setpassword(e.target.value)} className='field'/>
                    
                    <Stack spacing={2}>
                    <Button variant='contained' className='login_button' onClick={handlelogin}>{loader?<Loader/>:"Login"}</Button>
                    </Stack><br/>
                    <p className='login_forgotlink'> <Link to={'/forgot'}>Forgotten your password? &nbsp;</Link></p>
                    <p className='login_link'>Dont't have an account? &nbsp;<Link to={'/'}>Signup</Link></p>

    </Box>
          </div>
   
    </div>
    </>
}

export default Login
