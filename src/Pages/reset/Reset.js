import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../../Url';
import toast from 'react-hot-toast';
import Loader from '../../Loader';
import './Reset.css'


function Reset() {


    const [password, setpassword] = useState("")
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()
    const params=useParams()
    
    const handlereset = async () => {
        try {
            const id = params.id
            const token=params.token
            console.log(id,token)
            setloader(true)
            setpassword("")
        const res = await axios.post(`${Url.API_URL}/reset/${token}/${id}`, { password })
      if (res.status === 200) {
        setloader(false)
          toast.success(res.data.message)
          navigate('/login')
      }
      } catch (error) {
        if (error.response.status == 400) { 
            toast.error(error.response.data.message)
            setloader(false)
            }
            if (error.response.status == 500) { 
                toast.error(error.response.data.message)
                setloader(false)
            }
            console.log(error)
            
      }
      
    }
  
  


    return <>
                    <div className='reset_box'>
            <div className='reset_innerbox'>

            <h1 className='reset_title'>Reset Password</h1>

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
                  <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e)=>setpassword(e.target.value)} value={password} className='field'/>
                    <Stack spacing={2}>
                    <Button variant='contained' className='reset_button' onClick={handlereset}>{loader?<Loader/>:"Update password"}</Button>
                    </Stack><br/>

    </Box>
          </div>
   
    </div>
    </>
}

export default Reset
