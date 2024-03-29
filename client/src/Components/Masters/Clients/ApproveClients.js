import React, { useState, useEffect } from "react";
import ClientsRegistration from "./ClientsRegistration";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { createGlobalStyle } from "styled-components";

// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const ApproveClients = () => {
  const [tblData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const {LoginID, UserType, EntityID} =useSelector((state)=>state.user.userDetails);
  console.log("Login Details",LoginID, UserType);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get/clients/${EntityID}`);
      console.log(response);
      setData(response.data);

      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (action,id) =>{
    let remarks=""
    if(action==='Y')
    {
      if(window.confirm("Are you  Sure?"))
      {
        axios.put(`http://localhost:5000/clients/${id}`,{action,remarks})
        toast.success("Client Approved Successfully...")    
        setTimeout(()=> getData(),500);
      }
    }
    else 
    {
        remarks = window.prompt("Reason for Rejection?","")
        if(remarks != null || remarks!= "")
        {
          axios.put(`http://localhost:5000/clients/${id}`,{action,remarks})
          toast.success("Client Rejected Successfully...")    
          setTimeout(()=> getData(),500);
        }
    }
  }


  // const updateRecord = (id) =>{
  //   <Link to={`/ClientsRegistration/${id}`}></Link>
  //   axios.get(`http://localhost:5000/get/clients/${id}`)
  // }

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    const result = tblData.filter((dt) => {
      return dt.client_descr.toLowerCase().match(search.toLowerCase());
    //   toast.success("Record Deleted Successfully...");
    });
    setFilteredData(result);
  }, [search]);

  const action = "Approve";
  const columns = [
    {
      name: 'S.No.',
      selector: (row, index) => index+1,
      disableSortBy: true,
      width:"70px"
    },
    {
        name: <b>Ministry / Department</b>,
        selector: (row) => row.controller,
        sortable: true,
        width:"150px"        
      },
      {
        name: <b>Client Description</b>,
        selector: (row) => row.client_descr,
        sortable: true,
      },
      {
        name: <b>PAO Code</b>,
        selector: (row) => row.pao_code,
        sortable: true,
        width:"100px"
      },

      {
        name: <b>E-Mail ID</b>,
        selector: (row) => row.email_id,
        sortable: true,
        width:"150px"
      },
      {
        name: <b>Mobile No.</b>,
        selector: (row) => row.mobile_no,
        sortable: true,
        width:"150px"        
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

        <Link to={`/ClientsRegistration/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Client Details"><i class="fa-solid fa-eye"></i></button>                
        </Link>
        ),
    },
    {
      name: <b>Actions</b>,
      width:"70px",
      cell: (row) => (
        // <Link to={`/ClientsRegistration/${row.id}`}>
          <button className="btn btn-primary"  data-toggle=" tooltip" data-placement="bottom" title="Approve Client" onClick={()=>handleAction('Y',row.id)}><i class="fa-solid fa-check"></i></button>                
          // </Link>
        ),
      },
    {
      name: "",
      width:"70px",
      cell: (row) => (
        <button className="btn btn-danger"  data-toggle=" tooltip" data-placement="bottom" title="Reject Client" onClick={()=>handleAction('R',row.id)}><i class="fa-solid fa-times"></i></button>                
      ),
    },
  ];

  return (
    <div >
      <ToastContainer position='top-center'/>
    
    <DataTable
      title="Clients - List"
      fixedHeader
      fixedHeaderScrollHeight="450px"
      // selectableRows
      // selectableRowsHighlight
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

export default ApproveClients;
