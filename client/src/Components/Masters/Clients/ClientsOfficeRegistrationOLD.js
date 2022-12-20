import React, {useState} from "react";


const ClientOfficeRegistration = () => {

  const initialValues={
    office_name:"",
    contact_person:""
  };


  const [formValues, setFormValues]=useState(initialValues);

  const handleChange = (e) => {
    console.log(e.target);
    setFormValues(formValues);
    
  }




 
  // const handlSubmit = (e) =>{  
  //   e.preventDefault();
  //   console.log("controller:",controller_code);
  //   axios.post("http://localhost:5000/post/clients",{
  //     controller_code, office_name,
  //     // controller_code,office_name,address,state_code,pao_code,contact_person,email_id,phone_nos, mobile_no, nearest_tc,
  //   }).then(()=>{
  //     // setState({training_type:"", status:""});
  //     // toast.success("Record Inserted Successfully...");
  //     console.log("Record inserted successfully...");
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  // }
  return (
    <div style={{alignContent:"center", width:1100}} className="card">
      <div className="row col-md-8 ">
        <div className="panel panel-primary mt-3">
          <div  className="panel-heading text-center panel-relative mt-2">
            <h3>Client Office Registration</h3>
          </div>
          <div className="panel-body jumbotron">
            <form >
              <div className="field">
                <label htmlFor="office_name">Office Name</label>                
                <input type="text" autoComplete="off" className="form-control" name="office_name" 
                value={formValues.office_name} onChange={handleChange}/>
              </div>
              <br />
              <div className="input-group">
                <label htmlFor="contact_person">Contact Person</label>                
                <input type="text" autoComplete="off" className="form-control" name="contact_person" value={formValues.contact_person}/>
              </div>
              <br />

              <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-danger">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOfficeRegistration;
