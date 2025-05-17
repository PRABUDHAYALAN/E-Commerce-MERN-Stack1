import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'

const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  }
  )

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }


  const login = async ()=>{
    console.log("Login Function executed",formData)
    let responseData;
    await fetch("https://e-commerce-mern-stack1.onrender.com/login",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
   localStorage.setItem("auth-token",responseData.token);
   window.location.replace("/");
  }
  else{
    alert(responseData.errors);
  }
    
  }

  const signup = async ()=>{
    console.log("Signup Function executed",formData)
    let responseData;
    await fetch("https://e-commerce-mern-stack1.onrender.com/signup",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
   localStorage.setItem("auth-token",responseData.token);
   window.location.replace("/");
  }
  else{
    alert(responseData.errors);
  }
}
  return (
   <div className='login-signup'>
    <div className="loginsignup-container">
   <h1>{state}</h1>
    <div className="loginsignup-fields">
    {state==="Sign Up"?<input  type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='User Name'/>:<></>}
      <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email'/>
      <input name='password' value={formData.password} onChange={changeHandler}     type='password' placeholder='Password'/>
    </div>
    <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
    {state==="Sign Up"
     ?<p>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
     
    :<p>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}

    <div className="loginsignup-agree">
      <input type='checkbox'/>
      <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
    </div>
    </div>
     

   </div>

  )
}

export default LoginSignup
