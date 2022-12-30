import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Menu from "./Components/Menu";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ContactUs from './Components/ContactUs/ContactUs';
import Header from "./Components/CommonComponents/Header";
import ClientsRegistration from "./Components/Masters/Clients/ClientsRegistration";
import ClientsList from "./Components/Masters/Clients/ClientsList";
// import Clients from "./Components/Masters/Clients/Clients";
// import ClientsNew from "./Components/Masters/Clients/ClientsNew";
import TrainingTypesMain from "./Components/Masters/TrainingTypes/TrainingTypesMain";
import TrainingTypesMainList from "./Components/Masters/TrainingTypes/TrainingTypesMainList";
import TrainingTypesSub from "./Components/Masters/TrainingTypes/TrainingTypesSub";
import TrainingTypesSubList from "./Components/Masters/TrainingTypes/TrainingTypesSubList";

import TopicsMain from "./Components/Masters/Topics/TopicsMain";
import TopicsMainList from "./Components/Masters/Topics/TopicsMainList";
import TopicsSub from "./Components/Masters/Topics/TopicsSub";
import TopicsSubList from "./Components/Masters/Topics/TopicsSubList";

import TrainingCentresList from './Components/Masters/TrainingCentres/TrainingCentresList';
import TrainingCentres from './Components/Masters/TrainingCentres/TrainingCentres';


import DesignationsList from './Components/Masters/Designations/DesignationsList';
import Designations from './Components/Masters/Designations/Designations';

import OfficeUniverseList from './Components/Masters/OfficeUniverse/OfficeUniverseList';
import OfficeUniverse from './Components/Masters/OfficeUniverse/OfficeUniverse';

import FacultiesList from './Components/Masters/Faculties/FacultiesList';
import Faculties from './Components/Masters/Faculties/Faculties';


import ControllersList from './Components/Masters/Controllers/ControllersList';
import Controllers from './Components/Masters/Controllers/Controllers';

import CitiesList from "./Components/Masters/Cities/CitiesList";
import Cities from "./Components/Masters/Cities/Cities";

import StatesList from "./Components/Masters/States/StatesList";
import States from "./Components/Masters/States/States";

import UserRoles from "./Components/Masters/UserRoles/UserRoles";
import UserRolesList from "./Components/Masters/UserRoles/UserRolesList";
import ExpenditureHeads from './Components/Masters/ExpenditureHeads/ExpenditureHeads';
import ExpenditureHeadsList from './Components/Masters/ExpenditureHeads/ExpenditureHeadsList';
// import Masters from "./Components/Masters/Masters";
import Services from "./Components/Services";
import FormMultiFields from "./FormMultiFields";

import DesignCourse from "./Components/SubComponents/DesignCourse/DesignCourse.js"
import CourseList from "./Components/SubComponents/DesignCourse/CourseList.js"
import SessionWisePlan from "./Components/SubComponents/DesignCourse/SessionWisePlan.js"
import GenerateCalendar from "./Components/SubComponents/DesignCourse/GenerateCalendar.js"
import Nominations from "./Components/SubComponents/Nominations/Nominations.js"
import NominationsApproval from "./Components/SubComponents/Nominations/NominationsApproval.js"

// import PrepareCalendar from "./Components/SubComponents/PrepareCalendar.js"
// import GudduList from "./Components/Masters/UserRoles/GudduList";
// import GudduAdd from "./Components/Masters/UserRoles/GudduAdd";
function App() {
  return (
    <>
    {/* <NavBar/>     */}
    {/* <Header/> */}
    <Menu/>
      <Routes>
        <Route exact path="/" element={<Home />} />        

        <Route path="/FormSample" element={<FormMultiFields/>}/>        
        <Route path="/UserRoles" element={<UserRoles/>}/>        
        <Route path="/UserRoles/:id" element={<UserRoles/>}/>                        
        <Route path="/UserRoles/:action/:id" element={<UserRoles/>}/>                                
        <Route path="/UserRolesList" element={<UserRolesList/>}/>     

        <Route path="/States" element={<States/>}/>        
        <Route path="/States/:id" element={<States/>}/>                        
        <Route path="/States/:action/:id" element={<States/>}/>                                
        <Route path="/StatesList" element={<StatesList/>}/>     

        <Route path="/Cities" element={<Cities/>}/>        
        <Route path="/Cities/:id" element={<Cities/>}/>                        
        <Route path="/Cities/:action/:id" element={<Cities/>}/>                                
        <Route path="/CitiesList" element={<CitiesList/>}/>     

        <Route path="/TrainingCentres" element={<TrainingCentres/>}/>        
        <Route path="/TrainingCentres/:id" element={<TrainingCentres/>}/>                        
        <Route path="/TrainingCentres/:action/:id" element={<TrainingCentres/>}/>                                
        <Route path="/TrainingCentresList" element={<TrainingCentresList/>}/>     

        <Route path="/DesignCourse" element={<DesignCourse/>}/>        
        <Route path="/CourseList" element={<CourseList/>}/>     
        <Route path="/SessionWisePlan" element={<SessionWisePlan/>}/>             
        <Route path="/GenerateCalendar" element={<GenerateCalendar/>}/>                     
        <Route path="/Nominations" element={<Nominations/>}/>                             
        <Route path="/NominationsApproval" element={<NominationsApproval/>}/>                                     

        <Route path="/TrainingTypesMain" element={<TrainingTypesMain/>}/>        
        <Route path="/TrainingTypesMain/:id" element={<TrainingTypesMain/>}/>                        
        <Route path="/TrainingTypesMain/:action/:id" element={<TrainingTypesMain/>}/>                                
        <Route path="/TrainingTypesMainList" element={<TrainingTypesMainList/>}/>     

        <Route path="/TrainingTypesSub" element={<TrainingTypesSub/>}/>        
        <Route path="/TrainingTypesSub/:id" element={<TrainingTypesSub/>}/>                        
        <Route path="/TrainingTypesSub/:action/:id" element={<TrainingTypesSub/>}/>                                
        <Route path="/TrainingTypesSubList" element={<TrainingTypesSubList/>}/>     

        <Route path="/TopicsMain" element={<TopicsMain/>}/>        
        <Route path="/TopicsMain/:id" element={<TopicsMain/>}/>                        
        <Route path="/TopicsMain/:action/:id" element={<TopicsMain/>}/>                                
        <Route path="/TopicsMainList" element={<TopicsMainList/>}/>     

        <Route path="/TopicsSub" element={<TopicsSub/>}/>        
        <Route path="/TopicsSub/:id" element={<TopicsSub/>}/>                        
        <Route path="/TopicsSub/:action/:id" element={<TopicsSub/>}/>                                
        <Route path="/TopicsSubList" element={<TopicsSubList/>}/>     

        <Route path="/Designations" element={<Designations/>}/>        
        <Route path="/Designations/:id" element={<Designations/>}/>                        
        <Route path="/Designations/:action/:id" element={<Designations/>}/>                                
        <Route path="/DesignationsList" element={<DesignationsList/>}/>     

        <Route path="/Controllers" element={<Controllers/>}/>        
        <Route path="/Controllers/:id" element={<Controllers/>}/>                        
        <Route path="/Controllers/:action/:id" element={<Controllers/>}/>                                
        <Route path="/ControllersList" element={<ControllersList/>}/>     

        <Route path="/ClientsRegistration" element={<ClientsRegistration/>}/>        
        <Route path="/ClientsRegistration/:id" element={<ClientsRegistration/>}/>                        
        <Route path="/ClientsRegistration/:action/:id" element={<ClientsRegistration/>}/>                                
        <Route path="/ClientsList" element={<ClientsList/>}/>     

        <Route path="/OfficeUniverse" element={<OfficeUniverse/>}/>        
        <Route path="/OfficeUniverse/:id" element={<OfficeUniverse/>}/>                        
        <Route path="/OfficeUniverse/:action/:id" element={<OfficeUniverse/>}/>                                
        <Route path="/OfficeUniverseList" element={<OfficeUniverseList/>}/>     

        <Route path="/Faculties" element={<Faculties/>}/>        
        <Route path="/Faculties/:id" element={<Faculties/>}/>                        
        <Route path="/Faculties/:action/:id" element={<Faculties/>}/>                                
        <Route path="/FacultiesList" element={<FacultiesList/>}/>     

        <Route path="/ExpenditureHeads" element={<ExpenditureHeads/>}/>        
        <Route path="/ExpenditureHeads/:id" element={<ExpenditureHeads/>}/>                        
        <Route path="/ExpenditureHeads/:action/:id" element={<ExpenditureHeads/>}/>                                
        <Route path="/ExpenditureHeadsList" element={<ExpenditureHeadsList/>}/>     

        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />   
        <Route path="/Login" element={<Login />} />
        <Route path="/Services" element={<Services />} />                                      
      </Routes>
    </>
  );
}

export default App;
