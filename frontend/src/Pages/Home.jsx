import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../utils';
import {ToastContainer} from 'react-toastify'
import './Home.css'




function Home(){

const [loggedInUser,setLoggedInUser] = useState('');

const navigate = useNavigate();

useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
},[])

const handleLogout = (e) => {

    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out')
    setTimeout(() => {
        navigate('/login')
    },1000)

}


const fetchProducts = async () => {
    try{
        const url = "http://localhost:3001/products";
        const headers = {
            headers : {
                'Authorization' : localStorage.getItem('token')
            }
        }
        const response = await fetch(url,headers);
        const result = await response.json();
        console.log(result);
        setProducts(result)
        
    }catch (err){
        handleError(err)
    }
}

useEffect(() => {
    fetchProducts()
},[])



    return (
   <div className="profile-container">
    {/* Top Header Bar */}
    <div className="top-bar">
        <h1 className="welcome-text">Welcome, {loggedInUser}</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>

    {/* About Me Section */}
    <section className="about-card">
        <h2>👤 About Me</h2>
        <p>
            Hello! I’m <span className="highlight">Karthik G D</span>, a <strong>Full Stack Software Developer</strong> passionate about creating modern web applications.
        </p>
        <p><strong>Skills:</strong></p>
        <ul className="skills-list">
            <li>JavaScript</li>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>SQL</li>
            <li>NoSQL</li>
            <li>Git</li>
            <li>Docker</li>
            <li>PostgreSQl</li>
            <li>Python</li>
            <li>Mongodb</li>
            <li>Microservices</li>
            <li>Kubernetees</li>
            <li>Nextjs</li>
            <li>Reddis</li>
            <li>Redux tool kit</li>
        </ul>
    </section>


           

            <ToastContainer />
        </div>
    );
    
}

export default Home;
