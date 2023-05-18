import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from './CommonComponents/Header';
import './Login.css';

const Login = () => {
  const [userType, setUserType] = useState("1");
  const [loginID, setLoginID] = useState("naresh");
  const [password, setPassword] = useState("nnn");  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    // alert("Logged IN")
    if(userType==="0")
      alert("Error! User Type not Selected...")
    else 
    {
      console.log('ut',userType)    
      console.log('lg',loginID)
      console.log('pw',password)    
      const response = axios.get(`http://localhost:5000/login/${loginID}/${password}/${userType}`)
      .then((response) => {
        console.log(response.data.length);
        if(response.data.length>0)
        {
          dispatch({
            type:"loggedInCase",
            payload:{
              "LoginID":loginID,
              "UserType":userType,
              "EntityID":response.data[0].entity_id,
              "UName":response.data[0].uname,
            }
          });
          navigate("/");
        }
      })
      .catch((err) => {console.log(err);});
    //alert("Login Successful...",response.data.emp_name)
  }
}
  

  return (
    <div className="container">
      {/* <div class="ui blue inverted segment mt-2">
          <h1 class="ui horizontal blue inverted divider">
          LOGIN
          </h1>
      </div> */}
      <Header caption = "LOGIN"/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="userType">Select User Type:</label>
          <select className="form-control" id="userType" value={userType} onChange={(e)=>setUserType(e.target.value)}>
            <option value="0">---Select User Type---</option>       
            <option value="1">INGAF Functionary</option>
            <option value="2">Controller</option>                             
            <option value="3">Client</option>
            <option value="4">Participant</option>
          </select>
        </div>
        <div className="input-group"> 
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <input type="text" autoComplete="off" className="form-control" name="loginID" value={loginID} placeholder="Login ID" onChange={(e)=>setLoginID(e.target.value)} />
          </div>
          <br/>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input type="password" className="form-control" value={password} name="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <br/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>        <br/>        
        <a href="/ForgotPassword">Forgot Password!</a>
      </form>
    </div>
  );
};

export default Login;
