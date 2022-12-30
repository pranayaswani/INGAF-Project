import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
//import Header from "../../CommonComponents/Header"
import Header from "../../CommonComponents/Header"
import { toast, ToastContainer } from "react-toastify";


const dt = new Date();
const initialValues = {
    tc_id:"3",
    tt_main_id:"0",  
    tt_sub_id:"0",      
    main_topic_id:"0",
    mode_of_training:"0",        
    date_from:"",    
    date_upto:"",      
    last_date:"",          
    course_fee:"",     
    course_director_id:"0",       
    course_coordinator_id:"0",           
    status_id:"3",           
  }

  


const PrepareCalendar = () => {
    const [ttMainData, setTTMainData] = useState([]);
    const [ttSubData, setTTSubData] = useState([]);    
    const [mainTopicsData, setMainTopicsData] = useState([]);    
    const [subTopicsData, setSubTopicsData] = useState([]);        
    const [directorData, setDirectorData] = useState([]);            
    const [coordinatorData, setCoordinatorData] = useState([]);                
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");
    
    const {tc_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id} = state;

    const {action, id} = useParams();

    

 
// useEffect(()=>{
//   axios.get(`http://localhost:5000/getById/office_universe/${id}`)
//     .then((response) => {
//       const {id, tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = response.data[0];
//       setOldStatus(status_id);
//       setState({...response.data[0]})})
// },[id])


useEffect(() => {
  axios.get("http://localhost:5000/get/training_types_main")
    .then((response) => {
      setTTMainData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get("http://localhost:5000/get/training_types_sub")
    .then((response) => {
      setTTSubData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get("http://localhost:5000/get/topics_main")
    .then((response) => {
      setMainTopicsData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get("http://localhost:5000/get/office_universe")
    .then((response) => {
      setDirectorData(response.data);
      setCoordinatorData(response.data);      
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
    // if(Object.keys(formErrors).length===0 && isSubmit)
    // {
        const {tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id} = state;
                axios.post("http://localhost:5000/post/courses",
                {tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id})
                .then((res)=>
                {
                    if(res.status==200)
                    {
                    toast.success("Course Added Successfully...");
                    setState(initialValues);
                    }
                }).catch((err)=>
                {
                    toast.error("Some isssue in Saving...");
                }); 
                // }
            },[formErrors])

const validate = (values) => {
    const errors = {};
    if (!values.course_fee) {errors.course = "Course Fee is REQUIRED.";
    if(values.tt_main_id==="0"){errors.tt_main_id = "Training Type - Main is REQUIRED.";}          
    if(values.tt_sub_id==="0"){errors.tt_sub_id = "Training Type - Sub is REQUIRED.";}              
    if(values.main_topic_id==="0"){errors.main_topic_id = "Training Type - Sub is REQUIRED.";}                  
    if(values.mode_of_training==="0"){errors.mode_of_training = "Mode of is REQUIRED.";}          
    if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
    return errors;
}
};



  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Design Course"/>
          <div className="field">
            <label>Training Centre</label>
            <input type="text" name="tc_id" readOnly value="INGAF (HQ), New Delhi" />
          </div>
          <div className="two fields">
            <div className="field">
              <label>Training Type - Main</label>
              <select 
                className="ui fluid dropdown" name="tt_main_id" value={state.tt_main_id} onChange={handleChange} readOnly={action} >
                <option value="0">---Select Training Type - Main---</option>
                {ttMainData.map((ttm) => (
                  <option value={ttm.id}>{ttm.description}</option>
                ))};
              </select>
            </div>

            <div className="field">
              <label>Training Type - Sub</label>
              <select 
                className="ui fluid dropdown" name="tt_sub_id" value={state.tt_sub_id} onChange={handleChange} readOnly={action} >
                <option value="0">---Select Training Type - Sub---</option>
                {ttSubData.map((tts) => (
                  <option value={tts.id}>{tts.description}</option>
                ))}
                ;
              </select>
            </div>


          </div>
          <div className="two fields">
                <div className="field">
                    <label>Topic - Main</label>
                    <select 
                        className="ui fluid dropdown" name="main_topic_id" value={state.main_topic_id} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Topic - Main---</option>
                        {mainTopicsData.map((mtp) => (
                        <option value={mtp.id}>{mtp.description}</option>
                        ))}
                        ;
                    </select>

                </div>

                <div className="field">
                    <label>Training Mode</label>
                    <select 
                        className="ui fluid dropdown" name="mode_of_training" value={state.mode_of_training} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Mode of Training---</option>
                        <option value="1">Online</option>
                        <option value="2">Offline</option>                                                
                    </select>

                </div>
          </div>          
          <div className="two fields">
            <div className="field">
              <label>Period From :</label>
              <input type="date" name="date_from" autoComplete="off" value={state.date_from} min={"2022-12-19"}  onChange={handleChange} readOnly={action}/>
            </div>

            <div className="field">
              <label>Period Up to :</label>
              <input type="date" name="date_upto" autoComplete="off" value={state.date_upto}  onChange={handleChange} readOnly={action}/>
            </div>
          </div>
          <div className="two fields">

            <div className="field">
              <label>Last Date of Nomination :</label>
              <input type="date" name="last_date" autoComplete="off" value={state.last_date}  onChange={handleChange} readOnly={action}/>
            </div>

            <div className="field">
              <label>Fee per Participant</label>
              <input type="text" name="course_fee" autoComplete="off" value={state.course_fee}  onChange={handleChange} readOnly={action}/>
            </div>

          </div>
          <div className="two fields">
    
          <div className="field">
            <label>Course Director</label>
              <select className="ui fluid dropdown" name="course_director_id" value={state.course_director_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Course Director---</option>
                {directorData.map((cd) => (
                  <option value={cd.id}>{cd.emp_name}</option>
                ))}
                ;
              </select>
            </div>
            <div>
            <label>Course Coordinator</label>
              <select className="ui fluid dropdown" name="course_coordinator_id" value={state.course_coordinator_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Course Coordinator---</option>
                {coordinatorData.map((cc) => (
                  <option value={cc.id}>{cc.emp_name}</option>
                ))}
                ;
              </select>
            </div>
        </div>


          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/CourseList">
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          

        </div>
      </form>
    </div>
  );
};


export default PrepareCalendar
