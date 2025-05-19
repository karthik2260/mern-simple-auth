import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from '../../utils'




function Login(){

    const [LoginInfo,setLoginInfo] = useState({
    
        email: '',
        password: ''

    })

    const navigate = useNavigate();


    const handdleChange = (e) => {
        const {name,value} = e.target;
        console.log(name,value);
        const copyLoginInfo = {...LoginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
     console.log('loginInfo -> ' ,LoginInfo );

     const handleLogin  = async  (e) => {
        e.preventDefault();
        const {email,password} = LoginInfo;
        if( !email || !password){
            return handleError('email and password are required')
           

        }
        if (password.length < 4) {
  return handleError('Password must be at least 4 characters long');
}
        try{

            const url = `${process.env.REACT_APP_API_URL}/auth/login}`;;
             const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            })

            const result = await response.json();
            const{success,message,jwtToken,name,error} = result
            console.log(result);
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser',name)
                setTimeout(() => {
                    navigate('/home')

                },1000)
            }else if(error){
                const details = error?.details[0].message;
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
              <ToastContainer position="top-right" autoClose={3000} />

        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                

                 <div>
                    <label htmlFor="email">Email</label>
                    <input  
                    onChange={handdleChange}
                    type="email"
                    name='email'
                    autoFocus
                    placeholder='Enter your email...'
                      value={LoginInfo.email}
                    
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
                      value={LoginInfo.password}
                    
                    />

                </div>

                <button type='submit'>Login</button>
                <span>Already have an account</span>
                <Link to="/signup">Signup</Link>
                
            </form>
            
     
        </div>


</>
    )
    
}

export default Login;
