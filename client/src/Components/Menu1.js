import React from 'react'
import './Menu1.css';

const Menu1 = () => {
  return (
    <div className="menu-bar">
        <ul>
            <li><a href="/"><i className="fa fa-home"></i>Home</a></li>
            <li><a href='#'>About Us</a></li>            
            <li><a href='#'>Services</a></li>            
            <li><a href="/">Masters <span><i className="glyphicon glyphicon-arrow-down" /></span></a>
                <ul>
                    <li><a href='#'>Clients</a></li>
                    <li><a href='#'>Office Universe</a></li>            
                    <li><a href='#'>Training Centres</a></li>            
                    <li><a href='#'>Training Types</a>
                    <ul>
                        <li><a href='#'>Main</a></li>
                        <li><a href='#'>Sub</a></li>            
                    </ul>
                    </li>
                    <li><a href='#'>Training Topics</a>
                        <ul>
                            <li><a href='#'>Main</a></li>
                            <li><a href='#'>Sub</a></li>            
                        </ul>                    
                    </li>                    
                    <li><a href='#'>Designations</a></li>                                
                    <li><a href='#'>User Roles</a></li>                                                    
                    <li><a href='#'>Expenditure Components</a></li> 
                    <li><a href='#'>Controllers</a></li>                                                                                                                                               
                    <li><a href='#'>States</a></li>                                                                        
                </ul>
            </li>            
            <li className='pull-right'><a href='#'>login</a></li>                        
        </ul>
    </div>
  )
}

export default Menu1

