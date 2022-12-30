import React, { useState, useEffect } from "react";
import DesignCourse from "./DesignCourse";
import Header from './../../CommonComponents/Header'
import {Link} from 'react-router-dom';
import { Form } from 'semantic-ui-react'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { convertDate } from '../../../Utils/Utils';


const initialValues = {
    dateFrom:new Date(),    
    dateUpto:new Date(),      
  }


// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const GenerateCalendar = () => {
  const [tblData, setData] = useState([]);
  const [state, setState] = useState(initialValues);      
  const [selectedData, setSelectedData] = useState([]);  

  const {dateFrom, dateUpto} = state;

  const handleChange = (e) =>{
    const {name, value}=e.target;
    setState({...state, [name]:value});
  }
// link selected rows: https://stackoverflow.com/questions/67983059/react-data-table-component-access-the-selected-row-and-assign-it-to-setstate
  const handleChangeSelectedRows = (state) =>{
    setSelectedData(state.selectedRows);
    console.log(selectedData);
  }


  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      console.log("date1:"+dateFrom)
      console.log("date1:"+dateUpto)      
      const response = await axios.get(`http://localhost:5000/get/courses/${dateFrom}/${dateUpto}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const updateRecord = (id) =>{
//     <Link to={`/DesignCourse/${id}`}></Link>
//     axios.get(`http://localhost:5000/get/courses/${id}`)
//   }



  // useEffect(() => {
  //   getData();
  // }, []);


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
              <input type="text" name="tc_id" readOnly value="INGAF (HQ), New Delhi" />
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
      onSelectedRowsChange={handleChangeSelectedRows}
      selectableRowsHighlight
      highlightOnHover
      columns={columns}
      data={tblData}

      pagination
    />
    <button className="btn btn-primary ">Generate Calendar</button>                              
    <button className="btn btn-primary pull-right ">Submit For Approval</button>                              
    </div>
  );
};

export default GenerateCalendar;
