const port = "localhost:3000";

export const convertDate = (dt) => {
    const year = dt.getFullYear();
    var month = dt.getMonth()+1;    
    var date = dt.getDate();        
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    return date + "/" + month + "/" + year;
 };
 
 export const justAnAlert = () => {
    alert('hello');
 };