import react from 'react';
// import './Home.css';
import slider from './slider1.jpg'
import img1 from './../images/img1.jpg'
import img2 from './../images/img2.jpg'
import img3 from './../images/img3.jpg'

// import { useDispatch, useSelector } from 'react-redux';    
// const dispatch = useDispatch();
// const handleLogout = () => {
//     dispatch({
//         type:"loggedOutCase",
//         payload:{
//           "LoginID":"",
//           "UserType":"0",
//           "EntityID":"",
//           "UName":"",                  
//         }
//       });
// }
// {handleLogout()}


function Home(){
    return(
        <div>
        {/* <img src='./../images/slider.jpg' alt="Girl in a jacket" width="500" height="600"></img> */}
        {/* <img className='home_img' src={img1} alt="Logo" /> */}
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img className="d-block w-100" src={img1} alt="Logo" />
                </div>
                <div class="carousel-item">
                <img className='d-block w-100' src={img2} alt="Logo" />
                </div>
                <div class="carousel-item">
                <img className='d-block w-100' src={img3} alt="Logo" />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </div>
   
   
    )
}
export default Home;
