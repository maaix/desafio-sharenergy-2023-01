import React, {useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import '../../pages/login/Login.css'

export default function Register() {
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
            const {data} = await axios.post("http://localhost:3333/auth/register",{
              ...values,
            },{
                withCredentials: true,
            });
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
        <div className='login-wrapper'>
            <div className="login-aside shadow">
                <h1 className='login-tile'>SHARENERGY</h1>
            </div>
            <div className='login-container shadow '>
                <img src="https://www.sharenergy.com.br/wp-content/uploads/2017/05/logo_color.min-01-01.png" alt="" />
                <h2 className='login-title'>Register Account</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input  
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
                            type='password' 
                            name='password' 
                            placeholder='Password'
                            onChange={(e)=>
                                setValues({...values,[e.target.name]: e.target.value})
                            }>

                        </input>
                    </div>
                    <button type='submit'>Submit</button>
                    <span>
                        Already have an account? <Link to='/login'>Login</Link>
                    </span>

                </form>
                <ToastContainer />
            </div>
        
        </div>
    );
}