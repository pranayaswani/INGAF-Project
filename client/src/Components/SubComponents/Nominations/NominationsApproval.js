import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
//import Header from "../../CommonComponents/Header"
import Header from "../../CommonComponents/Header"
import { toast, ToastContainer } from "react-toastify";
import { Form } from 'semantic-ui-react'
import { convertDate, reverseDateAsString } from '../../../Utils/Utils';
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux';

const cDate = reverseDateAsString(convertDate(new Date()));

const initialValues = {
    // client_id:"0",  
    nomination_id:"",
  }

  const NominationsApproval = () => {

    const {EntityID}=useSelector((state)=>state.user.userDetails);
    const [tcID, setTCID] = useState(EntityID)    
    const [trainingCentre, setTrainingCentre]=useState("");    
    const [remarks, setRemarks]=useState("");        
    console.log("TCID:",tcID)
  
    const [ttMainData, setTTMainData] = useState([]);
    const [ttSubData, setTTSubData] = useState([]);    
    const [mainTopicsData, setMainTopicsData] = useState([]);    
    const [subTopicsData, setSubTopicsData] = useState([]);        
    const [courseData, setCourseData] = useState([]);            
    const [clientsData, setClientsData] = useState([]);                
    const [coursePeriod, setCoursePeriod] = useState([]);                
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [trainingType, setTrainingType]=useState("0");    
    const [main_topic_id, setTopic]=useState("0");        
    const [courseID, setCourseID]=useState("0");            
    const [clientID, setClientID]=useState("0");                
    const [tcData, setTcData] = useState([]);                
    const [nominationData, setNominationData] = useState([]); 
    const [selectedData, setSelectedData] = useState([]);                             
    const [toggleCleared, setToggleCleared] = useState(true);

    const {client_id,course_id,tc_id,p_name,desig_id,email_id,mobile_no} = state;  

    const {action, id} = useParams();

    useEffect(() => {
      axios.get("http://localhost:5000/get/training_types_sub")
      .then((response) => {setTTSubData(response.data);})
      .catch((err) => {console.log(err);});

      axios.get("http://localhost:5000/get/topics_main")
      .then((response) => {setMainTopicsData(response.data);})
      .catch((err) => {console.log(err);});

      axios.get("http://localhost:5000/get/training_centres")
      .then((response) => {setTcData(response.data);})
      .catch((err) => {console.log(err);});        

      axios.get("http://localhost:5000/get/clients")
      .then((response) => {setClientsData(response.data);})
      .catch((err) => {console.log(err);});        

    }, []);

    useEffect(()=>{
      if(course_id>0)
        getNominationData(course_id, client_id);
    },[client_id])

const getNominationData = (course_id, client_id)=>{
  axios.get(`http://localhost:5000/nominations/${course_id}/${client_id}`)
  .then((response) => {setNominationData(response.data);})
  .catch((err) => {console.log(err);});        
}

const handleChangeSelectedRows = (state) =>{
  setSelectedData(state.selectedRows);
  // console.log("selectd courses: ",selectedData);
}


const handleChange = (e) =>{
    const {name, value}=e.target;
    setState({...state, [name]:value});
    if(e.target.name === "tt_sub_id")
    {
      console.log("coming to select course data..")
      axios.get(`http://localhost:5000/get/courses/${tcID}/${e.target.value}`)
      .then((response) => {
        setCourseData(response.data);
        console.log("CD:",courseData)
        // const d1 = response.data[0].date_from;
        // const d1date = new Date(d1);
      })
      .catch((err) => {
        console.log(err);
      });
    }else 
    if(e.target.name === "course_id")
    {
      const course_id = e.target.value;
      setCourseID(course_id);
      console.log("CourseID:",course_id)
      axios.get(`http://localhost:5000/get/clientsNom/${course_id}`) 
      .then((response) => {
        //const main_id = response.data[0].main_topic_id;
        setClientsData(response.data);
        // const dt1 = response.data[0].date_from;
        // const dt1date = new Date(dt1);
        // const dt2 = response.data[0].date_upto;
        // const dt2date = new Date(dt2);
      })
      .catch((err) => {
        console.log(err);
      });
    }else if(e.target.name === "client_id")
    {
      const client_id = e.target.value;
      setClientID(13);
      console.clear();
      console.log("ClientID:",clientID)
      //axios.get(`http://localhost:5000/nominations/${courseID}/${clientID}`) 
      console.log("coming here...")
      axios.get(`http://localhost:5000/nominations/183/13`)       
      .then((response) => {
        //const main_id = response.data[0].main_topic_id;
        setNominationData(response.data);
        console.log("Nom:",nominationData)
        // const dt1 = response.data[0].date_from;
        // const dt1date = new Date(dt1);
        // const dt2 = response.data[0].date_upto;
        // const dt2date = new Date(dt2);
      })
      .catch((err) => {
        console.log(err);
      });
    }


}

const handleReject = () => {
  console.log("selected nominations: ",selectedData);
  var nomination_ids=0;
  nomination_ids=selectedData.map((sel)=>{
    return sel.id;
  })
  console.log("selected IDs: ",nomination_ids);
  const action='R';
  console.log("Remarks:",remarks)
  axios.put(`http://localhost:5000/nominations/${action}`,
  {nomination_ids,remarks})
  .then((res)=>
  {
    // const response = axios.get(`http://localhost:5000/nominations/${dateFrom}/${dateUpto}`);
    // // console.log(response);
    // setData(response.data);
      setToggleCleared(!toggleCleared);
      toast.success("Nominations Rejected...");
    }
  ).catch((err)=>
  {
      toast.error("Some isssue in Rejection...");
  }); 

  

}
const handleApprove = () => {
  console.log("selected nominations: ",selectedData);
  var nomination_ids=0;
  nomination_ids=selectedData.map((sel)=>{
    return sel.id;
  })
  console.log("selected IDs: ",nomination_ids);
  const action='Y';
  setRemarks('');
  axios.put(`http://localhost:5000/nominations/${action}`,
  {nomination_ids,remarks})
  .then((res)=>
  {
    // const response = axios.get(`http://localhost:5000/nominations/${dateFrom}/${dateUpto}`);
    // // console.log(response);
    // setData(response.data);
      setToggleCleared(!toggleCleared);
      toast.success("Nominations Approved...");
    }
  ).catch((err)=>
  {
      toast.error("Some isssue in Approval...");
  }); 

}


 const handleSubmit = (e) =>{
//     e.preventDefault();
//     if(e.target.name==="btnAdd")
//     {
//         const {client_id,tc_id,course_id,p_name,desig_id,email_id,mobile_no} = state;  
//         console.log("Course ID:"+course_id)
//         axios.post("http://localhost:5000/post/nominations",
//         {client_id,tc_id,course_id,p_name,desig_id,email_id,mobile_no})
//         .then((res)=>
//         {
//             if(res.status==200)
//             {
//               axios.get(`http://localhost:5000/get/nominations/${course_id}`)
//               .then((res)=>{
//                 getNominationData(course_id)
//                 setResetState(resetDetails);
//             })
//         }
//         }).catch((err)=>
//         {
//             toast.error("Some isssue in Saving...");
//         }); 
//     }
 }


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
  ];

  return (
    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Nominations - Approval"/>
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
                        className="ui fluid dropdown" name="course_id" value={state.course_id} onChange={handleChange} readOnly={action} >
                        <option value="0">---Select Topic---</option>
                        {courseData.map((mtp) => (
                        <option value={mtp.id}>{mtp.main_topic} ( {convertDate(new Date(mtp.date_from))} to {convertDate(new Date(mtp.date_upto))} )</option>                                                 
                        ))};
                    </select>

            </div>
            <div className="field">
          <label>Client Office</label>
                <select 
                    className="ui fluid dropdown" name="client_id" value={state.client_id} onChange={handleChange} readOnly={action} >
                    <option value="0">---Select Client Office---</option>
                    {clientsData.map((cd) => (
                    <option value={cd.id}>{cd.client_descr}</option>
                    ))};
                </select>
                <p className="error">{formErrors.client_id}</p>                
          </div>

          </Form.Group>
        </div>
        <h4 class="ui horizontal  divider">
            Nomination Details
          </h4>

    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChangeSelectedRows}      
      selectableRowsHighlight
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
          <button className="ui button primary w-20" hidden={action? "hidden" : ""} onClick={handleApprove}>Approve</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={handleReject}>Reject</button>
            &nbsp;&nbsp;&nbsp;&nbsp;Rejection Reasons: <input type="text" name='remarks' value={remarks} placeholder='Enter Rejections Reasons...' onChange={(e)=>setRemarks(e.target.value)} />
            &nbsp;&nbsp;<button className="btn btn-success pull-right">Submit</button>                              
    </div>
  );
};

export default NominationsApproval
