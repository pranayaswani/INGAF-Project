import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const GudduList = () => {

    const [myData, setMyData] = useState([]);


    const getData = async () =>{
        try{
            const recData = await axios.get('http://localhost:5000/guddu')
            console.log(recData);
            setMyData(recData.data)
        }
        catch (error){
            console.log(error);}
    }

    useEffect(()=>{
        getData();
    }, [])
  return (
    <>
      <h1>guddu ki jay ho</h1>
      <Link to = {"/gudduaddrole"}>
      <button className="btn btn-success pull-right">Add New Role</button>
      </Link>
      <table className="table">
        <thead>
          <th>ID</th>
          <th>Role Desccription</th>          
          <th>Current Status</th>   
          <th>Action</th>                    
        </thead>
        <tbody>
          {myData.map((row)=>{
            return(
              <tr>
                <td>{row.id}</td>
                <td>{row.descr}</td>
                <td>{row.status_id}</td>
                <button>Edit</button>
                <button>Delete</button>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default GudduList
