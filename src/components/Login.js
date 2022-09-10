import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const [cred,setCred]=useState({email:"",pass:""})
    let navigate =useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',},
            body: JSON.stringify({email:cred.email,password:cred.password}) 
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
            //save the token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.name})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="Email"
            aria-describedby="emailHelp"
            value={cred.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            name="Password"
            value={cred.pass}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
