import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Header from '../../CommonComponents/Header';

const City = () => {
    const [statusData, setStatusData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/get/current_status")
        .then((response) => {
          setStatusData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const initialValues = {
      descr: "",
      status_id: 0,
    };
    
  
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const {descr,status_id} = formValues;
        axios
          .post("http://localhost:5000/post/cities", {
            descr,
            status_id,
          })
          .then(() => {
            console.log("Record Inserted...");
            setFormValues(initialValues);
          })
          .catch((err) => {
            console.log("Errors in saving...",err);
          });
      }
    }, [formErrors]);
  
  
    const validate = (values) => {
      const errors = {};
      if (!values.descr) {
        errors.descr = "City is REQUIRED.";
      }else if (values.descr.length>20){
          errors.descr = "City should not EXCEED 20 Characters.";
      if (values.status_id.value === "---Select Current Status---") {
          errors.status_id = "Current Status is REQUIRED.";}
      return errors;
        };
    };

  return (
    <div className="ui container">
        <form className="ui form" onSubmit={handleSubmit} >
        <div className="ui segment">
            <Header caption="Cities"/>
        </div>
        <div className="field">
                <label>City</label>
                <div className="field">
                    <input type="text" name="descr" autoComplete="off" />
                </div>
        </div>
        <div className="field">
        <label>Current Status</label>
        <select
            className="ui fluid dropdown" name="status_id" value={formValues.status_id} onChange={handleChange}>
            <option value="0">---Select Current Status---</option>
            {statusData.map((sts) => (
            <option value={sts.id}>{sts.descr}</option>
            ))}
            ;
        </select>
        </div>
        <button className="ui button primary">Submit</button>          
          &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red" onClick={()=>setFormValues(initialValues)}>Reset</button>
          <Link to ="/CitiesList">
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                    
          </Link>          
          {/* <a href="/OfficeUniverseList" className="btn btn-success btn-lg pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</a>                     */}
        </form>
        </div>
  );
};


export default City;
