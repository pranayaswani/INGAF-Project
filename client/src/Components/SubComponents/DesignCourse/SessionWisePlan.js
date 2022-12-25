import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
//import Header from "../../CommonComponents/Header"
import Header from "../../CommonComponents/Header"
import { toast, ToastContainer } from "react-toastify";
import { Form } from 'semantic-ui-react'
import DateWiseSessions from './DateWiseSessions';
import { convertDate } from '../../../Utils/Utils';


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
    course_fee:0,     
    status_id:"3",           
  }

  


const SessionWisePlan = () => {
    const [ttMainData, setTTMainData] = useState([]);
    const [ttSubData, setTTSubData] = useState([]);    
    const [mainTopicsData, setMainTopicsData] = useState([]);    
    const [subTopicsData, setSubTopicsData] = useState([]);        
    const [courseData, setCourseData] = useState([]);            
    const [coursePeriod, setCoursePeriod] = useState([]);                
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");
    const [trainingType, setTrainingType]=useState("0");    
    const [main_topic_id, setTopic]=useState("0");        
    const [dateFrom, setDateFrom]=useState("");            
    const [dateUpto, setDateUpto]=useState("");                
    // const [dates, setDates]=useState(["2022-12-21","2022-12-22","2022-12-23","2022-12-24","2022-12-25"]);            
    
    const {tc_id,tt_sub_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id} = state;

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


    // axios.get("http://localhost:5000/get/courses")
    // .then((response) => {
    //   setCourseData(response.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
}, []);


const resetForm = () =>{
    setState(initialValues);
}


const handleChange = (e) =>{
    const {name, value}=e.target;
    setState({...state, [name]:value});
    if(e.target.name === "tt_sub_id")
    {
      axios.get(`http://localhost:5000/get/courses/${e.target.value}`)
      .then((response) => {
        setCourseData(response.data);
        const d1 = response.data[0].date_from;
        const d1date = new Date(d1);
        setDateFrom(convertDate(d1date));

        const d2 = response.data[0].date_upto;
        const d2date = new Date(d2);
        setDateUpto(convertDate(d2date));
      })
      .catch((err) => {
        console.log(err);
      });
    }else 
    if(e.target.name === "main_topic_id")
    {
      const course_id = e.target.value;
      axios.get(`http://localhost:5000/get/courses2/${course_id}`) 
      .then((response) => {
        // console.log("Response data:"+JSON.stringify(response.data[0]));   
        const main_id = response.data[0].main_topic_id;
        setTopic(main_id);
        const dt1 = response.data[0].date_from;
        const dt1date = new Date(dt1);
        const dt2 = response.data[0].date_upto;
        const dt2date = new Date(dt2);
        let course_period=[];  
        while(dt1date <= dt2date)
        {
          course_period.push(convertDate(dt1date))
          //course_period.push(dt1date.getFullYear() + "-" + dt1date.getMonth() + "-" +dt1date.getDate())
          dt1date.setDate(dt1date.getDate()+1)
        }
       setCoursePeriod(course_period);
      })
      .catch((err) => {
        console.log(err);
      });
    }
}

const handleSubmit = (e) =>{
    e.preventDefault();
    // setFormErrors(validate(state));
    setIsSubmit(true);
}

// const handleChangeTrainingType = (e) =>{
//     setTrainingType(e.target.value);
//     const tt = e.target.value;
//     console.log("selected training type : "+tt);
//     axios.get(`http://localhost:5000/get/courses/${tt}`)
//     .then((response) => {
//       setCourseData(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// const handleChangeTopic = (e) =>{
//     setState({...state, main_topic_id:e.target.value});
//     setTopic(e.target.value);
//     // const tp = e.target.value;
//     console.log("selected training type : "+trainingType);
//     console.log("selected topic : "+main_topic_id);    
//     console.log("selected training type : "+trainingType);
//     axios.get(`http://localhost:5000/get/courses/${trainingType}/${main_topic_id}`)
//     .then((response) => {
//       setCourseData(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }


// useEffect(()=>{
//     console.log(formErrors);
//     // if(Object.keys(formErrors).length===0 && isSubmit)
//     // {
//         const {tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id} = state;
//                 axios.post("http://localhost:5000/post/courses",
//                 {tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id})
//                 .then((res)=>
//                 {
//                     if(res.status==200)
//                     {
//                     toast.success("Course Added Successfully...");
//                     setState(initialValues);
//                     }
//                 }).catch((err)=>
//                 {
//                     toast.error("Some isssue in Saving...");
//                 }); 
//                 // }
//             },[formErrors])

// const validate = (values) => {
//     const errors = {};
//     if (!values.course_fee) {errors.course = "Course Fee is REQUIRED.";
//     if(values.tt_main_id==="0"){errors.tt_main_id = "Training Type - Main is REQUIRED.";}          
//     if(values.tt_sub_id==="0"){errors.tt_sub_id = "Training Type - Sub is REQUIRED.";}              
//     if(values.main_topic_id==="0"){errors.main_topic_id = "Training Type - Sub is REQUIRED.";}                  
//     if(values.mode_of_training==="0"){errors.mode_of_training = "Mode of is REQUIRED.";}          
//     if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
//     return errors;
// }
// };



  return (

    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Session Wise Plan"/>
          <div className="field">
            <label>Training Centre</label>
            <input type="text" name="tc_id" readOnly value="INGAF (HQ), New Delhi" />
          </div>
          <Form.Group widths='equal'>
            <div className="field">
              <label>Training Type</label>
              <select 
                className="ui fluid dropdown" name="tt_sub_id" value={state.tt_sub_id} onChange={handleChange}>
                <option value="0">---Select Training Type---</option>
                {ttSubData.map((tts) => (
                  <option value={tts.id}>{tts.description}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
                    <label>Select Course</label>
                    <select 
                        className="ui fluid dropdown" name="main_topic_id" value={state.main_topic_id} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Topic---</option>
                        {courseData.map((mtp) => (
                          // const dtfr = convertDate(courseData.date_from);
                         //<option value={mtp.course_id}>{mtp.topic} ( {mtp.date_from.toString().substring(0,10)} to {mtp.date_upto.toString().substring(0,10)} )</option>
                        //<option value={mtp.course_id}>{mtp.topic} ( {dateFrom} to {dateUpto} )</option>                         
                        <option value={mtp.course_id}>{mtp.topic} ( {convertDate(new Date(mtp.date_from))} to {convertDate(new Date(mtp.date_upto))} )</option>                                                 
                        //  <option value={mtp.course_id}>{mtp.topic} ( {mtp.convertDate(date_from.toString().substring(0,10))} to {mtp.convertDate(date_upto.toString().substring(0,10))} )</option>                        
                        ))}
                        ;
                    </select>

            </div>

           {/* <div className="field">
                    <label>Select Period</label>
                    <select 
                        className="ui fluid dropdown" name="main_topic_id" value={state.main_topic_id} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Period---</option>
                        {courseDataPeriod.map((prd) => (
                        <option value={prd.id}>{prd.date_from}</option>
                        ))}
                        ;
                    </select>
            </div> */}
          </Form.Group>
          {/* <div class="ui segment mt-0"> */}
            <h4 class="ui horizontal  divider">
              Session Wise Plan
            </h4>
        {/* </div> */}
        <Form.Group widths='equal' style={{background:"#ADD8E6"}}>
          <div className="field">
              <label>Date</label>
          </div>
          <div className="field">
              <label>1st Session</label>
          </div>
          <div className="field">
              <label>1st Session</label>
          </div>
          <div className="field">
              <label>1st Session</label>
          </div>
          <div className="field">
              <label>1st Session</label>
          </div>
          </Form.Group>

          {coursePeriod.map((dt) => (
            <DateWiseSessions cDate={dt} mainTopic={main_topic_id}/>          
            // <DateWiseSessions cDate={dt}/>                      
                ))}
                ;
        </div>      
        </form>    
                {/* <button className="ui button primary w-20">Enter Session Wise Plan</button>           */}
        {/* <Form.Group widths='equal'>

    
          <div className="field">
            <label>Select Date</label>
              <select className="ui fluid dropdown" name="dt" value={state.dt} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Date---</option>
                {courseData.map((cd) => (
                  <option value={cd.id}>{cd.date_from}</option>
                ))}
                ;
              </select>
          </div>
          <div>
            <label>Select Session</label>
              <select className="ui fluid dropdown" name="course_coordinator_id" value={state.course_coordinator_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Session---</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>                
                <option value="3">3rd</option>
                <option value="4">4th</option>                
              </select>
          </div>
          <div className="field">
            <label>Select Topic</label>
              <select className="ui fluid dropdown" name="sub_topic_id" value={state.sub_topic_id} onChange={handleChange} readOnly={action}>
                <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>

        </Form.Group>
 */}
 <br/>
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/CourseList">
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          


      {/* </form> */}
    </div>
  );
};

export default SessionWisePlan
