import react, {useEffect, useState} from 'react';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import axios from "axios";
import Contact from './Contact';
function ContactUs(){
    const [data, setData] = useState([]);    

    useEffect(() => {
        axios
          .get("http://localhost:5000/get/office_universe")
          .then((response) => {
            setData(response.data);
            //response.data.forEach(obj,ind=>obj.__id=ind);  // if there is no id
          })
          .catch((err) => {
            console.log(err);
          });
          }, []);


    return (
        <div className='container-fluid f-flex justify-content-center'>
            <h1>Contact Us</h1> 
            <div>           
                <Contact img={img1} ename="Mr.Nalin S." designation="Director" phone_nos="234234" mobile_no = "3428423" email_id ="nalin@gov.in"/>
                <Contact img={img2} ename="Mr. Ansari" designation="Jt.Director" phone_nos="234234" mobile_no = "3428423" email_id ="ansari@gov.in"/>
                <Contact img={img3} ename="Vimal Nanda" designation="Sr.AO" phone_nos="234234" mobile_no = "3428423" email_id ="vimal@gov.in"/>                                
            </div>
        </div>
    )
}
export default ContactUs;

