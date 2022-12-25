import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react'


const DateWiseSessions = (props) => {
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
    
  return (
    <div>
        <Form.Group widths='equal'>
          <div className="field">
            {/* <label>Date</label>             */}
            <label>{props.cDate}</label>
          </div>
          <div className="field">
            {/* <label>1st Session</label> */}
              <select className="ui fluid dropdown" name="sub_topic_id" onChange={handleChange(1)} >
                <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))};
              </select>
            </div>
            <div className="field">
            {/* <label>2nd Session</label> */}
              <select className="ui fluid dropdown" name="sub_topic_id" onChange={handleChange(2)} >
                <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
            {/* <label>3rd Session</label> */}
              <select className="ui fluid dropdown" name="sub_topic_id" onChange={handleChange(3)} >
              <option value="0">---Select Topic---</option>
                {subTopicsData.map((std) => (
                  <option value={std.id}>{std.descr}</option>
                ))}
                ;
              </select>
            </div>
            <div className="field">
            {/* <label>4th Session</label> */}
              <select className="ui fluid dropdown" name="sub_topic_id" onChange={handleChange(4)}>
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
