import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import ClientOfficeRegistration from './Masters/Clients/ClientsOfficeRegistration';
import './menu.css';

const Menu = () => {

        const dispatch = useDispatch();
        const {LoginID, UserType, EntityID, UName} =useSelector((state)=>state.user.userDetails);
        //const {loginID, userType} = useSelector((state)=>state.user)
        console.log("UT:",UserType);
        console.log("LN:",LoginID);
        console.log("ET:",EntityID);  
        console.log("UN:",UName);              
//        console.log("Usr:",user)        

        const handleLogout = () => {
            dispatch({
                type:"loggedOutCase",
                payload:{
                  "LoginID":"",
                  "UserType":"0",
                  "EntityID":"",
                  "UName":"",                  
                }
              });
        }

    // console.log("ut:",userType)
  return (
    <div className="menu-bar">
        <ul>
            <span></span><li><a href="/"><i className="fa fa-home"></i>Home</a></li>

            <li><a href="#"><i className="fa fa-microphone"></i>About Us</a></li>
            <li><a href="/ContactUs"><i className="fa fa-envelope"></i>Contact Us</a></li>            
            {/* <li><a href="/Clock"><i className="fa fa-envelope"></i>Clock</a></li>                         */}
            <li><a href="/Services"><i className="fa fa-server"></i>Services</a></li>     
            {/* <li><a href="/ClientsYup"><i className="fa fa-users"></i>ClientsYup</a></li>             */}
            {UserType==="0" ? ( <>                
                <li><a href="/ClientsRegistration"><i className="fa fa-users"></i>Clients</a></li></>):null}    

            {UserType != "0" ? ( <>                            
            <li><a href="#"><i className="fa fa-newspaper-o"></i>Actions&nbsp;&nbsp;<i className="fa fa-caret-down"></i></a>

                <div className="sub-menu-1">            
                {UserType==="1" ? ( <>                                
                <li ><a href="/CourseList">Design Course</a></li>                                              
                <li ><a href="/SessionWisePlan">Session Wise Plan</a></li>                                                                  
                <li ><a href="/GenerateCalendar">Generate Calendar</a></li>        
                <li ><a href="/NominationsApproval">Nominations - Approval</a></li>                        
                <li ><a href="/BillGeneration">Bill Generation</a></li>                                        
                <li ><a href="/ApproveClients"><i className="fa fa-users"></i>Approve Clients</a></li></>):null}

                {UserType==="3" ? ( <>                
                <li ><a href="/Nominations">Nominations</a></li>
                <li ><a href="/Nominations">UTR Updation</a></li></>):null}                    
                {UserType==="4" ? ( <>                
                <li ><a href="">Feedback</a></li></>):null}                    



                </div>
            </li></>):null}        
            {UserType==="1" && EntityID===3 ?
            (
                <>
            <li><a href="#"><i className="fa fa-newspaper-o"></i>Masters&nbsp;&nbsp;<i className="fa fa-caret-down"></i></a>
                <div className="sub-menu-1">
                    <ul>
                    <li ><a href="/TrainingCentresList">Training Centres</a></li>      
                    <li className="hover-me"><a href="/TrainingTypesMain">Training Types</a><i className="fa fa-angle-right"></i>
                    <div className="sub-menu-2">
                            <ul>
                                <li><a href="/TrainingTypesMainList">Main Type</a></li>
                                <li><a href="/TrainingTypesSubList">Sub Types</a></li>
                            </ul>
                        </div>
                    </li>  
                    <li className="hover-me"><a href="#">Topics</a><i className="fa fa-angle-right"></i>
                    <div className="sub-menu-2">
                            <ul>
                                <li><a href="/TopicsMainList">Main Topics</a></li>
                                <li><a href="/TopicsSubList">Sub Topics</a></li>
                            </ul>
                        </div>
                    </li>  
                    <li ><a href="/DesignationsList">Designations</a></li>   
                    <li ><a href="/StatesList">States</a></li>                                   
                    <li ><a href="/CitiesList">Cities</a></li>      
                    <li ><a href="/UserRolesList">User Roles</a></li> 
                    <li ><a href="/ControllersList">Controllers</a></li>                     
                    <li ><a href="/OfficeUniverseList"><i className="fa fa-users"></i>Office Universe</a></li>
                    <li ><a href="/FacultiesList">Faculties</a></li>                     

                  
                    <li ><a href="/ExpenditureHeadsList">Expenditure Heads</a></li>                                            

                    <li ><a href="/Signatories"><i className="fa fa-users"></i>Signatories</a></li>                                                                
                    <li className="hover-me"><a href="#">More Masters</a> <i className="fa fa-angle-right"></i>
                        <div className="sub-menu-2">
                            <ul>
                                <li><a href="/FormSample">Multi Fields Form</a></li>
                                <li><a href="/SampleSelect">Select Form</a></li>
                                <li><a href="#">Master-3</a></li>     
                            </ul>
                        </div>
                    </li>
                    </ul>
                </div>
            </li></>): null}
            {UserType==="1" && EntityID !="3" ?
            (
                <>
            <li><a href="#"><i className="fa fa-newspaper-o"></i>Masters&nbsp;&nbsp;<i className="fa fa-caret-down"></i></a>
                <div className="sub-menu-1">
                    <ul>
                    <li ><a href="/OfficeUniverseList"><i className="fa fa-users"></i>Office Universe</a></li>
                    <li ><a href="/FacultiesList">Faculties</a></li>                     
                    <li ><a href="/SignatoriesList"><i className="fa fa-users"></i>Signatories</a></li>                                                                
                    </ul>
                </div>
            </li></>): null}

            {UserType==="0" || !UserType ?                
            (
                <>
                <li><a href="/Login"><i className="fa fa-user"></i>Login</a></li></>):null}
            {UserType>"0" ?                
            (
                <>
                <li><a href="/Login" onClick={handleLogout}><i className="fa fa-user"></i>{UName}&nbsp;(Logout)</a></li></>):null}
        </ul>
    </div>    
  )
}
export default Menu
