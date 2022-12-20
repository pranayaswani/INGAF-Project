import React, { useState, useEffect } from "react";
import OfficeUniverse from "./OfficeUniverse";
import {Link} from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";

// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const OfficeUniverseList = () => {
  const [tblData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get/office_universe");
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
    axios.delete(`http://localhost:5000/delete/office_universe/${id}`)
    toast.success("Record Deleted Successfully...")    
    setTimeout(()=> getData(),500);}
  }
  const updateRecord = (id) =>{
    <Link to={`/OfficeUniverse/${id}`}></Link>
    axios.get(`http://localhost:5000/get/office_universe/${id}`)
  }

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    const result = tblData.filter((dt) => {
      return dt.emp_name.toLowerCase().match(search.toLowerCase());
    //   toast.success("Record Deleted Successfully...");
    });
    setFilteredData(result);
  }, [search]);

  const action = "view";
  const columns = [
    {
      name: 'Sl.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
      width:"80px"
    },
    {
        name: <b>Employee Name</b>,
        selector: (row) => row.emp_name,
        sortable: true,
        width:"200px"        
      },
      {
        name: <b>Designation</b>,
        selector: (row) => row.designation,
        sortable: true,
      },
      {
        name: <b>E-Mail ID</b>,
        selector: (row) => row.email_id,
        sortable: true,
        width:"200px"
      },
      {
        name: <b>Mobile No.</b>,
        selector: (row) => row.mobile_no,
        sortable: true,
      },
      {
        name: <b>User Role</b>,
        selector: (row) => row.user_role,
        sortable: true,
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
    },
    {
      name: "",
      width:"70px",
      cell: (row) => (

        <Link to={`/OfficeUniverse/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Record"><i class="fa-solid fa-eye"></i></button>                
          </Link>
        ),
    },
    {
      name: <b>Actions</b>,
      width:"70px",
      cell: (row) => (
        <Link to={`/OfficeUniverse/${row.id}`}>
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
      title="Office Universe - List"
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
                  <a href="/OfficeUniverse" className="btn btn-success pull-right">
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

export default OfficeUniverseList;
