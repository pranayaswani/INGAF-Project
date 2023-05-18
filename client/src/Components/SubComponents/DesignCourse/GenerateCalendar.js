import React, { useState, useEffect } from "react";
import DesignCourse from "./DesignCourse";
import Header from './../../CommonComponents/Header'
import {Link} from 'react-router-dom';
import { Form } from 'semantic-ui-react'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { convertDate } from '../../../Utils/Utils';
import { useSelector } from 'react-redux';


const initialValues = {
    dateFrom:new Date(2023,1,1),    
    dateUpto:new Date(2023,4,1),      
  }


// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const GenerateCalendar = () => {
  const [tblData, setData] = useState([]);
  const [state, setState] = useState(initialValues);      
  const [selectedData, setSelectedData] = useState([]);  
  const [toggleCleared, setToggleCleared] = useState(true);
  const {EntityID}=useSelector((state)=>state.user.userDetails);
  const [tc_id, setTCID] = useState(EntityID)    
  const [trainingCentre, setTrainingCentre]=useState("");    

  const {dateFrom, dateUpto} = state;

  const handleChange = (e) =>{
    const {name, value}=e.target;
    setState({...state, [name]:value});
  }
// link selected rows: https://stackoverflow.com/questions/67983059/react-data-table-component-access-the-selected-row-and-assign-it-to-setstate
  const handleChangeSelectedRows = (state) =>{
    setSelectedData(state.selectedRows);
    // console.log("selectd courses: ",selectedData);
  }

  const updateCalendar = () =>{
    console.log("selectd courses: ",selectedData);
    var course_ids=0;
    course_ids=selectedData.map((sel)=>{
      return sel.id;
    })
    console.log("selected IDs: ",course_ids);
    axios.put("http://localhost:5000/calendar",
    {course_ids})
    .then((res)=>
    {
      const response = axios.get(`http://localhost:5000/get/courses/${dateFrom}/${dateUpto}`);
      // console.log(response);
      setData(response.data);
        setToggleCleared(!toggleCleared);
        toast.success("Calendar Generated...");
      }
    ).catch((err)=>
    {
        toast.error("Some isssue in Saving...");
    }); 
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log("fr",dateFrom)
    console.log("to",dateUpto)    
    try {
      const response = await axios.get(`http://localhost:5000/get/courses4/${tc_id}/${dateFrom}/${dateUpto}`);
      // console.log(response);
      setData(response.data);
      console.log("data:",tblData)
    } catch (error) {
      console.log(error);
    }
  };

//   const updateRecord = (id) =>{
//     <Link to={`/DesignCourse/${id}`}></Link>
//     axios.get(`http://localhost:5000/get/courses/${id}`)
//   }



 useEffect(() => {
    axios.get(`http://localhost:5000/training_centres/${tc_id}`)
    .then((response) => {
      setTrainingCentre(response.data[0].descr);
    })
    .catch((err) => {
      setTrainingCentre("INVALID Training Centre");
    });
 }, []);


  // useEffect(() => {
  //   const result = tblData.filter((dt) => {
  //     return dt.main_topic.toLowerCase().match(search.toLowerCase());
  //   //   toast.success("Record Deleted Successfully...");
  //   });
  //   setFilteredData(result);
  // }, [search]);

  const action = "view";
  const columns = [
    {
      name: 'S.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
      width:"70px"
    },
    // {
    //   name: 'ID',
    //   selector: (row, index) => row.id,
    //   disableSortBy: true,
    //   width:"70px"
    // },

    {
        name: <b>Training Type</b>,
        selector: (row) => row.training_type,
        sortable: true,
        width:"250px"                
      },
    {
        name: <b>Main Topic</b>,
        selector: (row) => row.main_topic,
        sortable: true,
        width:"150px"        
      },
      {
        name: <b>Date From</b>,
        selector: (row) => convertDate(new Date(row.date_from)),
        sortable: true,
        width:"112px"
      },

      {
        name: <b>Date Upto</b>,
        selector: (row) => convertDate(new Date(row.date_upto)),
        sortable: true,
        width:"112px"
      },
      {
        name: <b>Mode</b>,
        selector: (row) => row.mode_of_training ==1 ? "Online":"Offline",
        sortable: true,
        width:'100px'
      },

    //   {
    //     name: <b>Approved?</b>,
    //     selector: (row) => row.is_approved,
    //     sortable: true,
    //     width:'100px'
    //   },
    {
      name: <b>Current Status</b>,
      selector: (row) => row.sts,
      sortable: true,
      width:'150px'
    },
    {
      name: "Action",
      width:"70px",
      cell: (row) => (

        <Link to={`/DesignCourse/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Course Details"><i class="fa-solid fa-eye"></i></button>                
          </Link>
        ),
    },
  ];

  return (
    <div className="ui container">
        {/* <form className="ui form" onSubmit={handleSubmit}> */}
        <form className="ui form" >        
            <div className="ui segment">
                <Header caption="Generate Calendar"/>
            </div>

            <Form.Group widths='equal'>            
            <div className="field">
            <label>Training Centre</label>
            <input type="text" name="tc_id" readOnly value={trainingCentre} />
          </div>
         
                <div className="field">
                    <label>Period From</label>
                    <input type="date" value={state.dateFrom} onChange={handleChange}  name="dateFrom" />                    
                    {/* <input type="date" value={state.date_from}  onChange={handleChange} readOnly={action}/>                     */}
                </div>
                <div className="field">
                    <label>Period Upto</label>
                    <input type="date" name="dateUpto" value={state.dateUpto} onChange={handleChange} />                                        
                </div>
                <div className="field">
                    <label style={{color:"white"}}>s</label>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>                              
                </div>
            </Form.Group>

        </form>
        <DataTable
    //   title="Courses - List"
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChangeSelectedRows}
      selectableRowsHighlight
      highlightOnHover
      columns={columns}
      data={tblData}

      pagination
    />
    <button className="btn btn-primary" onClick={updateCalendar}>Generate Calendar</button>                              
    <button className="btn btn-primary pull-right ">Submit For Approval</button>                              
    </div>
  );
};

export default GenerateCalendar;
