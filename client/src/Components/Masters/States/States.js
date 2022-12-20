import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Header from '../../CommonComponents/Header';
import { toast, ToastContainer } from "react-toastify";

const initialValues = {
  descr:"",
  status_id:"0"
}

const States = () => {
    const [statusData, setStatusData] = useState([]);
    const [state, setState]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const [oldStatus, setOldStatus]=useState("");

    const {descr, status_id} = state;

    const {action, id} = useParams();
     
    useEffect(()=>{
      axios.get(`http://localhost:5000/getById/states/${id}`)
        .then((response) => {
          const {id, descr, status_id} = response.data[0];
          setOldStatus(status_id);
          setState({...response.data[0]})})
    },[id])


    useEffect(() => {
      axios.get("http://localhost:5000/get/current_status")
        .then((response) => {
          setStatusData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);



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

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit)
        {
            const {descr, status_id} = state;
            if((id && oldStatus != status_id))
            {
              axios.put(`http://localhost:5000/updateStatus/states/${id}`,{
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
              axios.get(`http://localhost:5000/get/states_check/${descr}`)
                        .then((res1)=>{
                        if(res1.data.length>0)
                        {
                            toast.error("Record Already Exists...");     
                        }else
                        {
                          if(id)
                          {
                            axios.put(`http://localhost:5000/update/states/${id}`,{
                              descr,status_id
                              }).then((res)=>{
                                if(res.status==200)
                                {
                                  toast.success("Record Updated Successfully...");
                                }
                              }).catch((err)=>{
                                toast.error("Some isssue...");
                              });
                          }else
                          {
                              axios.post("http://localhost:5000/post/states",
                              {descr,status_id})
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

    const validate = (values) =>{
        const errors={};
        if(!values.descr){errors.descr = "This Field is REQUIRED.";}
        console.log('status:',values.status_id);
        if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}        
        return errors;
    }

    // componentDidMount(){
    //   this.descr.focus();
    // };
  return (
    <div className="ui container mt-2">
        <ToastContainer position='top-center'/>
    <form className='ui form' onSubmit={handleSubmit}> 
        <div className="ui segment">
            <Header caption = "States"/>
            <div className="field">
                <label>State</label>
                <input type="text" autoFocus  name="descr" autoComplete='off' maxLength={20} value={state.descr || ""} onChange={handleChange} readOnly={action} />
            </div>
            <p className='error'>{formErrors.descr}</p>                            

            <div className="field">
                <label>Current Status</label>
                <select className="ui fluid dropdown" name="status_id" value={state.status_id || "0"} onChange={handleChange} readOnly={action}>
                    <option value="0">---Select Current Status---</option>
                    {statusData.map((sts) => (
                    <option value={sts.id}>{sts.descr}</option>
                    ))};
                </select>
            </div>
            <p className='error'>{formErrors.status_id}</p>                                        
            <button className="ui button primary w-20" hidden={action? "hidden" : ""}>{id? "Update" : "Save"}</button>
            {/* <input type="submit" className='btn btn-primary w-10' value={id? "Update" : "Save"}/> */}
            &nbsp;&nbsp;&nbsp;&nbsp;<button className="ui button red w-20" hidden={action? "hidden" : ""} disabled={id} onClick={resetForm}>Reset</button>
            <Link to ="/StatesList">
            <button className="btn btn-success pull-right"><span className="glyphicon glyphicon-triangle-left"></span>&nbsp;&nbsp;Go Back</button>                    
            </Link>          
        </div>        
    </form>
</div>
)
}

export default States;