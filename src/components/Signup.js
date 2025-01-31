import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (e) => {
  const [credential,setCredential]= useState({name:"",email:"",password:"",cpassword:""})
   const navigate= useNavigate();
   const handleSubmit= async()=>{
    e.preventDefault();
    const response= await fetch("http://localhost:5000/api/auth/createuser",{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({name: credential.name, email: credential.email,password: credential.password})
    })

    const json= await response.json()
    console.log(json);
    if(json.success){
       navigate('/login');
    }
  }
  const onchange = (e) => {
    setCredential({...credential,[e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={credential.name}
            onChange={onchange}
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credential.email}
            onChange={onchange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credential.password}
            onChange={onchange}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={credential.cpassword}
            onChange={onchange}
            placeholder="Password"
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
