import React, {useState} from "react";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import "./ClientOfficeRegistration.css";
//https://www.youtube.com/watch?v=wlltgs5jmZw - yup link
const ClientOfficeRegistration = () => {

  const schema = yup.object().shape({
    controller_code: yup.string()
    .required("Controller Code is Required")
    .min(3,"Should be 3 Characters")
    .max(3,"Should be 3 Characters"),
    office_name: yup.string()
    .required("Office Name is Required!")
    .max(60,"Maximum 60 characters are allowed!")
    .min(10,"Minimum 10 characters are required!"),
    address: yup.string()
    .required("Address is required!"),
    email_id: yup.string()
    .email("Not a Valid Email ID!")
    .required("E-Mail ID is required!"),    
    pao_code: yup.string()
    .max(6,"Should be of 6 Characters!")
    .min(6,"Should be of 6 Characters!"),
  });

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const initialState = {
    controller_code: "",
    office_name:""
  };


  const [state, setState]=useState(initialState);
  
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setState({...state, [name]: value});
    
  };

  const {controller_code, office_name} = state;
  
  const handlSubmit = (e) =>{  
    e.preventDefault();

    axios.post("http://localhost:5000/post/clients",{
      controller_code, office_name,
      // controller_code,office_name,address,state_code,pao_code,contact_person,email_id,phone_nos, mobile_no, nearest_tc,
    }).then(()=>{
      // setState({training_type:"", status:""});
      // toast.success("Record Inserted Successfully...");
      console.log("Record inserted successfully...");
    }).catch((err)=>{
      console.log(err);
    });
  }
  return (
    <div style={{alignContent:"center", width:1100}} className="card">
      <div className="row col-md-8 ">
        <div className="panel panel-primary mt-3">
          <div  className="panel-heading text-center panel-relative mt-2">
            <h3>Client Office Registration</h3>
          </div>
          <div className="panel-body jumbotron">
            <form onSubmit={handlSubmit}>
              <div className="form-group">
                <label htmlFor="controller_code">Select Ministry / Department:</label>
                <select className="form-control" name="controller_code" id="controller_code" value={controller_code} onChange={handleInputChange} {...register("controller_code")}>
                  <option value="0">---Select Ministry / Department---</option>
                  <option value="1">Health</option>
                  <option value="2">Finance</option>
                  <option value="3">Others</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="office_name">Office Name</label>                
                <input type="text" autoComplete="off" className="form-control" onChange={handleInputChange} {...register("office_name")}/>
                <p className="error-msg"><small>{errors.office_name?.message}</small></p>
              </div>

              <div className="input-group">
                <label htmlFor="address">Office Address</label>                
                <textarea className="form-control" rows="3" {...register("address")}></textarea>                
                <p className="error-msg"><small>{errors.address?.message}</small></p>                
              </div>
              <div className="row">
              <div className="input-group col-md-6">
                <label htmlFor="state">Select State</label>                
                <select className="form-control" {...register("state_code")}>
                  <option value="0">---Select State---</option>
                  <option value="1">Delhi</option>
                  <option value="2">Maharashtra</option>
                  <option value="3">Kerala</option>
                </select>
              </div>
              <div className="input-group col-md-6">
                <label htmlFor="pao_code">PAO Code (if any)</label>                
                <input type="text" className="form-control" autoComplete="off" {...register("pao_code")}/>
                <p className="error-msg"><small>{errors.pao_code?.message}</small></p>                
              </div>
              </div>              
              <div className="row">
              <div className="input-group col-md-6">
                <label htmlFor="contact_person">Contact Person</label>                
                <input type="text" className="form-control" autoComplete="off" {...register("contact_person")}/>
              </div>
              <div className="input-group col-md-6">
                <label htmlFor="email_id">E-Mail ID</label>                
                <input type="text" className="form-control" autoComplete="off" {...register("email_id")}/>
                <p className="error-msg"><small>{errors.email_id?.message}</small></p>                
              </div>

              </div>
              <div className="row">
              <div className="input-group col-md-6" >
                <label htmlFor="phone_nos">Phone Nos.</label>                
                <input type="text" className="form-control" autoComplete="off" {...register("phone_nos")}/>
              </div>
              <div className="input-group col-md-6">
                <label htmlFor="mobile_no">Mobile Nos.</label>                
                <input type="text" className="form-control" autoComplete="off" {...register("mobile_no")}/>
              </div>
              </div>
              <div className="input-group">
                <label htmlFor="nearest_tc">Select Nearest Training Centre of INGAF</label>                
                <select className="form-control" {...register("nearest_tc")}>
                  <option value="0">---Select Nearest Training Centre of INGAF---</option>
                  <option value="1"> INGAF, DELHI, HQ</option>
                  <option value="2">RTC, Chennai</option>
                  <option value="3">RTC, Mumbai</option>
                  <option value="4">RTC, Kolkata</option>                                    
                  <option value="5">RTC, Aizawl</option>                  
                </select>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-danger">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOfficeRegistration;
