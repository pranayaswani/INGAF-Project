import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
//import Header from "../../CommonComponents/Header"
import Header from "../../CommonComponents/Header"
import { toast, ToastContainer } from "react-toastify";
import { Form } from 'semantic-ui-react'
import DataTable from "react-data-table-component";
import { convertDate, reverseDateAsString } from '../../../Utils/Utils';


const cDate = reverseDateAsString(convertDate(new Date()));


const initialValues = {
    // tc_id:"0",
    course_id:"",
    p_name:"",
    desig_id:"0",
    email_id:"",
    mobile_no:"",
  }

  const resetDetails = {
    p_name:"",
    desig_id:"0",
    email_id:"",
    mobile_no:"",
  }



  const Nominations = () => {
    const {EntityID}=useSelector((state)=>state.user.userDetails);
    const [client_id, setClientID] = useState(EntityID)
    const [tc_id, setTCID] = useState("")    
    const [tt_sub_id, setTTID] = useState("")        
    const [coursesData, setCoursesData] = useState([]);
    const [ttSubData, setTTSubData] = useState([]);    
    const [mainTopicsData, setMainTopicsData] = useState([]);    
    const [subTopicsData, setSubTopicsData] = useState([]);        
    const [courseData, setCourseData] = useState([]);            
    const [coursePeriod, setCoursePeriod] = useState([]);                
    const [state, setState]=useState(initialValues);
    const [resetState, setResetState]=useState(resetDetails);    
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [trainingType, setTrainingType]=useState("0");    
    const [main_topic_id, setTopic]=useState("0");        
    const [courseID, setCourseID]=useState("0");            
    const [tcData, setTcData] = useState([]);                
    const [designationData, setDesignationData] = useState([]);                    
    const [nominationData, setNominationData] = useState([]);     
    
    const {course_id,p_name,desig_id,email_id,mobile_no} = state;  

    const {action, id} = useParams();

    useEffect(() => {
      axios.get("http://localhost:5000/get/designations")
      .then((response) => {setDesignationData(response.data);})
      .catch((err) => {console.log(err);});

      axios.get(`http://localhost:5000/get/training_types_sub`)
      .then((response) => {setTTSubData(response.data);})
      .catch((err) => {console.log(err);});


      // axios.get(`http://localhost:5000/clients/${client_id}`)
      // .then((response) => {setTCID(response.data[0].tc_id);
      // console.log("tcid:",response.data[0].tc_id)
      // })
      // .catch((err) => {console.log(err);});

      axios.get("http://localhost:5000/training_centres")
      .then((response) => {setTcData(response.data);})
      .catch((err) => {console.log(err);});
    }, []);

    useEffect(()=>{
      if(course_id>0)
        getNominationData(course_id, client_id);
    },[course_id])

    // useEffect(()=>{
    //   if(tc_id>0)
    //   axios.get(`http://localhost:5000/current_courses/${tc_id}`)
    //   .then((response) => {setCoursesData(response.data);})
    //   .catch((err) => {console.log(err);});
  
    // },[tc_id])


    // axios.get("http://localhost:5000/get/topics_main")
    // .then((response) => {setMainTopicsData(response.data);})
    // .catch((err) => {console.log(err);});



    const getNominationData = (course_id, client_id)=>{
  axios.get(`http://localhost:5000/nominations/${course_id}/${client_id}`)
  .then((response) => {setNominationData(response.data);})
  .catch((err) => {console.log(err);});        
}

const resetForm = () =>{
    setState(initialValues);
}

const deleteRecord = (id) =>{
    if(window.confirm("Are you  Sure?"))
    {
    console.log("coming in delete..."+course_id)
    axios.delete(`http://localhost:5000/delete/nominations/${id}`)
    getNominationData(course_id,client_id);
    toast.success("Record Deleted Successfully...")    
    // setTimeout(()=> getData(),500);
  }
}

const handleTC = (e) =>{
  setTCID(e.target.value)
}

const handleTT = (e) =>{
  console.log("TGT",e.target.value)  
  setTTID(e.target.value)
  console.log("TC:",tc_id) 
  console.log("DT:",cDate)  
  axios.get(`http://localhost:5000/get/courses/${tc_id}/${e.target.value}/${cDate}`)
      .then((response) => {
        setCourseData(response.data);
        const d1 = response.data[0].date_from;
        const d1date = new Date(d1);
      })
      .catch((err) => {
        console.log(err);
      });
}


const handleChange = (e) =>{
    const {name, value}=e.target;
    setState({...state, [name]:value});
    console.log(state)
    if(e.target.name === "tt_sub_id")
    {
      axios.get(`http://localhost:5000/get/courses/${tc_id}/${e.target.value}`)
      .then((response) => {
        setCourseData(response.data);
        const d1 = response.data[0].date_from;
        const d1date = new Date(d1);
      })
      .catch((err) => {
        console.log(err);
      });
    }else 
    if(e.target.name === "main_topic_id")
    {
      const course_id = e.target.value;
      setCourseID(course_id);
      axios.get(`http://localhost:5000/get/courses2/${course_id}`) 
      .then((response) => {
        const main_id = response.data[0].main_topic_id;
        setTopic(main_id);
        const dt1 = response.data[0].date_from;
        const dt1date = new Date(dt1);
        const dt2 = response.data[0].date_upto;
        const dt2date = new Date(dt2);
      })
      .catch((err) => {
        console.log(err);
      });
    }
}

const handleSubmit = (e) =>{
    e.preventDefault();
    if(e.target.name==="btnAdd")
    {
        const {course_id,p_name,desig_id,email_id,mobile_no} = state;  
        console.log("Course ID:"+course_id)
        console.log("Client ID:"+client_id)        
        axios.post("http://localhost:5000/post/nominations",
        {client_id,tc_id,course_id,p_name,desig_id,email_id,mobile_no})
        .then((res)=>
        {
            if(res.status==200)
            {
              axios.get(`http://localhost:5000/get/nominations/${course_id}`)
              .then((res)=>{
                getNominationData(course_id, client_id)
                setResetState(resetDetails);
            })
        }
        }).catch((err)=>
        {
            toast.error("Some isssue in Saving...");
        }); 
    }
}

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

const columns = [
    {
      name: 'Sl.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
    },
    {
      name: <b>Participant's Name</b>,
      selector: (row) => row.p_name,
      sortable: true,
      width:50,
    },
    {
      name: <b>Designation</b>,
      selector: (row) => row.designation,
      sortable: true,
    },
    {
        name: <b>EMail ID</b>,
        selector: (row) => row.email_id,
        sortable: true,
      },
      {
        name: <b>Mobile No.</b>,
        selector: (row) => row.mobile_no,
        sortable: true,
      },
    {
      name: "Action",
      width:"70px",
      cell: (row) => (
        <button className="btn btn-danger"  data-toggle=" tooltip" data-placement="bottom" title="Delete Record" onClick={()=>deleteRecord(row.id)}><i class="fa-solid fa-trash"></i></button>                
      ),
    },
  ];

  return (
    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Nominations"/>
          <Form.Group widths='equal'>          
          <div className="field">
          <label>INGAF Training Centre</label>
                <select 
                    // className="ui fluid dropdown" name="tc_id" value={tc_id} onChange={handleChange} readOnly={action} >
                    className="ui fluid dropdown" name="tc_id" value={tc_id} onChange={handleTC}>                      
                    <option value="0">---Select INGAF Training Centre---</option> 
                    {tcData.map((tc) => (
                    <option key={tc.id} value={tc.id}>{tc.description}</option>
                    ))};
                </select>
                <p className="error">{formErrors.tc_id}</p>                
          </div>

            <div className="field">
              <label>Training Type</label>
              <select 
                className="ui fluid dropdown" name="tt_sub_id" value={tt_sub_id} onChange={handleTT}>
                <option value="0">---Select Training Type---</option>
                {ttSubData.map((tts) => (
                  <option key={tts.id} value={tts.id}>{tts.description}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
                    <label>Select Course</label>
                    <select 
                        className="ui fluid dropdown" name="course_id" value={state.course_id} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Topic---</option>
                        {courseData.map((mtp) => (
                        <option key={mtp.course_id} value={mtp.course_id}>{mtp.topic} ( {convertDate(new Date(mtp.date_from))} to {convertDate(new Date(mtp.date_upto))} )</option>                                                 
                        ))};
                    </select>

            </div>

          </Form.Group>
          <h4 class="ui horizontal  divider">
            Nomination Details
          </h4>
        <Form.Group widths='equal' >
          <div className="field">
              <label>Participant's Name</label>
              <input type="text" name="p_name" autoComplete="off" value={state.p_name} placeholder="Name of the Participant" onChange={handleChange} />              
          </div>
          <div className="field">
              <label>Designation</label>
              <select 
                    className="ui fluid dropdown" name="desig_id" value={state.desig_id} onChange={handleChange}  >
                    <option value="0">---Select Designation---</option>
                    {designationData.map((dsg) => (
                    <option key={dsg.id} value={dsg.id}>{dsg.description}</option>
                    ))};
                </select>
                <p className="error">{formErrors.desig_id}</p>                

          </div>
          <div className="field">
               <label>E Mail ID</label>
                <input type="text" name="email_id" autoComplete="off" value={state.email_id} placeholder="E Mail ID" onChange={handleChange} />
          </div>
          <div className="field">
              <label>Mobile No.</label>
              <input type="text" name="mobile_no" autoComplete="off" value={state.mobile_no} placeholder="Mobile No." onChange={handleChange} />
          </div>

          <div className="field">
              <label style={{color:"white"}}>s</label>
              <button name="btnAdd" className="ui button primary w-20" onClick={handleSubmit} hidden={action? "hidden" : ""}>{id? "Update" : "Add"}</button>
          </div>
          </Form.Group>

        </div>
    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="450px"
    //   selectableRows
    //   selectableRowsHighlight
      highlightOnHover
      //  actions={<button className="btn btn-sm btn-primary">Export</button>}
      // actions={
      //   <a href="/UserRoles" className="btn btn-success pull-right">
      //     <span className="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Add New User Role
      //   </a>
      // }
    //   subHeader
    //   subHeaderComponent={
    //     <div className="input-group pull-right">
    //       <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
    //     <input
    //       type="text"
    //       className="w-25 form-control"
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //       placeholder="Type text to Search..."/>
    //               <a href="/States" className="btn btn-success pull-right">
    //       <span className="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Add New
    //     </a>
    //     </div>
    //   }
    //   subHeaderAlign="right"
      columns={columns}
      data={nominationData}
      pagination
    />


        </form>    
         <br/>
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/CourseList">
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          



    </div>
  );
};

export default Nominations
