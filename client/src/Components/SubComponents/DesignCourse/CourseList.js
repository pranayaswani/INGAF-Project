import React, { useState, useEffect } from "react";
import DesignCourse from "./DesignCourse";
import {Link} from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { convertDate } from '../../../Utils/Utils';


// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const CourseList = () => {
  const [tblData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get/courses");
      console.log(response);
      setData(response.data);

      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = (id) =>{
    if(window.confirm("Are you  Sure?"))
    {
    axios.delete(`http://localhost:5000/delete/courses/${id}`)
    toast.success("Record Deleted Successfully...")    
    setTimeout(()=> getData(),500);}
  }
  const updateRecord = (id) =>{
    <Link to={`/DesignCourse/${id}`}></Link>
    axios.get(`http://localhost:5000/get/courses/${id}`)
  }

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    const result = tblData.filter((dt) => {
      return dt.main_topic.toLowerCase().match(search.toLowerCase());
    //   toast.success("Record Deleted Successfully...");
    });
    setFilteredData(result);
  }, [search]);

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
        width:"250px"        
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

      {
        name: <b>Approved?</b>,
        selector: (row) => row.is_approved,
        sortable: true,
        width:'100px'
      },
    {
      name: <b>Current Status</b>,
      selector: (row) => row.sts,
      sortable: true,
      width:'100px'
    },
    {
      name: "",
      width:"70px",
      cell: (row) => (

        <Link to={`/DesignCourse/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Record"><i class="fa-solid fa-eye"></i></button>                
          </Link>
        ),
    },
    {
      name: <b>Actions</b>,
      width:"70px",
      cell: (row) => (
        <Link to={`/DesignCourse/${row.id}`}>
          <button className="btn btn-primary"  data-toggle=" tooltip" data-placement="bottom" title="Update Record"><i class="fa-solid fa-pencil"></i></button>                
          </Link>
        ),
      },
    {
      name: "",
      width:"70px",
      cell: (row) => (
        <button className="btn btn-danger"  data-toggle=" tooltip" data-placement="bottom" title="Delete Record" onClick={()=>deleteRecord(row.id)}><i class="fa-solid fa-trash"></i></button>                
      ),
    },
  ];

  return (
    <div>
              <ToastContainer position='top-center'/>
    
    <DataTable
      title="Courses - List"
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      //  actions={<button className="btn btn-sm btn-primary">Export</button>}
      // actions={
      //   <a href="/UserRoles" className="btn btn-success pull-right">
      //     <span className="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Add New User Role
      //   </a>
      // }
      subHeader
      subHeaderComponent={
        <div className="input-group pull-right">
          <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
        <input
          type="text"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type text to Search..."/>
                  <a href="/DesignCourse" className="btn btn-success pull-right">
          <span className="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Add New
        </a>
        </div>
      }
      subHeaderAlign="right"
      columns={columns}
      data={filteredData}
      pagination
    />
    </div>
  );
};

export default CourseList;
