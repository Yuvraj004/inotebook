import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    const [cred,setCred]=useState({email:"",pass:""})
    let navigate =useNavigate();
    const handleSubmit=async (e)=>{
      e.preventDefault();
        const response = await fetch("https://servernb.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:cred.email,password:cred.pass}) 
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
            //save the token and redirect
            props.showAlert("You are logged in","success");
            localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange=(e)=>{
      setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={cred.email}onChange={onChange} id="email"name="email" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" value={cred.pass} onChange={onChange}id="pass" name="pass"/>
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
