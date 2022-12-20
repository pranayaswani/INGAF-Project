import React, { useState, useEffect } from "react";
import OfficeUniverse from "./OfficeUniverse";
import axios from "axios";

// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const OfficeUniverseList = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
        axios
          .get("http://localhost:5000/get/office_universe")
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
          }, []);
    
  return (
    <div>
        <div className="ui container"><h1>Office Universe List</h1>
        {/* <a href="#" className="btn btn-success btn-lg pull-right"><span className="glyphicon glyphicon-plus"></span>Add New Employee</a> */}
        <button className="btn btn-success pull-right" onClick={OfficeUniverse}><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;Add Employee
        </button>
        <table className="table table-bordered table-striped">
            <thead>
        <tr>
           <th>Employee Name</th> 
           <th>Designation</th> 
           <th>EMail ID</th>   
           <th>Action</th>                                  
        </tr>
        </thead>
        <tbody>
        {data.map((rows) => (        
        <tr>
            <td>{rows.emp_name}</td>       
            <td>{rows.designation}</td>                   
            <td>{rows.email_id}</td>
            <td><span className="glyphicon glyphicon-eye"></span><span className="glyphicon glyphicon-pencil">&nbsp;&nbsp;</span><span className="glyphicon glyphicon-trash"></span></td>
        </tr>
         ))}
        </tbody>         
        </table>
        </div>
        </div>

  )
}

export default OfficeUniverseList

