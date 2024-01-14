import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../signup/Signup.css'
import { Button, Stack } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../../Url';
import Loader from '../../Loader';
import toast from 'react-hot-toast';


function Signup() {
    const [email, setemail] = useState("")
    const [password,setpassword]=useState("")
    const [firstname,setfirstname]=useState("")
    const [lastname,setlastname]=useState("")
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()
    const params=useParams()
    
  

    const handlesignup = async (e) => {
        try {
            e.preventDefault()
            setloader(true)
            let res = await axios.post(`${Url.API_URL}/signup`, { email, password, firstname, lastname })
            if (res.status == 200) {
                console.log(res.data)
                navigate('/login')
                toast.success(res.data.message)
                setloader(false)
                localStorage.setItem("token",res.data.token)
            }
            
        } catch (error) {
            if (error.response.status == 400) {
                toast.error(error.response.data.message)
                setloader(false)
            }
            if (error.response.status == 500) {
                toast.error("please fill all the field")
                setloader(false)
            }
        }
       
    }




   

    return (

      <div className='signup_box'>
            <div className='signup_innerbox'>

            <h1 className='signup_title'>Signup</h1>

 <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '42ch' },
      }}
      noValidate
          autoComplete="off"
                  display={'flex'}
                  flexDirection={"column"}
                    alignItems={"center"}
                  justifyContent={"center"}
                >   
                  <TextField id="outlined-basic" label="Firstname" variant="outlined" type='text' onChange={(e)=>setfirstname(e.target.value)} className='field'/>
                  <TextField id="outlined-basic" label="Lastname" variant="outlined" type='text' onChange={(e)=>setlastname(e.target.value)} className='field'/>
                  <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e)=>setemail(e.target.value)} className='field'/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e)=>setpassword(e.target.value)} className='field'/>
                    
                    <Stack spacing={2}>
                        <Button variant='contained' className='signup_button' onClick={handlesignup}>{loader?<Loader/>:"Signup"}</Button>
                    </Stack>
                    <p className='signup_link'>Already have an account? &nbsp;<Link to={'/login'}>Login</Link></p>

    </Box>
          </div>
   
    </div>
  )
}

export default Signup
