import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  emp_id:"",  
  signature:"",
  status_id:"0"
}

const Signatories = () => {
    const {EntityID}=useSelector((state)=>state.user.userDetails);
    const [tc_id, setTCID] = useState(EntityID)    
    const [trainingCentre, setTrainingCentre]=useState("");    
    const [statusData, setStatusData] = useState([]);
    const [empData, setEmpData] = useState([]);    
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");


    const {emp_id, status_id} = state;

    const {action, id} = useParams();
     
    // useEffect(()=>{
    //   axios.get(`http://localhost:5000/signatories/${id}`)
    //     .then((response) => {
    //       const {emp_id, signature,tc_id, status_id} = response.data[0];
    //       setOldStatus(status_id);
    //       setState({...response.data[0]})})
    // },[id])


    useEffect(() => {
      axios.get("http://localhost:5000/get/current_status")
        .then((response) => {
          setStatusData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log("tcid:",tc_id)
        axios.get(`http://localhost:5000/training_centres/${tc_id}`)
        .then((response) => {
          setTrainingCentre(response.data[0].descr);
        })
        .catch((err) => {
          setTrainingCentre("INVALID Training Centre");
        });
        axios.get(`http://localhost:5000/get/office_universe/${tc_id}`)
          .then((response) => {
            setEmpData(response.data);
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
          const {emp_id, signature, status_id} = state;
          if((id && oldStatus != status_id))
          {
              axios.put(`http://localhost:5000/updateStatus/signatories/${id}`,{
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
              console.log("Emp:",emp_id)
              axios.get(`http://localhost:5000/signatories/${emp_id}`)
              .then((res1)=>
              {
                if(res1.data.length>0)
                {
                  toast.error("Signature Already Exists...");     
                }else
                {
                  if(id)
                  {
                    axios.put(`http://localhost:5000/signatories/${id}`,
                    {emp_id, signature, status_id})
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
                    axios.post("http://localhost:5000/signatories",
                    {emp_id, signature, status_id})
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
    if(values.emp_id==="0"){errors.emp_id = "Employee is REQUIRED.";}          
    if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
    return errors;
  };
  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Signatories"/>
          <div>          
              <p className="error">{formErrors.emp_id}</p>
          </div>
          <div className="field">
            <label>Training Centre</label>
            <input type="text" name="training_centre" style={{background:"#D4D2D2"}} readOnly value={trainingCentre} />
          </div>
          <div className="field">

              <label>Select Employee</label>
              <select 
                className="ui fluid dropdown" name="emp_id" value={state.emp_id} onChange={handleChange} readOnly={action} >
                <option value="0">---Select Employee---</option>
                {empData.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.emp_name}</option>
                ))}
                ;
              </select>
            <p className="error">{formErrors.emp_id}</p>
            <div className="field">
            <label>Current Status</label>
              <select className="ui fluid dropdown" name="status_id" value={state.status_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Current Status---</option>
                {statusData.map((st) => (
                  <option key={st.id} value={st.id}>{st.descr}</option>
                ))}
                ;
              </select>
            </div>
            <p className="error">{formErrors.status_id}</p>
            <div className="field">
            <label>Upload Signature</label>
            <input type='text' className="ui fluid" name="signature" value={state.signature} onChange={handleChange} readOnly={action}/>            
            {/* <input type="file" /> */}
            </div>
            <p className="error">{formErrors.status_id}</p>

          </div>          
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/SignatoriesList">
            <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          
        </div>
      </form>
    </div>
  );
};

export default Signatories;
