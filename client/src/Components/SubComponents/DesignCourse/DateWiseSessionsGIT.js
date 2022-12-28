import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react'
import { toast, ToastContainer } from "react-toastify";
import { reverseDate } from '../../../Utils/Utils';



const DateWiseSessions = (props) => {

  const initialValues = {
    course_id:"36",
    course_date: new Date(reverseDate(props.cDate)),
    sub_topic_id1:"",
    sub_topic_id2:"",
    sub_topic_id3:"",
    sub_topic_id4:"",    
  }

  const [state, setState]=useState(initialValues);

  const {course_id, course_date,sub_topic_id1,sub_topic_id2,sub_topic_id3,sub_topic_id4} = state;

  
    const [subTopicsData, setSubTopicsData] = useState([]);
    useEffect(() => {
       axios.get(`http://localhost:5000/get/topics_sub/${props.mainTopic}`)
        .then((response) => {
          setSubTopicsData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
   },[props.mainTopic])

   useEffect(() => {
    if(!sub_topic_id1=="0")
    {
    console.log("UE:"+course_id+ " course date: "+course_date)
    axios.get(`http://localhost:5000/get/sessionwiseplan_check/${course_id}/${course_date}`)
    .then((res1)=>
    {
      if(res1.data.length>0)
      {
        console.log("coming in update...");
        axios.put(`http://localhost:5000/update/sessionwiseplan/${course_id}/${course_date}`,
          {course_id, course_date, sub_topic_id1, sub_topic_id2, sub_topic_id3, sub_topic_id4})
          .then((res)=>
          {
            if(res.status==200)    
            {
              //toast.success("Record Added Successfully...");
              // document.write("Record Added Successfully...");
              // setState(initialValues);
            }
          }).catch((err)=>
          {
            toast.error("Some isssue in Saving...");
          }); 
      }else
      { 
        console.log("state: "+JSON.stringify(state))
        console.log("coming in add...");
        axios.post("http://localhost:5000/post/sessionwiseplan",
        {course_id, course_date, sub_topic_id1, sub_topic_id2, sub_topic_id3, sub_topic_id4})
        .then((res)=>
        {
          if(res.status==200)
          {
            //toast.success("Record Added Successfully...");
            // document.write("Record Added Successfully...");
            // setState(initialValues);
          }
        }).catch((err)=>
        {
          toast.error("Some isssue in Saving...");
        }); 
      }
    }).catch((err)=>
    {
      toast.error("Some isssue in Saving...");
    }); 

  }
},[sub_topic_id1,sub_topic_id2,sub_topic_id3,sub_topic_id4])


   const handleChange = (e) =>{
    e.preventDefault();
    // alert(e.target.name);
    const {name, value}=e.target;
    // console.log("nm:"+e.target.name  + " vl:"+e.target.value)
    setState({...state,[name]:value})
    //  => {
    //   console.log(state)
    // });

    // console.log("state: "+JSON.stringify(state))
    // axios.post("http://localhost:5000/post/sessionwiseplan",
    // {course_id, course_date, sub_topic_id1, sub_topic_id2, sub_topic_id3, sub_topic_id4})
    // .then((res)=>
    // {
    //   alert('comng...'+e.target.name)
    //   if(res.status==200)
    //   {
    //     //toast.success("Record Added Successfully...");
    //     // document.write("Record Added Successfully...");
    //     // setState(initialValues);
    //   }
    // }).catch((err)=>
    // {
    //   toast.error("Some isssue in Saving...");
    // }); 
   }

    
  return (
    <div>
        <Form.Group widths='equal'>
          <div className="field">
            {/* <label>Date</label>             */}
            <label>{props.cDate}</label>
          </div>
          <div className="field">
              <select className="ui fluid dropdown" name="sub_topic_id1" value={state.sub_topic_id1} onChange={handleChange} >
                <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))};
              </select>
            </div>
            <div className="field">
              <select className="ui fluid dropdown" name="sub_topic_id2" value={state.sub_topic_id2} onChange={handleChange} >
                <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
              <select className="ui fluid dropdown" name="sub_topic_id3" value={state.sub_topic_id3} onChange={handleChange} >
              <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
              <select className="ui fluid dropdown" name="sub_topic_id4" value={state.sub_topic_id4} onChange={handleChange}>
              <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>
            </Form.Group>                    
    </div>
  )
}

export default DateWiseSessions
