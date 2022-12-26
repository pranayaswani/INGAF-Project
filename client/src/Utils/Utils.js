const port = "localhost:3000";

export const convertDate = (dt) => {
    const year = dt.getFullYear();
    var month = dt.getMonth()+1;    
    var date = dt.getDate();        
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    return date + "/" + month + "/" + year;
 };

 export const reverseDate = (dt) => {
   const year = dt.substring(6,11);
   var month = dt.substring(3,5);    
   var date = dt.substring(0,2);        
   month = month < 10 ? '0' + month : month;
   date = date < 10 ? '0' + date : date;
   return year + "-" + month + "-" + date;
};


 export const justAnAlert = () => {
    alert('hello');
 };