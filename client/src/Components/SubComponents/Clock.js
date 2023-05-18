import React, {useState, useEffect} from 'react'

const Clock = () => {
  //   const [currentTime,setCurrentTime]=useState(new Date().toLocaleTimeString())
     const [hours, setHours] = useState(0); //useState(new Date().getHours());
     const [minutes, setMinutes] = useState(0); //  useState(new Date().getMinutes());
     const [seconds, setSeconds] =  useState(0);  // useState(new Date().getSeconds())   
     
    // useEffect(()=>{
        
    // },[])

    // setInterval(setCurrentTime(new Date().toLocaleTimeString()),1000)
    

    // useEffect(()=>{
    //     if(seconds >= 5)
    //     {
    //         // setSeconds(0);
    //         setMinutes(minutes+1);            
    //     }
    //  },[seconds])

    //  useEffect(()=>{
    //     if(minutes >= 5)
    //     {
    //         setMinutes(0)
    //         // setSeconds(0);
    //         setHours(hours+1);
    //     }
    //  },[minutes])

     const updateTime = () => {
        console.log('h:',hours,' m:',minutes,' s:',seconds);
        setSeconds(seconds+1);
        if (seconds==5){
            //console.clear();
            setMinutes(minutes+1);
            setSeconds(0);            
            if (minutes==5){
                setHours(hours+1);           
                setMinutes(0);                
            }
        }
     }

      setInterval(updateTime,1000);

    //  const addSecond = () =>{
    //      console.log("coming in addsecond...",seconds)
    //      setInterval(()=>{
    //         // console.log("coming in setinterval",seconds)
    //         document.write(seconds);
    //         seconds++;
    //         setSeconds(seconds);
    //     }, 1000)

    //  }

    //  const addSecond = ((seconds)=>{
    //          setInterval(()=>{
    //              setSeconds(seconds+1)
    //              if(seconds>=10)
    //              {
    //                 setSeconds(0);
    //                 setMinutes(minutes+1)
    //                 if(minutes>=10)
    //                 {
    //                     setMinutes(0);
    //                     setHours(minutes+1)
    //                 }
    //              }
    //             }, 1000);
    //      }
    //  );

    // const myClock = () =>{
    //             console.log('coming here...')
    //             setSeconds(seconds+1) 
    //              if(seconds>=10)
    //              {
    //                 setSeconds(0);
    //                 setMinutes(minutes+1)
    //                 if(minutes>=10)
    //                 {
    //                     setMinutes(0);
    //                     setHours(minutes+1)
    //                 }
    //              }
        
    // }
     


  return (
    <div>
        <h1>My Clock</h1>
        <div className="container">
            <h1>&emsp;{hours} &emsp; :&emsp; {minutes} &emsp; : &emsp;{seconds} </h1>
            {/* <h2>{currentTime}</h2> */}
        </div>
    </div>
  )
}

export default Clock
