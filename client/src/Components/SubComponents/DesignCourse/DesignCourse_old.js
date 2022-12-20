// import React,{useState, useEffect} from 'react';
// import axios from 'axios';
// import {Link, useParams} from 'react-router-dom';
// import Header from '../CommonComponents/Header

// import { toast, ToastContainer } from "react-toastify";

// const initialValues = {
//   tc_id:3,
//   emp_name:"",  
//   desig_id:"0",
//   phone_nos:"",    
//   mobile_no:"",      
//   email_id:"", 
//   user_role_id:"0",     
//   login_id:"",   
//   status_id:"0"
// }

// const DesignCourse = () => {
//     const [ttMainData, setTTMainData] = useState([]);
//     const [ttSubData, setTTSubData] = useState([]);    
//     const [mainTopicsData, setMainTopicsData] = useState([]);    
//     const [subTopicsData, setSubTopicsData] = useState([]);        
//     const [state, setState]=useState(initialValues);
//     const [formErrors, setFormErrors]=useState({});
//     const [isSubmit, setIsSubmit]=useState(false);
//     const [oldStatus, setOldStatus]=useState("");

//     //const {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = state;

//     const {action, id} = useParams();
     
//     // useEffect(()=>{
//     //   axios.get(`http://localhost:5000/getById/office_universe/${id}`)
//     //     .then((response) => {
//     //       const {id, tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = response.data[0];
//     //       setOldStatus(status_id);
//     //       setState({...response.data[0]})})
//     // },[id])


//     useEffect(() => {
//       axios.get("http://localhost:5000/get/training_type_main")
//         .then((response) => {
//           setTTMainData(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//         axios.get("http://localhost:5000/get/training_type_sub")
//         .then((response) => {
//           setTTSubData(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//         axios.get("http://localhost:5000/get/topics_main")
//         .then((response) => {
//           setMainTopicsData(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//         // axios.get("http://localhost:5000/get/user_roles")
//         // .then((response) => {
//         //   setRoleData(response.data);
//         // })
//         // .catch((err) => {
//         //   console.log(err);
//         // });
//     }, []);

//     const resetForm = () =>{
//         setState(initialValues);
//     }


//     const handleChange = (e) =>{
//         const {name, value}=e.target;
//         setState({...state, [name]:value});
//     }

//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         setFormErrors(validate(state));
//         setIsSubmit(true);
//     }

//     useEffect(()=>{
//         console.log(formErrors);
//         if(Object.keys(formErrors).length===0 && isSubmit)
//         {
//         //   const {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id} = state;
//         //   if((id && oldStatus != status_id))
//         //   {
//         //       axios.put(`http://localhost:5000/updateStatus/office_universe/${id}`,{
//         //         status_id
//         //         }).then((res)=>{
//         //           console.log(res);
//         //           if(res.status==200)
//         //           {
//         //             toast.success("Current Status Updated Successfully...");
//         //           }else
//         //           {
//         //             toast.error("Some isssue in Updation...");   
//         //           }
//         //         });
//         //     }
//         //     else
//         //     {
//         //       axios.get(`http://localhost:5000/get/office_universe_check/${emp_name}/${id}`)
//         //       .then((res1)=>
//         //       {
//         //         if(res1.data.length>0)
//         //         {
//         //           toast.error("Employee Name Already Exists...");     
//         //         }else
//         //         {
//         //           if(id)
//         //           {
//         //             axios.put(`http://localhost:5000/update/office_universe/${id}`,
//         //             {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id})
//         //             .then((res)=>
//         //             {
//         //               if(res.status==200)
//         //               {
//         //                 toast.success("Record Updated Successfully...");
//         //               }
//         //               }).catch((err)=>{
//         //                 toast.error("Some isssue...");
//         //               });
//         //           }else
//         //           {
//         //             axios.post("http://localhost:5000/post/office_universe",
//         //             {tc_id, emp_name, desig_id, phone_nos, mobile_no, email_id, user_role_id, login_id, status_id})
//         //             .then((res)=>
//         //             {
//         //               if(res.status==200)
//         //               {
//         //                 toast.success("Record Added Successfully...");
//         //                 setState(initialValues);
//         //               }
//         //             }).catch((err)=>
//         //             {
//         //               toast.error("Some isssue in Saving...");
//         //             }); 
//         //           }
//         //         }
//         //       })
//         //     }
//           }
//     },[formErrors])


//   const validate = (values) => {
//     const errors = {};
//     // if (!values.emp_name) {
//     //   errors.emp_name = "Employee Name is REQUIRED.";
//     // }else if (values.emp_name.length>40){
//     //     errors.emp_name = "Employee Name should not EXCEED 40 Characters.";
//     // }
//     // if (!values.mobile_no) {errors.mobile_no = "Mobile No. is REQUIRED.";}
//     // if (!values.login_id) { errors.login_id = "Login ID is REQUIRED.";}
//     // if(values.user_role_id==="0"){errors.user_role_id = "User Role is REQUIRED.";}          
//     // if(values.desig_id==="0"){errors.desig_id = "Designation is REQUIRED.";}          
//     // if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
//     return errors;
//   };
//   return (

//     <div className="ui container">
//       <ToastContainer position="top-center" />      
//       <form className="ui form" onSubmit={handleSubmit}>
//         <div className="ui segment">
//           <Header caption="Design Course"/>
//           <div className="field">
//             <label>Training Centre</label>
//             <input type="text" name="training_centre" readOnly value="INGAF (HQ), New Delhi" />
//           </div>
//           {/* <div className="two fields">
//             <div className="field">
//               <label>Training Type - Main</label>
//               <select 
//                 className="ui fluid dropdown" name="tt_main_id" value={state.tt_main_id} onChange={handleChange} readOnly={action} >
//                 <option value="0">---Select Training Type - Main---</option>
//                 {ttMainData.map((ttm) => (
//                   <option value={ttm.id}>{ttm.description}</option>
//                 ))}
//                 ;
//               </select>
//             </div>
//             <p className="error">{formErrors.tt_main_id}</p>
//             <div className="field">
//               <label>Training Type - Sub</label>
//               <select 
//                 className="ui fluid dropdown" name="tt_sub_id" value={state.tt_sub_id} onChange={handleChange} readOnly={action} >
//                 <option value="0">---Select Training Type - Sub---</option>
//                 {ttSubData.map((tts) => (
//                   <option value={tts.id}>{tts.description}</option>
//                 ))}
//                 ;
//               </select>
//             </div>
//             <p className="error">{formErrors.tt_sub_id}</p>

//           </div> */}
//           {/* <div className="two fields">
//                 <div className="field">
//                     <label>Topic - Main</label>
//                     <select 
//                         className="ui fluid dropdown" name="main_topic_id" value={state.tt_main_id} onChange={handleChange} readOnly={action} >
//                         <option value="0">---Select Topic - Main---</option>
//                         {mainTopicsData.map((mtp) => (
//                         <option value={mtp.id}>{mtp.description}</option>
//                         ))}
//                         ;
//                     </select>
//                     <p className="error">{formErrors.main_topic_id}</p>                    
//                 </div>

//                 <div className="field">
//                     <label>Training Mode</label>
//                     <select 
//                         className="ui fluid dropdown" name="mode_of_training" value={state.mode_of_training} onChange={handleChange} readOnly={action} >
//                         <option value="0">---Select Mode of Training---</option>
//                         <option value="1">---Online---</option>
//                         <option value="2">---Offline---</option>                                                
//                     </select>
//                     <p className="error">{formErrors.mode_of_training}</p>                    
//                 </div>
                    
            
//           </div>           */}
//           {/* <div className="two fields">

//             <div className="field">
//               <label>Period From :</label>
//               <input type="text" name="date_from" autoComplete="off" value={state.date_from} placeholder="Phone Nos." onChange={handleChange} readOnly={action}/>
//             </div>

//             <div className="field">
//               <label>Period Up to :</label>
//               <input type="text" name="date_upto" autoComplete="off" value={state.date_upto} placeholder="Mobile No." onChange={handleChange} readOnly={action}/>
//             </div>
//           </div> */}
//           {/* <div className="two fields">

//             <div className="field">
//               <label>Last Date of Nomination :</label>
//               <input type="text" name="last_date" autoComplete="off" value={state.last_date} placeholder="Mobile No." onChange={handleChange} readOnly={action}/>
//             </div>

//             <div className="field">
//               <label>Fee per Participant</label>
//               <input type="text" name="course_fee" autoComplete="off" value={state.course_fee} placeholder="Phone Nos." onChange={handleChange} readOnly={action}/>
//             </div>

//           </div>
//  */}

//           {/* <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
//             &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
//           <Link to ="/DesignCourseList">
//           <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                              
//           </Link>           */}

//         </div>
//       </form>
//     </div>
//   );
// };

// export default DesignCourse;


// const validate = (values) => {
//     const errors = {};
//     if (!values.course_fee) {errors.course = "Course Fee is REQUIRED.";
//     if(values.tt_main_id_id==="0"){errors.tt_main_id_id = "Training Type - Main is REQUIRED.";}          
//     if(values.tt_sub_id==="0"){errors.tt_sub_id = "Training Type - Sub is REQUIRED.";}              
//     if(values.main_topic_id==="0"){errors.main_topic_id = "Training Type - Sub is REQUIRED.";}                  
//     if(values.mode_of_training==="0"){errors.mode_of_training = "Mode of is REQUIRED.";}          
//     if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}          
//     return errors;
//   };
