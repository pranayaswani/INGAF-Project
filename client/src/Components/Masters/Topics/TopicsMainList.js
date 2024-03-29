import React, { useState, useEffect } from "react";
import TopicsMain from "./TopicsMain";
import {Link} from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";

// react table pagination sorting filter link https://www.youtube.com/watch?v=rgY1oPNVgwU
const TopicsMainList = () => {
  const apiName = "topics_main";
  const componentRoute = "/TopicsMain";
  const componentHeader = "Topics - Main - List"

  const [tblData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get/${apiName}`);
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
      axios.delete(`http://localhost:5000/delete/${apiName}/${id}`)
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
    <Link to={`{componentRoute}/${id}`}></Link>
    axios.get(`http://localhost:5000/get/${apiName}/${id}`)
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
    },
    {
      name: <b>Topics</b>,
      selector: (row) => row.description,
      sortable: true,
      width:50,
    },
    {
        name: <b>Approved?</b>,
        selector: (row) => row.is_approved,
        width:50,
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

        <Link to={`${componentRoute}/${action}/${row.id}`}>
          <button className="btn btn-success"  data-toggle=" tooltip" data-placement="bottom" title="View Record"><i class="fa-solid fa-eye"></i></button>                
          </Link>
        ),
    },
    {
      name: <b>Actions</b>,
      width:"70px",
      cell: (row) => (
        <Link to={`${componentRoute}/${row.id}`}>
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
      title={componentHeader}
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
                  <a href={componentRoute} className="btn btn-success pull-right">
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

export default TopicsMainList;
