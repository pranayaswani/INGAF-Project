import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from "../../CommonComponents/Header"
import { toast, ToastContainer } from "react-toastify";
import { Form } from 'semantic-ui-react'
import { convertDate } from '../../../Utils/Utils';
import DataTable from "react-data-table-component";

const initialValues = {
    bill_no:"1",
    bill_date:new Date(),    
    course_id:"0",      
    client_id:"0",  
    p_count:"0",
    fee:"0",    
    amount:"0",
    current_status:"3"
  }

  const BillGeneration = () => {
    const {EntityID}=useSelector((state)=>state.user.userDetails);
    const [tc_id, setTCID] = useState(EntityID)    
    const [trainingCentre, setTrainingCentre]=useState("");    

    
    const [ttMainData, setTTMainData] = useState([]);
    const [ttSubData, setTTSubData] = useState([]);    
    const [mainTopicsData, setMainTopicsData] = useState([]);    
    const [subTopicsData, setSubTopicsData] = useState([]);        
    const [courseData, setCourseData] = useState([]);            
    const [clientsData, setClientsData] = useState([]);                
    const [coursePeriod, setCoursePeriod] = useState([]);                
    const [state, setState]=useState(initialValues);
    // const [formErrors, setFormErrors]=useState({});
    // const [isSubmit, setIsSubmit]=useState(false);
    const [trainingType, setTrainingType]=useState("0");    
    const [main_topic_id, setTopic]=useState("0");        
    const [courseID, setCourseID]=useState("0");            
    const [clientID, setClientID]=useState("0");                
     const [tcData, setTcData] = useState([]);                
    const [billData, setBillData] = useState([]);                        

    const {client_id,course_id,p_name,desig_id,email_id,mobile_no} = state;  

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
      {
        getBillData(course_id);
        console.log("returned:",billData)
      }
    },[course_id])

const getBillData = (course_id)=>{
  axios.get(`http://localhost:5000/get/bill_info/${course_id}`)
  .then((response) => {
    console.log("bd:",response.data[0].client_id)
    setBillData(response.data);})
  .catch((err) => {console.log(err);});        
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

const generateBill = (client_id,p_count,fee,amount)=>{
//  console.log("genbIll",id, cnt, fee, amt)
  const {bill_no, bill_date,tc_id,course_id,current_status} = state;  
  //console.log("genbIll",id, cnt, fee, amt)  
  console.log("state",bill_no, bill_date, course_id)    
  axios.post("http://localhost:5000/post/bills",
  {bill_no, bill_date,tc_id,course_id,client_id,p_count,amount,current_status})
  .then((res)=>
  {
      if(res.status==200)
      {
          getBillData(course_id)
      }
    }
  ).catch((err)=>
  {
      toast.error("Some isssue in Saving...");
  }); 

  
}


 const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("coming bill generation post");
    const {bill_no, bill_date,tc_id,course_id,client_id,p_count,amount,current_status} = state;  
    console.log("CID:",client_id)
    axios.post("http://localhost:5000/post/bills",
    {bill_no, bill_date,tc_id,course_id,client_id,p_count,amount,current_status})
    .then((res)=>
    {
        if(res.status==200)
        {
            getBillData(course_id)
        }
      }
    ).catch((err)=>
    {
        toast.error("Some isssue in Saving...");
    }); 
 }


const columns = [
    {
      name: 'Sl.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
      width:"70px"
    },
    {
      name: 'Client ID',
      selector: (row, index) => row.client_id,
      disableSortBy: true,
      width:"70px"
    },

    {
      name: <b>Office Name</b>,
      selector: (row) => row.client_descr,
      sortable: true,
      width:"270px"
    },
    {
      name: <b>No. of Participants</b>,
      selector: (row) => row.no_of_participants,
      sortable: true,
      width:"170px"      
    },
    {
        name: <b>Fee/Participant</b>,
        selector: (row) => row.course_fee,
        sortable: true,
        width:"170px"        
      },
      {
        name: <b>Total Amount</b>,
        selector: (row) => row.amount,
        sortable: true,
        width:"170px"        
      },
      {
        name: "Action",
        width:"70px",
        cell: (row) => (

          //<button className="btn btn-primary" name="btnGenerateBill"  data-toggle=" tooltip" data-placement="bottom" title="Generate Bill" onClick={()=>setClientID(row.client_id)}>Generate Bill</button>                          
          <button className="btn btn-primary" name="btnGenerateBill"  data-toggle=" tooltip" data-placement="bottom" title="Generate Bill" onClick={()=>generateBill(row.client_id,row.no_of_participants,row.course_fee,row.amount)}>Generate Bill</button>                                    
          //<button                                                                                                                        onClick={()=>deleteRecord(row.id)}><i class="fa-solid fa-trash"></i></button>                          
        ),
      },
  ];

  return (
    <div className="ui container">
      <ToastContainer position="top-center" />      
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui segment">
          <Header caption="Bill Generation"/>
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
                        <option value={mtp.course_id}>{mtp.topic} ( {convertDate(new Date(mtp.date_from))} to {convertDate(new Date(mtp.date_upto))} )</option>                                                 
                        ))};
                    </select>

            </div>
            {/* <div className="field">
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
 */}
          </Form.Group>
        </div>
        <h4 class="ui horizontal  divider">
            Bill Details
          </h4>

    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      columns={columns}
      data={billData}
      pagination
    />


        </form>    
         {/* <br/>
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>Approve</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={handleReject}>Reject</button>
            &nbsp;&nbsp;&nbsp;&nbsp;Rejection Reasons: <input type="text" placeholder='Enter Rejections Reasons...'/>
            &nbsp;&nbsp;<button className="btn btn-success pull-right">Submit</button>                               */}
    </div>
  );
};

export default BillGeneration
