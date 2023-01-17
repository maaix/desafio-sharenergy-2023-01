import React, { useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios"

// import { toast, ToastContainer } from 'react-toastify';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(()=> {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const {data} = await axios.post(
          "http://localhost:3333",
          {},
          {withCredentials: true},
        );
        if (!data.status){
          removeCookie("jwt");
          navigate("/login");
        }
      };
    };
    verifyUser();
  }, [cookies,navigate, removeCookie]);
  const logOut = () => {
      removeCookie("jwt");
      navigate("/login");
  };

  return (
    <>
      <div className='navbar'>
       <h1>SHANERGY</h1>
        
        <nav className="nav">
          <button className=" btn btn-outline-secondary nav-btn "><Link className='link' to='/'>User API</Link ></button>
          <button className="btn btn-outline-secondary nav-btn" ><Link className='link' to='/http_status'>Http Status</Link></button>
          <button className="btn btn-outline-secondary nav-btn"><Link className='link' to='/random_dog'>Random Dog</Link></button>
          <button className="btn btn-outline-secondary nav-btn"><Link  className='link' to='/customer'>Customers</Link></button>
        </nav>
        
      
        <button className='btn-log-out' onClick={logOut}>Log Out</button>
      </div>
    </>
  );
}