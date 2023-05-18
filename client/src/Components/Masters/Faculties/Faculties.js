import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { Form } from 'semantic-ui-react'
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Multiselect from 'multiselect-react-dropdown';
import dummy from './../../../api/dummy';

const initialValues = {
  tc_id:3,
  faculty_name:"",  
  office_name:"",    
  desig_id:"0",
  phone_nos:"",    
  mobile_no:"",      
  email_id:"", 
  status_id:"0"
}


const Faculties = () => {
    const [statusData, setStatusData] = useState([]);
    const [designationData, setDesignationData] = useState([]);    

    const [topicsData, setTopicsData] = useState([]);        
    const [subTopicsData, setSubTopicsData] = useState([]);            
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [topicID, setTopicID]=useState("");
    const [subTopics, setSubTopics] = useState([]);      
    const [options, setOptions]= useState([]);      

    // const options = [
    //   {name: '---Select Topic---', id: 0},
    //   {name: 'PFMS', id: 1},
    //   {name: 'MS-Office', id: 2},
    //   {name: 'Office Rules', id: 3},
    //   {name: 'Programming', id: 4},      
    // ]
    
//     const loadOptions = async () => {
//       // Fetch data from API or other source based on inputValue
//       console.log("Selected Topics (loadoptions):",topicID);
//       const subTopic=[];
//       const response = axios.get(`http://localhost:5000/get/sub_topics/${topicID}`)
// //      const response = await fetch(`https://my-api.com/search?q=${inputValue}`);
//       const data = await response.json();
//       const options = data.map(item => ({
//         label: item.description,
//         value: item.id
//       }));
      
//       return options;
//     };
    const {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id} = state;

    const {action, id} = useParams();
     
    // useEffect(()=>{
    //   axios.get(`http://localhost:5000/getById/faculties/${id}`)
    //     .then((response) => {
    //       const {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id} = response.data[0];
    //       // setOldStatus(status_id);
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
        axios.get("http://localhost:5000/get/designations")
        .then((response) => {
          setDesignationData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      
        axios.get("http://localhost:5000/topics_main")
        .then((response) => {
          console.log("Main Topics NEW API:",response.data);
          setTopicsData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });        

        // axios.get("http://localhost:5000/get/faculty_topics/5")
        // .then((response) => {
        //   setTopicsData(response.data);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }, []);

   
    // const fetchData = () => {
    //   axios.get("http://localhost:5000/get/topics_main")
    //   .then((response) => {
    //     console.log("Main Topics:",response.data);
    //     setTopicsData(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }

    // const options=[
    //   {label: 'PFMS', value: 1},
    //   {label: 'MS-Office', value: 2},
    //   {label: 'Office Rules', value: 3},
    //   {label: 'Programming', value: 4},      
    // ]

    // const animatedComponents = makeAnimated();


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

    const justChecking = async () =>{
      const response = await axios.get(`https://reqres.in/api/users?page=1`)
      const result = await response.data
      return await result.permissions.map((permission) => ({
        label: permission.first_name,
        value: permission.id
      }))


      // return dummy.get('/users?page=1')
      // .then(result =>{
      //   const res = result.data.data;
      //   return res;
      // })
    }

    const handleSelect = (e) =>{
      setTopicID(e.target.value);
      console.log("Selected Topics:",e.target.value);
        console.log("MT:",e.target.value)
        axios.get(`http://localhost:5000/get/sub_topics/${e.target.value}`)
        .then((response) => {
          setSubTopics(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    
        // const response = axios.get(`http://localhost:5000/get/sub_topics/${e.target.value}`)
        //   const data = response.data;
          // console.log("Data:",data);
          // setSubTopics(data)
          console.log("STP:",subTopics)
          const opts = subTopics.map(item => ({
            name: item.descr,
            // value: item.id
      }))
      console.log("Options:",opts)
      setOptions(opts);
    }

      // const subTopic=[];
      // axios.get(`http://localhost:5000/get/sub_topics/${topicID}`)
      // //axios.get(`http://localhost:5000/get/topics_sub/${topicID}`)      
      // .then((response) => {
      //   // console.log("subtopics",response.data[0].descr)
      //   // for(let i=0;i<response.data.length;i++)
      //   //   subTopic.push(response.data[i].descr)
      //   setSubTopics(response.data);
      //   // console.log('array-sub',subTopic)
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    // }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit)
        {
          const {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id} = state;
          // if((id && oldStatus != status_id))
          if(id)          
          {
              axios.put(`http://localhost:5000/updateStatus/faculties/${id}`,{
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
              axios.get(`http://localhost:5000/get/faculties_check/${faculty_name}/${id}`)
              .then((res1)=>
              {
                if(res1.data.length>0)
                {
                  toast.error("Faculty Already Exists...");     
                }else
                {
                  if(id)
                  {
                    axios.put(`http://localhost:5000/update/faculties/${id}`,
                    {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id})
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
                    axios.post("http://localhost:5000/post/faculties",
                    {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id})
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
    if (!values.faculty_name) {errors.faculty_name = "Faculty Name is REQUIRED.";}
    if (!values.office_name) {errors.office_name = "Office Name is REQUIRED.";}    
    if (!values.mobile_no) {errors.mobile_no = "Mobile No. is REQUIRED.";}
    if (!values.email_id) {errors.email_id = "EMail ID is REQUIRED.";}    
    if(values.desig_id==="0"){errors.desig_id = "Designation is REQUIRED.";}          
    if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
    return errors;
  };

  const deleteRecord = (id) =>{
    if(window.confirm("Are you  Sure?"))
    {
    // console.log("coming in delete..."+course_id)
    axios.delete(`http://localhost:5000/delete/faculty_topics/${id}`)
    // getTopicsData(course_id,client_id);
    // toast.success("Record Deleted Successfully...")    
    // setTimeout(()=> getData(),500);
  }
}


  const columns = [
    {
      name: 'Sl.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
      width:"100px",
    },
    {
      name: <b>Main Topic</b>,
      selector: (row) => row.main_topic,
      sortable: true,
      width:"200px",
    },
    {
      name: <b>Sub-Topics</b>,
      selector: (row) => row.sub_topics_descr,
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
          <Header caption="Faculties"/>
          {/* <div className="field">
            <label>Training Centre</label>
            <input type="text" name="training_centre" readOnly value="INGAF (HQ), New Delhi" />
          </div> */}
          <div className="two fields">
            <div className="field">
              <label>Faculty Name</label>
              <div className="field">
                <input type="text" name="faculty_name" autoFocus maxLength={40} autoComplete="off" value={state.faculty_name || ""} placeholder="Faculty Name" onChange={handleChange} readOnly={action} />
              </div>
              <p className="error">{formErrors.faculty_name}</p>
            </div>
            <div className="field">
              <label>Office Name</label>
              <div className="field">
                <input type="text" name="office_name" maxLength={100} autoComplete="off" value={state.office_name || ""} placeholder="Office Name" onChange={handleChange} readOnly={action} />
              </div>
              <p className="error">{formErrors.office_name}</p>              
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
              <p className="error">{formErrors.desig_id}</p>              

            </div>            
          </div>
          <div className="two fields">
            <div className="field">
              <label>E Mail ID</label>
              <div className="field">
                <input type="text" name="email_id" autoComplete="off" value={state.email_id} placeholder="E Mail ID" onChange={handleChange} readOnly={action}/>
              </div>
              <p className="error">{formErrors.email_id}</p>
            </div>

            <div className="field">
              <label>Phone Nos.</label>
              <input type="text" name="phone_nos" autoComplete="off" value={state.phone_nos} placeholder="Phone Nos." onChange={handleChange} readOnly={action}/>
            </div>
            <div className="field">
              <label>Mobile No.</label>
              <input type="text" name="mobile_no" autoComplete="off" value={state.mobile_no} placeholder="Mobile No." onChange={handleChange} readOnly={action}/>
            </div>
            <p className="error">{formErrors.mobile_no}</p>            
          </div>
          <h4 class="ui horizontal  divider">
            Topic Details
          </h4>
        <Form.Group widths='equal' >
          <div className="field">
              <label>Main Topic</label>
              <select 
                className="ui fluid dropdown" name="topicID" value={topicID} onChange={handleSelect} readOnly={action} >
                <option value="0">---Select Main Topic---</option>
                {topicsData.map((topic) => (
                  <option value={topic.id}>{topic.description}</option>
                ))}
                ;
              </select>
              {/* <p className="error">{formErrors.topicID}</p>               */}
          </div>
          <div className="field">
              <label>Sub-Topics</label>
              {/* <select multiple
                className="ui fluid dropdown" name="subTopics" value={subTopics} readOnly={action} >
                <option value="0">---Select Sub-Topics---</option>
                {subTopics.map((stopic) => (
                  <option value={stopic.descr}>{stopic.descr}</option>
                ))}
                ;
              </select> */}
              {/* link to check: https://react-select.com/home */}
              <Multiselect
                //Link: https://www.youtube.com/watch?v=OtEqBBcPREY&t=641s
                options={options} //; id:item.id
                
                
                showCheckbox
                selectedValues={1} // Preselected value to persist in dropdown
                onSelect={(e)=>console.log(e)} // Function will trigger on select event
                onRemove={(e)=>console.log(e)} // Function will trigger on remove event
                displayValue="descr" // Property name to display in the dropdown options
                />        

              {/* <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={topicsData.description}
                  className="basic-multi-select"
                  classNamePrefix="select"
                /> */}

              {/* <AsyncSelect 
                isMulti 
                cacheOptions 
                loadOptions={justChecking}
              // cacheOptions
              // defaultOptions
              
              // // value={selectedValue}
              // getOptionLabel={e => e.first_name}
              // getOptionValue={e => e.id}              
               /> 
 */}
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
      highlightOnHover
      columns={columns}
      data={topicsData}
      pagination
    />


        </form>    
         <br/>
          <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
          <Link to ="/FacultiesList">
          <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
          </Link>          



    </div>
  );
};

export default Faculties;
