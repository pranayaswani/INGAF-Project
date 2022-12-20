import React from "react";
import './ContactUs.css';
const Contact = (props) => {
  return (
    <div>
      <div className="card-text-center">
        <div className="overflow">
          <img src={props.img} alt="" className="card-img-top" />
          <div className="card-body text-dark">
            <h2 className="card-title">{props.ename}</h2>
            <h4 className="text-right">Designation: {props.designation}</h4>            
            <h4 className="text-right">Phone No. : {props.phone_nos}</h4>            
            <h4 className="text-right">Mobile No. : {props.mobile_no} </h4>            
            <h4 className="text-right">EMail ID : {props.email_id}</h4>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
