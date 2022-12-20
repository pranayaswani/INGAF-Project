import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../CommonComponents/Header';
import { toast } from "react-toastify";


const TrainingTypes = () => {
    const [statusData, setStatusData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/get/current_status")
        .then((response) => {
          setStatusData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const initialValues = {
        descr:"",
        status_id:"0"
    }

    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);

    const handleChange = (e) =>{
        const {name, value}=e.target;
        setFormValues({...formValues, [name]:value});
        console.log(formValues);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit)
        {
            console.log(formValues)
            const {descr, status_id} = formValues;
            console.log(descr);
            axios.post("http://localhost:5000/post/user_roles",{
                descr,status_id
              }).then(()=>{
                console.log("Record Inserted Successfully...");
              }).catch((err)=>{
                console.log(err);
              });
        
        }
    },[formErrors])

    const validate = (values) =>{
        const errors={};
        if(!values.descr){errors.descr = "This Field is REQUIRED.";}
        console.log('status:',values.status_id);
        if(values.status_id==="0"){errors.status_id = "Current Status is REQUIRED.";}        
        return errors;
    }
  return (
    <div className="ui container mt-2">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
    <form className='ui form' onSubmit={handleSubmit}> 
        <div className="ui segment">
            <Header caption = "User Roles"/>
            <div className="field">
                <label>User Role</label>
                <input type="text" name="descr" autoComplete='off' maxLength={20} value={formValues.descr} onChange={handleChange} />
            </div>
            <p className='error'>{formErrors.descr}</p>                            

            <div className="field">
                <label>Current Status</label>
                <select className="ui fluid dropdown" name="status_id" value={formValues.status_id} onChange={handleChange}>
                    <option value="0">---Select Current Status---</option>
                    {statusData.map((sts) => (
                    <option value={sts.id}>{sts.descr}</option>
                    ))};
                </select>
            </div>
            <p className='error'>{formErrors.status_id}</p>                                        
            <button className="ui button primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;<div className="ui button red">Reset</div>
        </div>        
    </form>
</div>
)
}

export default TrainingTypes;