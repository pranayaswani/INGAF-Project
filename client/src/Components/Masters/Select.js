import React,{useState, useEffect} from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';


import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]



const SampleSelect = () =>{
    const [topicsData, setTopicsData] = useState([]); 
    let options="";

    // useEffect(() => {
    //       axios.get("http://localhost:5000/get/faculty_topics/5")
    //       .then((response) => {
    //         console.log("Dt:",response.data)
    //         setTopicsData(response.data);
    //         options = response.data.map(function (dt) {
    //             return { value: dt.id, label: dt.main_topic };
    //           })
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }, []);

    const fetchData = () => {
      axios.get("http://localhost:5000/get/topics_main")
      .then((response) => {
        console.log("Main Topics:",response.data);
        setTopicsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  useEffect(() => {
    console.log("cominng in UE")
    fetchData();
     
    }, []);

    return(
        <div>
          <div>Async Select</div>
          <div>
           <AsyncSelect 
                // isMulti 
                cacheOptions 
                loadOptions={fetchData}
              // cacheOptions
              // defaultOptions
              
              // // value={selectedValue}
              getOptionLabel={e => e.description}
              getOptionValue={e => e.id}              
               />
        </div>
  </div>
  )}  

  export default SampleSelect;
;