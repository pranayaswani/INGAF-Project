import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// toast.configure()

const Masters = (props) => {
    console.log('PROPS: ',props);
    const masterType = props.masterType;
    // console.log(masterType);
    const [masterData, setMasterData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/get/designations")
//       .then((response) => {
//         setDesignationData(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//   }, []);

  const initialValues = {
    descr: "",
    current_status: "Active",
  };
  

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
//    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const {descr,current_status} = formValues;
      axios
        .post("http://localhost:5000/post/masters", {
          descr,
          current_status
        })
        .then(() => {
          // toast.success("Record Inserted Successfully...");
          setFormValues(initialValues);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);

//   const check_duplicate = (en) =>{
//     axios.get("http://localhost:5000/get/empByname/:{en}")
//     .then((response) => {
//       setDesignationData(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });


//   }

  const validate = (values) => {
    const errors = {};
    if (!values.descr) {
      errors.descr = "This Field is REQUIRED.";
    }else if (values.descr.length>40){
        errors.descr = "Can not EXCEED 40 Characters.";
    }//else if(check_duplicate(values.emp_name)){
    //     errors.emp_name = "Employee Name already EXISTS.";
    // }

    if (values.current_status.value === "---Select Status---") {
        errors.current_status = "Status is REQUIRED.";
      }
  
    return errors;
  };
  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <div class="ui blue inverted segment">
            <h1 class="ui horizontal blue inverted divider">{masterType}</h1>
          </div>
          <div className="field">
            <label>Training Centre</label>
            <input type="text" name="training_centre" readOnly value="INGAF (HQ), New Delhi" />
          </div>
          <div className="field">
            <label>Description</label>
            <div className="field">
            <input type="text" name="descr" autoComplete="off" value={formValues.descr} placeholder="Description" onChange={handleChange} />
            </div>
            <p className="error">{formErrors.descr}</p>                        
          </div>
          <div className="field">
            <label>Select Status</label>
            <select className="ui fluid dropdown" name="current_status" value={formValues.current_status} onChange={handleChange}>
              <option value="0">---Select Status---</option>
              <option value="1">Active</option>
              <option value="2">InActive</option>
            </select>
            <p className="error">{formErrors.current_status}</p>            
          </div>
          <button className="ui button primary">Submit</button>          
          &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red" onClick={()=>setFormValues(initialValues)}>Reset</button>
          <Link to ="/OfficeUniverseList">
              <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                    
          </Link>          
        </div>
      </form>
    </div>
  );
};

export default Masters;
