import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""})
    let history =useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=cred;
        const response = await fetch("https://servernb.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',},
            body: JSON.stringify({name,email,password}) 
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
          //save the token and redirect
          props.showAlert("Account creates successfully","success");
          localStorage.setItem('token',json.authtoken);
          history("/");
      }
      else{
          props.showAlert("Invalid credentials!!","danger")
      }
    }
    const onChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={cred.name}
            onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email"name="email" aria-describedby="emailHelp" value={cred.email}
            onChange={onChange}/>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control"  value={cred.password} onChange={onChange}id="password" name="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={cred.cpassword} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
