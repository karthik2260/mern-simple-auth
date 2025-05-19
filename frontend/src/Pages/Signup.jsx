import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from '../../utils'




function Signup(){
    const [SignupInfo,setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''

    })

    const navigate = useNavigate();


    const handdleChange = (e) => {
        const {name,value} = e.target;
        console.log(name,value);
        const copySignupInfo = {...SignupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }
     console.log('loginInfo -> ' ,SignupInfo );

     const handleSignup  = async  (e) => {
        e.preventDefault();
        const {name,email,password} = SignupInfo;
        if(!name || !email || !password){
            return handleError('name,email and password are required')
           

        }
        if (password.length < 4) {
  return handleError('Password must be at least 4 characters long');
}
        try{

            const url = "https://mern-simple-auth-api.vercel.app//auth/signup";
             const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(SignupInfo)
            })

            const result = await response.json();
            const{success,message,error} = result
            console.log(result);
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')

                },1000)
            }else if(error){
                const details = error?.details[0]?.message || 'Signup failed';
                handleError(details)
            }else if(!success){
                handleError(message)
            }
            


        }catch(err) {
            handleError(err)

        }
     }









    return (
        <>
                    
        
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handdleChange}
                    type="text"
                    name='name'
                    autoFocus
                    placeholder='Enter your name...'
                    value={SignupInfo.name}
                    
                    />

                </div>

                 <div>
                    <label htmlFor="email">Email</label>
                    <input  
                    onChange={handdleChange}
                    type="email"
                    name='email'
                    autoFocus
                    placeholder='Enter your email...'
                      value={SignupInfo.email}
                    
                    />

                </div>

                 <div>
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={handdleChange}
                     type="password"
                    name='password'
                    autoFocus
                    placeholder='Enter your password...'
                      value={SignupInfo.password}
                    
                    />

                </div>

                <button type='submit'>Signup</button>
                <span>Already have an account</span>
                <Link to="/login">Login</Link>
            </form>
            
 
        </div>
       
  <ToastContainer position="top-right" autoClose={3000} />

</>
    )
}

export default Signup;
