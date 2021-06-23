const { urlencoded } = require('express');
const express = require('express');
const app = express ();
const mysql = require('mysql');

app.use(express.urlencoded({extended: false}));

//Creating to connection to our database
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'New',
    password: '',
    database: 'microhard'
});

//Test database connection
conn.connect(function(err){
    if(err){
    console.log(err);
}else{
    console.log('Database is connected!')
}});

app.get('/',function(req,res){
    let sql = 'SELECT * FROM students';
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//Filter by gender and department
app.get('/filter',function(req,res){
    let sql = `SELECT * FROM students where gender = '${req.query.gender}' and department_id = ${req.query.department_id}`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//Get by gender
app.get('/gender',function(req,res){
    let sql = `SELECT * FROM students where gender = '${req.query.gender}'`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//Get by department
app.get('/department',function(req,res){
    let sql = `SELECT * FROM students where department_id = ${req.query.department_id}`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//Get by ID
app.get('/id/:id',function(req,res){
    let sql = `SELECT * FROM students where id = ${req.params.id} limit 1`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            if(result.length < 1){
                res.status(404).send('No info available');
            }
            res.send(result[0]); // can also use result.pop() - returns an object from the array!
        }
    })
});

//Update
app.patch('/update',function(req,res){
    let sql = `UPDATE students set gpa = ${req.body.gpa} where id = ${req.body.id}`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//Delete
app.delete('/delete',function(req,res){
    let sql = `DELETE FROM students where id = ${req.query.id}`
    conn.query(sql, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});
    

app.post('/',function(req,res){
    let sql = `INSERT INTO students(first_name, last_name, age, gender, gpa, department_id) VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.age}','${req.body.gender}',${req.body.gpa},${req.body.department_id})`;

    conn.query(sql, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.redirect('/');
        }
    })
});

app.listen(3000, function(){
    console.log('Server running on port 3000')
});