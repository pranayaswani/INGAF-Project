import React from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css';

const Menu = () => {
  return (
    <div className="menu-bar">
        <ul>
            <span></span><li><a href="/"><i className="fa fa-home"></i>Home</a></li>
            <li><a href="#"><i className="fa fa-microphone"></i>About Us</a></li>
            <li><a href="/ContactUs"><i className="fa fa-envelope"></i>Contact Us</a></li>            
            <li><a href="/Services"><i className="fa fa-server"></i>Services</a></li>                                                    
            <li><a href="#"><i className="fa fa-newspaper-o"></i>Masters&nbsp;&nbsp;<i className="fa fa-caret-down"></i></a>
                <div className="sub-menu-1">
                    <ul>
                    <li ><a href="/TrainingCentresList">Training Centres</a></li>      
                    <li ><a href="/DesignCourse">Design Course</a></li>                                              
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
                    <li ><a href="/ExpenditureHeadsList">Expenditure Heads</a></li>                                            
                    <li ><a href="/OfficeUniverseList"><i className="fa fa-users"></i>Office Universe</a></li>                                            
                    <li className="hover-me"><a href="#">More Masters</a> <i className="fa fa-angle-right"></i>
                        <div className="sub-menu-2">
                            <ul>
                                <li><a href="/FormSample">Multi Fields Form</a></li>
                                <li><a href="#">Master-2</a></li>
                                <li><a href="#">Master-3</a></li>     
                            </ul>
                        </div>
                    </li>
                    </ul>
                </div>
                </li>
                <li><a href="/ClientsList"><i className="fa fa-users"></i>Clients</a></li>
            <li><a href="/Login"><i className="fa fa-user"></i>Login</a>
            <div className="sub-menu-1">
                <ul>
                    <li><a href="#">Change Password</a></li>
                </ul>
            </div>
            </li>
        </ul>
    </div>    
  )
}
export default Menu
