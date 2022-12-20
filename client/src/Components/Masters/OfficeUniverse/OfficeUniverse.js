import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  tc_id:3,
  emp_name:"",  
  desig_id:"0",
  phone_nos:"",    
  mobile_no:"",      
  email_id:"", 
  user_role_id:"0",     
  login_id:"",   
  status_id:"0"
}

const OfficeUniverse = () => {
    const [statusData, setStatusData] = useState([]);
    const [designationData, setDesignationData] = useState([]);    
    const [roleData, setRoleData] = useState([]);        
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");

    const {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = state;

    const {action, id} = useParams();
     
    useEffect(()=>{
      axios.get(`http://localhost:5000/getById/office_universe/${id}`)
        .then((response) => {
          const {id, tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = response.data[0];
          setOldStatus(status_id);
          setState({...response.data[0]})})
    },[id])


    useEffect(() => {
      axios.get("http://localhost:5000/get/current_status")
        .then((response) => {
          setStatusData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
        axios.get("http://localhost:5000/get/designations")
        .then((response) => {
          setDesignationData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
        axios.get("http://localhost:5000/get/user_roles")
        .then((response) => {
          setRoleData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const resetForm = () =>{
        setState(initialValues);
    }


    const handleChange = (e) =>{
        const {name, value}=e.target;
        setState({...state, [name]:value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(state));
        setIsSubmit(true);
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit)
        {
          const {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = state;
          if((id && oldStatus != status_id))
          {
              axios.put(`http://localhost:5000/updateStatus/office_universe/${id}`,{
                status_id
                }).then((res)=>{
                  console.log(res);
                  if(res.status==200)
                  {
                    toast.success("Current Status Updated Successfully...");
                  }else
                  {
                    toast.error("Some isssue in Updation...");   
                  }
                });
            }
            else
            {
              axios.get(`http://localhost:5000/get/office_universe_check/${emp_name}/${id}`)
              .then((res1)=>
              {
                if(res1.data.length>0)
                {
                  toast.error("Employee Name Already Exists...");     
                }else
                {
                  if(id)
                  {
                    axios.put(`http://localhost:5000/update/office_universe/${id}`,
                    {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id})
                    .then((res)=>
                    {
                      if(res.status==200)
                      {
                        toast.success("Record Updated Successfully...");
                      }
                      }).catch((err)=>{
                        toast.error("Some isssue...");
                      });
                  }else
                  {
                    axios.post("http://localhost:5000/post/office_universe",
                    {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id})
                    .then((res)=>
                    {
                      if(res.status==200)
                      {
                        toast.success("Record Added Successfully...");
                        setState(initialValues);
                      }
                    }).catch((err)=>
                    {
                      toast.error("Some isssue in Saving...");
                    }); 
                  }
                }
              })
            }
          }
    },[formErrors])


  const validate = (values) => {
    const errors = {};
    if (!values.emp_name) {
      errors.emp_name = "Employee Name is REQUIRED.";
    }else if (values.emp_name.length>40){
        errors.emp_name = "Employee Name should not EXCEED 40 Characters.";
    }
    if (!values.mobile_no) {errors.mobile_no = "Mobile No. is REQUIRED.";}
    if (!values.login_id) { errors.login_id = "Login ID is REQUIRED.";}
    if(values.user_role_id==="0"){errors.user_role_id = "User Role is REQUIRED.";}          
    if(values.desig_id==="0"){errors.desig_id = "Designation is REQUIRED.";}          
    if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
    return errors;
  };
  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Office Universe"/>
          <div>          
          <p className="error">{formErrors.emp_name}</p>
          <p className="error">{formErrors.mobile_no}</p>          
          </div>
          <div className="field">
            <label>Training Centre</label>
            <input type="text" name="training_centre" readOnly value="INGAF (HQ), New Delhi" />
          </div>
          <div className="two fields">
            <div className="field">
              <label>Employee Name</label>
              <div className="field">
                <input type="text" name="emp_name" autoFocus maxLength={40} autoComplete="off" value={state.emp_name || ""} placeholder="Employee Name" onChange={handleChange} readOnly={action} />
              </div>
            </div>

            <div className="field">
              <label>Designation</label>
              <select 
                className="ui fluid dropdown" name="desig_id" value={state.desig_id} onChange={handleChange} readOnly={action} >
                <option value="0">---Select Designation---</option>
                {designationData.map((desig) => (
                  <option value={desig.id}>{desig.description}</option>
                ))}
                ;
              </select>
            </div>
            <p className="error">{formErrors.desig_id}</p>
          </div>
          <div className="two fields">

            <div className="field">
              <label>Phone Nos.</label>
              <input type="text" name="phone_nos" autoComplete="off" value={state.phone_nos} placeholder="Phone Nos." onChange={handleChange} readOnly={action}/>
            </div>

            <div className="field">
              <label>Mobile No.</label>
              <input type="text" name="mobile_no" autoComplete="off" value={state.mobile_no} placeholder="Mobile No." onChange={handleChange} readOnly={action}/>
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label>E Mail ID</label>
              <div className="field">
                <input type="text" name="email_id" autoComplete="off" value={state.email_id} placeholder="E Mail ID" onChange={handleChange} readOnly={action}/>
              </div>
            </div>
            <div className="field">
              <label>User Role</label>
              <select className="ui fluid dropdown" name="user_role_id" value={state.user_role_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Role---</option>
                {roleData.map((role) => (
                  <option value={role.id}>{role.role}</option>
                ))}
                ;
              </select>
              <p className="error">{formErrors.role_id}</p>              
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Preferred Login ID</label>
              <input type="text" name="login_id" autoComplete="off" value={state.login_id} placeholder="Preferred Login ID" onChange={handleChange} readOnly={action}/>
            </div>
            <p className="error">{formErrors.login_id}</p>
            <div className="field">
            <label>Current Status</label>
              <select className="ui fluid dropdown" name="status_id" value={state.status_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Current Status---</option>
                {statusData.map((st) => (
                  <option value={st.id}>{st.descr}</option>
                ))}
                ;
              </select>
            </div>
            <p className="error">{formErrors.status_id}</p>
          </div>          
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            {/* <input type="submit" className='btn btn-primary w-10' value={id? "Update" : "Save"}/> */}
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/OfficeUniverseList">
          {/* <button className="btn btn-success pull-right" onClick={()=>{navigate(-1)}}><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                     */}
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          
          {/* <a href="/OfficeUniverseList" className="btn btn-success btn-lg pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</a>                     */}
        </div>
      </form>
    </div>
  );
};

export default OfficeUniverse;
