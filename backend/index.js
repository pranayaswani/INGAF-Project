//npm run backend to start the backend server
const express = require("express");

const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'ingaf'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mySql Connected...");
});

var apiRoute;
var tblName;


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser,urlencoded({extended:true}));

app.listen(5000, () => {
    console.log("Server is now running on port 5000");
});


//  ---- APIs Cities starts here ------------------------------------------------------

app.get('/get/cities',(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as sts from mst_cities a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/cities', (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into mst_cities (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get('/get/city_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_cities where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/cities/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_cities where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/cities/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from mst_cities where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/cities/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update mst_cities set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/cities/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_cities set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});



//  ---- APIs Designations starts here ------------------------------------------------------

app.get('/get/designations',(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as sts from mst_designations a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/designations', (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into mst_designations (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get('/get/designation_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_designations where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/designations/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_designations where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/designations/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from mst_designations where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/designations/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update mst_designations set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/designations/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_designations set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//  ---- APIs Expenditure Heads starts here ------------------------------------------------------

app.get('/get/expenditure_heads',(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as sts from mst_expenditure_heads a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/expenditure_heads', (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into mst_expenditure_heads (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get('/get/expenditure_head_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_expenditure_heads where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/expenditure_heads/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_expenditure_heads where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/expenditure_heads/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from mst_expenditure_heads where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/expenditure_heads/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update mst_expenditure_heads set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/expenditure_heads/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_expenditure_heads set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});


//  ---- APIs Training Types - Main starts here ------------------------------------------------------

app.get('/get/training_types_main',(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as sts from mst_training_types_main a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/training_types_main', (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into mst_training_types_main (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get('/get/training_types_main_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_training_types_main where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/training_types_main/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_training_types_main where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/training_types_main/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from mst_training_types_main where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/training_types_main/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update mst_training_types_main set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/training_types_main/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_training_types_main set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});


//  ---- APIs Training Types - Sub starts here ------------------------------------------------------

app.get('/get/training_types_sub',(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as maintype, c.descr as sts from mst_training_types_sub a, mst_training_types_main b, mst_current_status c where a.tt_main_id = b.id and  a.status_id = c.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/training_types_sub', (req, res)=>{
    const {descr, tt_main_id, status_id} = req.body;
    const sqlInsert = "insert into mst_training_types_sub (descr, tt_main_id, status_id) values (?, ?, ?)";
    db.query(sqlInsert, [descr, tt_main_id, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get('/get/training_types_sub_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_training_types_sub where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/training_types_sub/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_training_types_sub where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/training_types_sub/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, tt_main_id, status_id from mst_training_types_sub where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/training_types_sub/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, tt_main_id, status_id} = req.body;
    const sqlCmd = "update mst_training_types_sub set descr = ?, tt_main_id = ?,  status_id = ? where id = ?";
    db.query(sqlCmd, [descr, tt_main_id, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/training_types_sub/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_training_types_sub set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});


//  ---- APIs Topics - Main starts here ------------------------------------------------------

const apiRoute1="topics_main";
const tblName1 ="mst_topics_main";
app.get(`/get/${apiRoute1}` ,(req,res)=>{
    db.query("select a.id, a.descr as description, a.is_approved, b.descr as sts from "+tblName1+" a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(tblName);
        res.send(result);
    });
});

app.post(`/post/${apiRoute1}`, (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into "+ tblName1+" (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        console.log(result);
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRoute1}_check/:descr`,(req,res)=>{
    const {descr} = req.params
    db.query("select *  from "+ tblName1 +" where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete(`/delete/${apiRoute1}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from "+ tblName1+" where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){
            console.log(error.errno)
            //res.send(error.errno)
            res.sendStatus(409)
        }else 
            {   console.log("delete result..",result);
                res.send(result)}    
    });
});

app.get(`/getById/${apiRoute1}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from "+tblName1+" where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRoute1}/:id`,(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update "+tblName1+" set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute1}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update "+tblName1+" set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//  ---- APIs States starts here ------------------------------------------------------

const apiRoute3="states";
const tblName3 ="mst_states";
app.get(`/get/${apiRoute3}` ,(req,res)=>{
    db.query("select a.id, a.descr as description, a.is_approved, b.descr as sts from "+tblName3+" a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log("State Tbl:"+tblName3)
        console.log(result)
        res.send(result);
    });
});

app.post(`/post/${apiRoute3}`, (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into "+ tblName3+" (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){ console.log(error);
            return error}

        console.log(result);
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRoute3}_check/:descr`,(req,res)=>{
    const {descr} = req.params
    db.query("select *  from "+ tblName3 +" where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete(`/delete/${apiRoute3}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from "+ tblName3+" where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){
            console.log(error.errno)
            //res.send(error.errno)
            res.sendStatus(409)
        }else 
            {   console.log("delete result..",result);
                res.send(result)}    
    });
});

app.get(`/getById/${apiRoute3}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from "+tblName3+" where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRoute3}/:id`,(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update "+tblName3+" set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute3}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update "+tblName3+" set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});


//  ---- APIs Topics - Sub starts here ------------------------------------------------------
const apiRoute4="topics_sub"
const tblName4 ="mst_topics_sub";

app.get(`/get/${apiRoute4}`,(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as maintype,a.is_approved, c.descr as sts from " + tblName4 + " a, mst_topics_main b, mst_current_status c where a.main_id = b.id and  a.status_id = c.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get(`/get/${apiRoute4}/:mainTopic`,(req,res)=>{
    const {mainTopic} = req.params;
    db.query("select id, descr from " + tblName4 + " where main_id = "+ mainTopic + " order by descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.post(`/post/${apiRoute4}`, (req, res)=>{
    const {descr, main_id, status_id} = req.body;
    const sqlInsert = "insert into " + tblName4 + " (descr, main_id, status_id) values (?, ?, ?)";
    db.query(sqlInsert, [descr, main_id, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRoute4}_check/:descr`,(req,res)=>{
    const {descr} = req.params
    db.query("select *  from " + tblName4 + " where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete(`/delete/${apiRoute4}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblName4 + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/${apiRoute4}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, main_id, status_id from " + tblName4 + " where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRoute4}/:id`,(req,res)=>{
    const {id} = req.params;
    const {descr, main_id, status_id} = req.body;
    const sqlCmd = "update " + tblName4 + " set descr = ?, main_id = ?,  status_id = ? where id = ?";
    db.query(sqlCmd, [descr, main_id, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute4}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblName4 + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});



// ------------- APIs - user roles starts-----------------------------------------------------------------------

app.get('/get/user_roles',(req,res)=>{
    db.query("select a.id, a.descr as role, b.descr as sts from mst_user_roles a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/post/user_roles', (req, res)=>{
    const {descr, status_id} = req.body;
    const sqlInsert = "insert into mst_user_roles (descr, status_id) values (?, ?)";
    db.query(sqlInsert, [descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});

app.get('/get/user_check/:descr',(req,res)=>{
    const {descr} = req.params
    db.query("select *  from mst_user_roles where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/delete/user_roles/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_user_roles where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/getById/user_roles/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, status_id from mst_user_roles where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put('/update/user_roles/:id',(req,res)=>{
    const {id} = req.params;
    const {descr, status_id} = req.body;
    const sqlCmd = "update mst_user_roles set descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put('/updateStatus/user_roles/:id',(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update mst_user_roles set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//  ---- APIs Controllers starts here ------------------------------------------------------
const apiRoute5="controllers"
const tblName5 ="mst_controllers";

app.get(`/get/${apiRoute5}`,(req,res)=>{
    db.query("select a.id, a. controller_code, a.descr as description, a.is_approved, b.descr as sts from " + tblName5 + " a, mst_current_status b where a.status_id = b.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post(`/post/${apiRoute5}`, (req, res)=>{
    const {controller_code, descr, status_id} = req.body;
    const sqlInsert = "insert into " + tblName5 + " (controller_code, descr, status_id) values (?, ?, ?)";
    db.query(sqlInsert, [controller_code, descr, status_id], (error, result)=>{
        if(error){return error}
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRoute5}_check/:descr`,(req,res)=>{
    const {descr} = req.params
    db.query("select *  from " + tblName5 + " where descr = '"  + descr + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.get(`/get/${apiRoute5}_check/:controller_code`,(req,res)=>{
    const {controller_code} = req.params
    db.query("select *  from " + tblName5 + " where controller_code = '"  + controller_code + "'",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.get(`/get/${apiRoute5}_check_code/:controller_code`,(req,res)=>{
    const {controller_code} = req.params
    db.query("select *  from " + tblName5 + " where controller_code = '"  + controller_code + "'",(err,result)=>{
        if(err) throw err;
        console.log("result from check_code:"+result)
        res.send(result);
    });
});


app.delete(`/delete/${apiRoute5}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblName5 + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/${apiRoute5}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, controller_code, descr, status_id from " + tblName5 + " where id=?";
    console.log("tbl:"+tblName5)
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRoute5}/:id`,(req,res)=>{
    const {id} = req.params;
    const {controller_code, descr, status_id} = req.body;
    const sqlCmd = "update " + tblName5 + " set controller_code = ?, descr = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [controller_code, descr, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute5}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblName5 + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//  ---- APIs Training Centres starts here ------------------------------------------------------
apiRoute="training_centres"
tblName ="mst_training_centres";

app.get(`/get/${apiRoute}`,(req,res)=>{
    db.query("select a.id, a.descr as description, b.descr as city, contact_person,email_id,phone_nos,mobile_no, a.is_approved, c.descr as sts from " + tblName + " a, mst_cities b, mst_current_status c where a.city_id = b.id and a.status_id = c.id order by a.descr",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post(`/post/${apiRoute}`, (req, res)=>{
    console.log("Table:"+tblName);
    const {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id} = req.body;
    const sqlInsert = "insert into " + tblName + " (descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id) values (?, ?, ?, ?,?, ?, ?, ?)";
    db.query(sqlInsert, [descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRoute}_check/:descr/:id`,(req,res)=>{
    const {descr, id} = req.params
    const sqlCmd = "select id from " + tblName + " where descr = ? and id != ?"
    db.query(sqlCmd, [descr, id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.delete(`/delete/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblName + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id from " + tblName + " where id=?";
    console.log("tbl:"+tblName)
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    console.log("Tbl:"+tblName)
    const {descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id} = req.body;
    const sqlCmd = "update " + tblName + " set descr = ?, address = ?,city_id = ?,contact_person = ?,email_id = ?,phone_nos = ?,mobile_no = ?, status_id = ? where id = ?";
    console.log(sqlCmd);
    db.query(sqlCmd, [descr, address, city_id, contact_person, email_id, phone_nos, mobile_no, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblName + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});


//  ---- APIs Office Universe starts here ------------------------------------------------------
const apiRouteOU="office_universe"
const tblNameOU ="mst_office_universe";

app.get(`/get/${apiRouteOU}`,(req,res)=>{
    db.query("select a.id, a.emp_name, b.descr as designation, a.phone_nos,a.mobile_no,a.email_id, c.descr as user_role,d.descr as tc, a.login_id, a.is_approved, e.descr as sts from " + tblNameOU + " a, mst_designations b, mst_user_roles c, mst_training_centres d, mst_current_status e where a.desig_id = b.id and a.user_role_id = c.id and a.tc_id = d.id and a.status_id = e.id order by a.emp_name",(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});

app.post(`/post/${apiRouteOU}`, (req, res)=>{
    const {tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id} = req.body;
    const sqlInsert = "insert into " + tblNameOU + " (tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id) values (?, ?, ?, ?,?, ?, ?, ?, ?)";
    db.query(sqlInsert, [tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRouteOU}_check/:emp_name/:id`,(req,res)=>{
    const {emp_name, id} = req.params
    const sqlCmd = "select id from " + tblNameOU + " where emp_name = ? and id != ?"
    db.query(sqlCmd, [emp_name, id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.delete(`/delete/${apiRouteOU}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblNameOU + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/${apiRouteOU}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id from " + tblNameOU + " where id=?";
    console.log("tbl:"+tblName2)
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        // console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRouteOU}/:id`,(req,res)=>{
    const {id} = req.params;
    console.log(" ID :"+id )
    console.log(req.body);
    const {tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id} = req.body;
    const sqlCmd = "update " + tblNameOU + " set emp_name = ?, desig_id = ?,phone_nos = ?,mobile_no = ?,email_id = ?,user_role_id = ?, login_id = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){ console.log(result);
            res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRouteOU}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblNameOU + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//------------- API Faculties --------------------------- 
const apiRouteF="faculties"
const tblNameF ="mst_faculties";

app.get(`/get/${apiRouteF}`,(req,res)=>{
    db.query("select a.id, a.faculty_name,a.office_name, b.descr as designation, a.phone_nos,a.mobile_no,a.email_id,d.descr as tc, a.is_approved, e.descr as sts from " + tblNameF + " a, mst_designations b, mst_training_centres d, mst_current_status e where a.desig_id = b.id and a.tc_id = d.id and a.status_id = e.id order by a.faculty_name",(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});

app.post(`/post/${apiRouteF}`, (req, res)=>{
    const {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id} = req.body;
    const sqlInsert = "insert into " + tblNameF + " (tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id) values (?,?,?,?,?, ?, ?, ?)";
    db.query(sqlInsert, [tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});


app.get(`/get/${apiRouteF}_check/:faculty_name/:id`,(req,res)=>{
    const {faculty_name, id} = req.params
    const sqlCmd = "select id from " + tblNameF + " where faculty_name = ? and id != ?"
    db.query(sqlCmd, [faculty_name, id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.delete(`/delete/${apiRouteF}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblNameF + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/${apiRouteF}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id from " + tblNameF + " where id=?";
    console.log("tbl:"+tblName2)
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        // console.log(result);
        res.send(result);
    });
});

app.put(`/update/${apiRouteF}/:id`,(req,res)=>{
    const {id} = req.params;
    console.log(" ID :"+id )
    console.log(req.body);
    const {tc_id, faculty_name, office_name, desig_id, phone_nos, mobile_no, email_id, status_id} = req.body;
    const sqlCmd = "update " + tblNameF + " set faculty_name = ?,office_name = ?, desig_id = ?,phone_nos = ?,mobile_no = ?,email_id = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [faculty_name,office_name, desig_id, phone_nos, mobile_no,email_id, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){ console.log(result);
            res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRouteF}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblNameF + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});




//  ---- APIs Office Universe starts here ------------------------------------------------------
const apiRoute7="clients"
const tblName7 ="mst_clients";

app.get('/get/clients',(req,res)=>{
    db.query("select a.id, a.client_descr, b.descr as controller, a.pao_code,a.mobile_no,a.email_id, c.descr as state, a.is_approved, d.descr as sts from mst_clients a, mst_controllers b, mst_states c, mst_current_status d where a.controller_id = b.id and a.state_id = c.id and a.status_id = d.id order by a.client_descr",(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});

app.post('/post/clients', (req, res)=>{
    const {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id} = req.body;
    const sqlInsert = "insert into mst_clients (controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id) values (?, ?, ?, ?,?, ?, ?, ?, ?,?,?,?)";
    db.query(sqlInsert, [controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});

app.get('/get/clients_check/:client_descr/:id',(req,res)=>{
    const {client_descr, id} = req.params
    const sqlCmd = "select id from mst_clients where client_descr = ? and id != ?"
    //const sqlCmd = "select id from mst_clients where client_descr = ?"    
    db.query(sqlCmd, [client_descr, id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.delete('/delete/clients/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from mst_clients where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/clients/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id,controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id from mst_clients where id=?";
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        res.send(result);
    });
});

app.put(`/update/clients/:id`,(req,res)=>{
    const {id} = req.params;
    console.log(" ID :"+id )

    const {controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id} = req.body;
    const sqlCmd = "update mst_clients set controller_id = ?, client_descr = ?, pao_code = ?, client_address = ?,state_id =?, tc_id = ?, contact_person = ?, email_id = ?,phone_nos = ?,mobile_no = ?, login_id = ?, status_id = ? where id = ?";
    //const sqlCmd = "update mst_clients set client_descr = ? where id = ?";    
    db.query(sqlCmd, [controller_id,client_descr,pao_code,client_address,state_id,tc_id,contact_person,email_id,phone_nos,mobile_no,login_id,status_id, id], (error, result)=>{
    //db.query(sqlCmd, [client_descr, id], (error, result)=>{    
        if(error){res.send(error)}
        if(result){ console.log(result);
            res.send(result)}
    }); 
});

app.put(`/updateStatus/clients/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update clients set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});

//  ---- APIs Office Universe starts here ------------------------------------------------------
apiRoute="office_universe"
const tblName2 ="mst_office_universe";

app.get(`/get/office_universe`,(req,res)=>{
    db.query("select a.id, a.emp_name, b.descr as designation, a.phone_nos,a.mobile_no,a.email_id, c.descr as user_role,d.descr as tc, a.login_id, a.is_approved, e.descr as sts from mst_office_universe a, mst_designations b, mst_user_roles c, mst_training_centres d, mst_current_status e where a.desig_id = b.id and a.user_role_id = c.id and a.tc_id = d.id and a.status_id = e.id order by a.emp_name",(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});

app.post(`/post/office_universe`, (req, res)=>{
    console.log("Table:"+tblName2);
    const {tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id} = req.body;
    const sqlInsert = "insert into " + tblName2 + " (tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id) values (?, ?, ?, ?,?, ?, ?, ?, ?)";
    db.query(sqlInsert, [tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});


app.get(`/get/office_universe_check/:emp_name/:id`,(req,res)=>{
    const {emp_name, id} = req.params
    const sqlCmd = "select id from mst_office_universe where emp_name = ? and id != ?"
    db.query(sqlCmd, [emp_name, id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.delete(`/delete/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from " + tblName2 + " where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get(`/getById/office_universe/:id`,(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "select id, tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id from mst_office_universe where id=?";
    console.log("tbl:"+tblName2)
    db.query(sqlCmd, id, (error, result)=>{
        if(error) throw error;
        // console.log(result);
        res.send(result);
    });
});

app.put(`/update/office_universe/:id`,(req,res)=>{
    const {id} = req.params;
    console.log(" ID :"+id )
    console.log(req.body);
    const {tc_id, emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id} = req.body;
    const sqlCmd = "update mst_office_universe set emp_name = ?, desig_id = ?,phone_nos = ?,mobile_no = ?,email_id = ?,user_role_id = ?, login_id = ?, status_id = ? where id = ?";
    db.query(sqlCmd, [emp_name, desig_id, phone_nos, mobile_no,email_id,user_role_id,login_id, status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){ console.log(result);
            res.send(result)}
    }); 
});

app.put(`/updateStatus/${apiRoute}/:id`,(req,res)=>{
    const {id} = req.params;
    const {status_id} = req.body;
    const sqlCmd = "update " + tblName2 + " set status_id = ? where id = ?";
    db.query(sqlCmd, [status_id, id], (error, result)=>{
        if(error){res.send(error)}
        if(result){res.send(result)}
    }); 
});



//--------------- Courses APIs --------------------

app.post('/post/courses', (req, res)=>{
    const {tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id} = req.body;
    const sqlInsert = "insert into trn_courses (tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id,status_id) values (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)";
     db.query(sqlInsert, [tc_id,tt_main_id,tt_sub_id,main_topic_id,mode_of_training,date_from,date_upto,last_date,course_fee,course_director_id,course_coordinator_id, status_id], (error, result)=>{
        // db.query(sqlInsert, [3,5,2,2,1,'2022-12-25','2022-12-25','2022-12-25',1,1], (error, result)=>{
        if(error){console.log(error)}
        if(result){res.send(result)}
    });
});

app.get('/get/courses',(req,res)=>{
    db.query("select a.id, b.descr as training_type, c.descr as main_topic, date_from, date_upto, mode_of_training, a.is_approved, d.descr as sts from trn_courses a, mst_training_types_sub b, mst_topics_main c, mst_current_status d where a.tt_sub_id = b.id and a.main_topic_id = c.id and a.status_id = d.id  order by main_topic",(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});


app.delete('/delete/courses/:id',(req,res)=>{
    const {id} = req.params;
    const sqlCmd = "delete from trn_courses where id = "+id;
    db.query(sqlCmd, (error, result)=>{
        if(error){return error}
        if(result){return result}    
    });
});

app.get('/get/courses/:tt_sub_id',(req,res)=>{
    const {tt_sub_id} = req.params;
    const sqlCmd = "select a.id as course_id, b.descr as topic, b.id as topic_id, date_from, date_upto from trn_courses a, mst_topics_main b where a.main_topic_id = b.id and tt_sub_id  = "+tt_sub_id;
    db.query(sqlCmd, (err, result)=>{
        if(err) throw err;
        else {
    // console.log(result);
    res.send(result);}
    })    
});

app.get('/get/courses1/:tt_sub_id/:main_topic_id',(req,res)=>{
    const {tt_sub_id, main_topic_id} = req.params;
    const sqlCmd = "select a.id, date_from, date_upto from trn_courses a, mst_topics_main b where a.main_topic_id = b.id and tt_sub_id  = ? and main_topic_id = ?";
    db.query(sqlCmd,[tt_sub_id, main_topic_id], (err, result)=>{
        if(err) throw err;

    // console.log(result);
    res.send(result);
    })    
});

app.get('/get/courses2/:course_id',(req,res)=>{
   
    const {course_id} = req.params;
    const sqlCmd = "select id, date_from, date_upto, main_topic_id from  trn_courses where id = ?";
    db.query(sqlCmd,[course_id], (err, result)=>{
//        if(err) throw err;
    if(err) console.log(err);
    console.log("API Result:"+result);
    res.send(result);
    })    
});


//--------------- remaining APIs --------------------

app.get('/get/current_status',(req,res)=>{
    db.query("select * from mst_current_status where id<=2 order by descr ",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});



// app.post('/post/clientoffices', (req, res)=>{
//     console.log(req.body);
//     const {controller_code,office_name,address,state_code,pao_code,contact_person,email_id,phone_nos, mobile_no, nearest_tc} = req.body;
//     const sqlInsert = "insert into mst_client_offices (controller_code,office_name,address,state_code,pao_code,contact_person,email_id,phone_nos, mobile_no, nearest_tc) values (?,?,?,?,?,?,?,?,?,?)";
//     db.query(sqlInsert, [controller_code,office_name,address,state_code,pao_code,contact_person,email_id,phone_nos, mobile_no, nearest_tc], (error, result)=>{
//         if(error){
//             console.log(error);
//         }
//     });
// });

// app.post('/post/clients', (req, res)=>{
//     console.log(req.body);
//     const {controller_code,office_name} = req.body;
//     const sqlInsert = "insert into mst_clients (controller_code,office_name) values (?,?)";
//     db.query(sqlInsert, [controller_code,office_name], (error, result)=>{
//         if(error){
//             console.log(error);
//         }
//     });
// });

// app.post('/post/office_universe', (req, res)=>{
//     console.log('body...',req.body);
//     const {emp_name,desig_id, phone_nos, mobile_no, email_id, role_id, login_id, status_id} = req.body;
//     const sqlInsert = "insert into mst_office_universe (emp_name, desig_id, phone_nos, mobile_no, email_id, role_id,login_id, status_id) values (?,?,?,?,?,?,?,?)";
//     db.query(sqlInsert, [emp_name, desig_id, phone_nos, mobile_no, email_id, role_id, login_id, status_id], (error, result)=>{
//         if(error){
//             console.log(error);
//         }
//     });
// });

// app.get('/get/office_universe',(req,res)=>{
//     db.query("select emp_id, emp_name, b.descr as desig, email_id, phone_nos, mobile_no, c.descr as role_description from mst_office_universe a, mst_designations b, mst_roles c where a.desig_id = b.id and a.role_id = c.id and a.status_id=1 order by emp_name",(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// });

