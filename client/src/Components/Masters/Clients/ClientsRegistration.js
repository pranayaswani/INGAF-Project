import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  controller_id:"0",
  client_descr:"",
  pao_code:"",
  client_address:"",
  state_id:"0",
  tc_id:"0",
  contact_person:"",
  email_id:"", 
  phone_nos:"",    
  mobile_no:"",      
  login_id:"",   
  status_id:"0"
}

const ClientsRegistration = () => {
    const [statusData, setStatusData] = useState([]);
    const [controllerData, setControllerData] = useState([]);    
    const [stateData, setStateData] = useState([]);        
    const [tcData, setTcData] = useState([]);            
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");

    const {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id} = state;

    const {action, id} = useParams();
    console.log("view id: "+id)
     
    useEffect(()=>{
      axios.get(`http://localhost:5000/getById/clients/${id}`)
        .then((response) => {
          const {id,controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id} = response.data[0];
          setOldStatus(status_id);
          setState({...response.data[0]})})
    },[id])

//id,controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id



    useEffect(() => {
      axios.get("http://localhost:5000/get/current_status")
        .then((response) => {setStatusData(response.data);})
        .catch((err) => { console.log(err); });

        axios.get("http://localhost:5000/get/controllers")
        .then((response) => {setControllerData(response.data);})
        .catch((err) => { console.log(err); });

        axios.get("http://localhost:5000/get/states")
        .then((response) => {setStateData(response.data);})
        .catch((err) => {console.log(err);});

        axios.get("http://localhost:5000/get/training_centres")
        .then((response) => {setTcData(response.data);})
        .catch((err) => {console.log(err);});        
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
          const {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id} = state;
          if((id && oldStatus != status_id))
          {
              axios.put(`http://localhost:5000/updateStatus/clients/${id}`,{
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
              axios.get(`http://localhost:5000/get/clients_check/${client_descr}/${id}`)
            //   axios.get(`http://localhost:5000/get/clients_check`)              
              .then((res1)=>
              {
                if(res1.data.length>0)
                {
                  toast.error("Client Office Already Exists...");     
                }else
                {
                  if(id)
                  {
                    axios.put(`http://localhost:5000/update/clients/${id}`,
                    {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id})
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
                    axios.post("http://localhost:5000/post/clients",
                    {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id})
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
    if (values.controller_id==="0") errors.controller_id = "Ministry/Department is REQUIRED.";    
    if (!values.client_descr) errors.client_descr = "Employee Name is REQUIRED.";
    if (!values.client_address) errors.client_address = "Address is REQUIRED.";
    if (!values.login_id) errors.login_id = "Login ID is REQUIRED.";
    if (values.state_id==="0") errors.state_id = "State is REQUIRED.";
    if(values.tc_id==="0"){errors.tc_id = "Nearest Training Centre is REQUIRED.";}          
    if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
    return errors;
  };
  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Clients Registration"/>
          <div className="two fields">          
            <div className="field">
              <label>Ministry / Department</label>
              <select autoFocus className="ui fluid dropdown" name="controller_id" value={state.controller_id} onChange={handleChange} readOnly={action} >
                <option value="0">---Select Ministry/Department---</option>
                {controllerData.map((controller) => (
                  <option value={controller.id}>{controller.description} &nbsp;&nbsp; {controller.controller_code}</option>
                ))}
                ;
              </select>
              <p className="error">{formErrors.controller_id}</p>              
            </div>
            <div className="field">
                    <label>PAO Code (if any)</label>
                    <input type="text" name="pao_code" maxLength={6} autoComplete="off" value={state.pao_code}  placeholder="PAO Code (if any)" onChange={handleChange} readOnly={action}/>
                </div>
                </div>

            <div className="field">
              <label>Office Name</label>
                <input type="text" name="client_descr"  maxLength={40} autoComplete="off" value={state.client_descr || ""} placeholder="Office Name" onChange={handleChange} readOnly={action} />
            </div>

            <div className="field">
                <label>Address</label>
                <textarea rows="2" name="client_address" autoComplete='off' maxLength={240} value={state.client_address || ""} onChange={handleChange} readOnly={action} />
            </div>
            <div className="two fields">
                <div className="field">
                <label>State</label>
                <select 
                    className="ui fluid dropdown" name="state_id" value={state.state_id} onChange={handleChange} readOnly={action} >
                    <option value="0">---Select State---</option>
                    {stateData.map((state) => (
                    <option value={state.id}>{state.description}</option>
                    ))};
                    </select>
                    <p className="error">{formErrors.desig_id}</p>                
                </div>
                <div className="field">
                <label>Nearest INGAF Training Centre</label>
                <select 
                    className="ui fluid dropdown" name="tc_id" value={state.tc_id} onChange={handleChange} readOnly={action} >
                    <option value="0">---Select Nearest INGAF Training Centre---</option>
                    {tcData.map((tc) => (
                    <option value={tc.id}>{tc.description}</option>
                    ))};
                    </select>
                    <p className="error">{formErrors.tc_id}</p>                
                </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Contact Person</label>
                <input type="text" name="contact_person" autoComplete="off" value={state.contact_person} placeholder="Contact Person" onChange={handleChange} readOnly={action}/>
              </div>
              <div className="field">
                <label>E Mail ID</label>
                <input type="text" name="email_id" autoComplete="off" value={state.email_id} placeholder="E Mail ID" onChange={handleChange} readOnly={action}/>
              </div>
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
          <Link to ="/ClientsList">
          {/* <button className="btn btn-success pull-right" onClick={()=>{navigate(-1)}}><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                     */}
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          
          {/* <a href="/OfficeUniverseList" className="btn btn-success btn-lg pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</a>                     */}
        </div>
      </form>
    </div>
  );
};

export default ClientsRegistration;
