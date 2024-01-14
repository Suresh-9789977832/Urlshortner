import React, { useEffect, useState } from 'react'
import './Shorturl.css'
import axios from 'axios'
import Url from '../../Url'
import { Link, redirect } from 'react-router-dom'
import toast from 'react-hot-toast'
import useClipboard from 'react-use-clipboard'

function Shorturl({ store }) {







    return <>
    
        <div className='shorturl_wrapper'>
            <div className='shorturl_left'>
                <p>{store.redirectURL.slice(1,43)}...</p>
            </div>

            <div className='shorturl_right'>
                <Link to={store.redirectURL} target='blank'><p style={{ color: "#4070F4" }} >{store.shortid}</p></Link>
            
                <p className='copy'>Copy</p>
            </div>
       </div>
    </> 
}

export default Shorturl
