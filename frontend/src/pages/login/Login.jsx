import React, {useState}from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
      email: "",
      password: "",
  })
  const generateError = (err) =>
      toast.error(err, {
          position: 'bottom-right',   
      })
  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          const {data} = await axios.post("http://localhost:3333/auth/login",{
            ...values,
          },{
              withCredentials: true,
          });
          console.log(data);
          if (data) {
              if(data.errors){
                  const {email,password} = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
              }else{
                  navigate("/");
              }
          }
      } catch(err){
          console.log(err);
      }
  }
    return (
        <div className="login-wrapper ">
            <div className="login-aside shadow">
                <h1 className='login-tile'>SHARENERGY</h1>
            </div>
            <div className='login-container shadow '>
            <img src="https://www.sharenergy.com.br/wp-content/uploads/2017/05/logo_color.min-01-01.png" alt="" />

                <h2 className='login-title'>Login Account</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input  
                            className='login-input'
                            type='text' 
                            name='email' 
                            placeholder='Email'
                            onChange={(e)=>
                                setValues({...values,[e.target.name]: e.target.value})
                            }>

                        </input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            className='login-input'
                            type='password' 
                            name='password' 
                            placeholder='Password'
                            onChange={(e)=>
                                setValues({...values,[e.target.name]: e.target.value})
                            }>

                        </input>
                    </div>
                    <button className='btn-submit' type='submit'>Submit</button>
                    <span>
                        Don't you have an account? <Link to='/register'>Register</Link>
                    </span>

                </form>
                <ToastContainer />
            </div>
        </div>
        
    );
}