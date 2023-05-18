import React, { useState, useEffect } from "react";
import TrainingCentres from "./TrainingCentres";
import {Link} from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";

// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const TrainingCentresList = () => {
  const apiName = "training_centres";
  const [tblData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/training_centres");
      console.log(response);
      setData(response.data);

      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord =  (id) => {
    if(window.confirm("Are you  Sure?"))
    {
      axios.delete(`http://localhost:5000/${apiName}/${id}`)
      .then((res)=>{
        if(res.status==200)
        {
          toast.success("Record Deleted Successfully...");
          setTimeout(()=> getData(),300);                          
        }
      }).catch((err)=>{
        toast.error("In Use. Can't Delete...!");
      });
  }
};
  const updateRecord = (id) =>{
    <Link to={`/TrainingCentres/${id}`}></Link>
    axios.get(`http://localhost:5000/get/training_centres/${id}`)
  }

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    const result = tblData.filter((dt) => {
      return dt.description.toLowerCase().match(search.toLowerCase());
      toast.success("Record Deleted Successfully...");
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
        name: <b>Training Centre</b>,
        selector: (row) => row.description,
        sortable: true,
        width:"300px"        
      },
      {
        name: <b>City</b>,
        selector: (row) => row.city,
        sortable: true,
      },
      {
        name: <b>Contact Person</b>,
        selector: (row) => row.contact_person,
        sortable: true,
      },
      {
        name: <b>EMail ID</b>,
        selector: (row) => row.email_id,
        sortable: true,
      },
      {
        name: <b>Mobile No.</b>,
        selector: (row) => row.mobile_no,
        sortable: true,
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

        <Link to={`/TrainingCentres/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Record"><i class="fa-solid fa-eye"></i></button>                
          </Link>
        ),
    },
    {
      name: <b>Actions</b>,
      width:"70px",
      cell: (row) => (
        <Link to={`/TrainingCentres/${row.id}`}>
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
      title="Training Centres - List"
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
                  <a href="/TrainingCentres" className="btn btn-success pull-right">
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

export default TrainingCentresList;
