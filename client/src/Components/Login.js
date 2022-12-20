import React from "react";
import Header from './CommonComponents/Header';
import './Login.css';

const Login = () => {
  return (
    <div className="container">
      {/* <div class="ui blue inverted segment mt-2">
          <h1 class="ui horizontal blue inverted divider">
          LOGIN
          </h1>
      </div> */}
      <Header caption = "LOGIN"/>
      <form>
        <div className="form-group">
          <label for="city">Select User Type:</label>
          <select className="form-control" id="city">
            <option value="0">---Select User Type---</option>            
            <option>INGAF Functionary</option>
            <option>Client Office</option>
            <option>Participant</option>
          </select>
        </div>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <input id="login_id" type="text" autoComplete="off" className="form-control" name="login_id" placeholder="Login ID" />
          </div>
          <br/>
        <div className="input-group">
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input id="password" type="password" className="form-control" name="password" placeholder="Password" />
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
