import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import '../httpstatus/HttpStatus.css'
import axios from "axios"
export default function RandomDog(){

    const navigate = useNavigate();
    const [imgUrl,setImgUrl] = useState("");

    const fetchHttpCode = async(e) => { 
        e.preventDefault();
        const {data} = await axios.get("https://random.dog/woof?include=jpeg");
        setImgUrl(data)
    }

    return (
      <div className='http-status-container'>
        <Navbar />
        <div className="http-content">
          
            <button 
                type='submit'
                onClick={(e) => fetchHttpCode(e)}
            >
                Refresh
            </button>

            {
                imgUrl?
                <img src={`https://random.dog/${imgUrl}`} alt="" />
                : null
            }
            
        </div>
      
      </div>
    );
}