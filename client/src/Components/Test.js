import React, {useState} from 'react'
import axios from 'axios'


const Test = () => {
    const resetForm = () =>{
        setMyName('');
        alert('inserted...');
    }
    const [myName, setMyName]=useState("");
    const handleChange = (e) => {
        const {name, value}=e.target;        
        setMyName(value);
        console.log(myName);
    }

    const handleSubmit = () =>{
        console.log("value is ", myName);
        axios.post("http://localhost:5000/post/guddu",{
            myName
          }).then((result)=>{
            resetForm();
          }).catch((err)=>{
            console.log(err);
          });

    }


  return (
    <div>
        <div className='container'>
      <h1>Hello Guddu, Good Morning...</h1>
      Enter Your Name :
       <input type="text" id="emp_name" name="emp_name" value={myName} onChange={handleChange}/>
       <br/>
      <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>&nbsp;&nbsp;
      <button className='btn btn-danger' onClick={resetForm}>Reset</button>
      </div>
    </div>
  )
}

export default Test
