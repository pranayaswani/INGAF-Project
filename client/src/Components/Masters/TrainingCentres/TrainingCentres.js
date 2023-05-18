import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  descr:"",  
  address:"",
  city_id:"0",
  contact_person:"",    
  email_id:"",    
  phone_nos:"",    
  mobile_no:"",      
  status_id:"0"
}

const TrainingCentres = () => {
    const [statusData, setStatusData] = useState([]);
    const [cityData, setCityData] = useState([]);    
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");

    const {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id} = state;

    const {action, id} = useParams();
     
    useEffect(()=>{
      axios.get(`http://localhost:5000/training_centres/${id}`)
        .then((response) => {
          const {id, descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id} = response.data[0];
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
        axios.get("http://localhost:5000/get/cities")
        .then((response) => {
          setCityData(response.data);
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
          const {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id} = state;
          if((id && oldStatus != status_id))
          {
              axios.put(`http://localhost:5000/updateStatus/training_centres/${id}`,{
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
              axios.get(`http://localhost:5000/training_centres_check/${descr}/${id}`)
              .then((res1)=>
              {
                if(res1.data.length>0)
                {
                  toast.error("Training Centre Already Exists...");     
                }else
                {
                  if(id)
                  {
                    axios.put(`http://localhost:5000/update/training_centres/${id}`,
                    {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id})
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
                    axios.post("http://localhost:5000/training_centres",
                    {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id})
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

    const validate = (values) =>{
        const errors={};
        if(!values.descr){errors.descr = "This Field is REQUIRED.";}
        if(values.city_id==="0"){errors.city_id = "City is REQUIRED.";}                
        if(!values.email_id){errors.email_id = "E-Mail ID is REQUIRED.";}        
        if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}        
        return errors;
    }
  return (
    <div className="ui container mt-2">
        <ToastContainer position='top-center'/>
        <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
            <Header caption = "Training Centres"/>
            <div className="field">
                <label>Training Centre</label>
                <input type="text"  name="descr" autoFocus autoComplete='off' maxLength={100} value={state.descr || ""} onChange={handleChange} readOnly={action} />
            </div>
            <p className='error'>{formErrors.descr}</p>                            
            <div className="field">
                <label>Address</label>
                <textarea rows="2" name="address" autoComplete='off' maxLength={240} value={state.address || ""} onChange={handleChange} readOnly={action} />
            </div>
            <p className='error'>{formErrors.descr}</p>                            
            <div className="two fields">
            <div className="field">
                <label>City</label>
                <select className="ui fluid dropdown" name="city_id" value={state.city_id || "0"} onChange={handleChange} disabled={action}>
                    <option value="0">---Select City---</option>
                    {cityData.map((city) => (
                    <option value={city.id}>{city.description}</option>
                    ))};
                </select>
            </div>
            <p className='error'>{formErrors.city_id}</p>                                        

            <div className="field">
                <label>Contact Person</label>
                <input type="text"  name="contact_person"  autoComplete='off' maxLength={40} value={state.contact_person || ""} onChange={handleChange} readOnly={action} />
                {/* <p className='error'>{formErrors.contact_person}</p>                                             */}
            </div>
            </div>
            <div className="two fields">
            <div className="field">
                <label>EMail ID</label>
                <input type="text"  name="email_id"  autoComplete='off' maxLength={20} value={state.email_id || ""} onChange={handleChange} readOnly={action} />
                <p className='error'>{formErrors.email_id}</p>                                            
            </div>
            <div className="field">
                <label>Phone Nos.</label>
                <input type="text" name="phone_nos"  autoComplete='off' maxLength={20} value={state.phone_nos || ""} onChange={handleChange} readOnly={action} />
                {/* <p className='error'>{formErrors.phone_nos}</p>                                             */}
            </div>
            </div>            
            <div className="two fields">
            <div className="field">
                <label>Mobile No.</label>
                <input type="text"  name="mobile_no"  autoComplete='off' maxLength={20} value={state.mobile_no || ""} onChange={handleChange} readOnly={action} />
                {/* <p className='error'>{formErrors.mobile_no}</p>                                             */}
            </div>


            <div className="field">
                <label>Current Status</label>
                <select className="ui fluid dropdown className='form-control'" name="status_id" value={state.status_id || "0"} onChange={handleChange} readOnly={action}>
                    <option value="0">---Select Current Status---</option>
                    {statusData.map((sts) => (
                    <option value={sts.id}>{sts.descr}</option>
                    ))};
                </select>
                <p className='error'>{formErrors.status_id}</p>                                                        
            </div>
            </div>                        
            <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            {/* <input type="submit" className='btn btn-primary w-10' value={id? "Update" : "Save"}/> */}
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
            <Link to ="/TrainingCentresList">
            <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                    
            </Link>          
            </div>
    </form>
</div>
)
}

export default TrainingCentres;