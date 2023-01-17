import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import './HttpStatus.css'


// import './Users.css';

export default function HttpStatus() {
    const navigate = useNavigate();
    const [cookies,  setCookie, removeCookie] = useCookies([]);
    const [statusCode,setStatusCode] = useState("");
    const [imgUrl,setImgUrl] = useState("");
    const [ img, setImg ] = useState();
   
    
    const fetchHttpCode = async(e) => { 
        e.preventDefault();
        setImgUrl(`https://http.cat/${statusCode}`)
    }

    useEffect(() => {
      if (!!statusCode) {
        setImgUrl("")
      }
    }, [statusCode])
  

    return (

      <div className='http-status-container'>
        <Navbar />
        <div className="http-content">
          <form onSubmit={(e) => fetchHttpCode(e)}>
            <label htmlFor='email'>Email</label>
            <input  
              type='number' 
              name='httpCode' 
              placeholder='Http Code'
              onChange={(e) => setStatusCode(e.target.value)}
            >

            </input>
            <button type='submit'>Submit</button>
          </form>
          
          {
            !imgUrl || !statusCode? 
              <p>Coloca um status code ai</p>
            :
              <img alt="sim" src={imgUrl}/>
          }
          
        </div>
      
      </div>
    );

}