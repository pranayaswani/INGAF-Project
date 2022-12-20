import React, {useState} from "react";
import axios from 'axios';

import "./ClientOfficeRegistration.css";


const ClientsNew = () => {
  return (
    <div>
        <h1>HHH</h1>
        <h2>new heading...</h2>
        <div className="container">
            <form>
              <div className="input-group">
                <label htmlFor="office_name">Office Name</label>                
                <input type="text" autoComplete="off" name="office_name"  className="form-control"/>
                <p className="error-msg"><small></small></p>
              </div>
            </form>         


        </div>
    </div>
  )
}

export default ClientsNew
