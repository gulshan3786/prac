
var express = require("express");
var app = express();
var mysql = require("mysql2");

// var basic=require("./basic_details");
// var edu=require("./education");
// var workexp=require("./work")
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port=3001;
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_12",
  });
  connection.connect(function (err) {
    if (err) {
      console.log("Error in the connection");
      console.log(err);
    } else {
      console.log(`Database Connected`);
    }
  });
  app.get("/",(req, res) => {
    res.render("index.ejs");
  });
  // app.get("/basic",basic);
  // app.get("/education",edu);
  // app.get("/work",workexp);



  app.post("/submit",(req,res)=>{
    var q = req.body;
    console.log(q);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const desig = req.body.desig;
    const add = req.body.add;
    const email = req.body.email;
    const pin = req.body.pin;
    const phone = req.body.phone;
    const city = req.body.city;
    const gender = req.body.gender;
    const state = req.body.state;
    const rel_status = req.body.rel_status;
    const dob = req.body.dob;
    const refname=req.body.refname;
    const contact=req.body.refcontact;
    const relation=req.body.refrel;
  
  
    const prefloc=req.body.prefloc;
    const np=req.body.np;
    const department=req.body.department;
    const exp_ctc=req.body.exp_ctc;
    const current_ctc=req.body.current_ctc
  //  const lang_arr=req.body.language;
   language=req.body.language;
   gujarati_know=req.body.gujarati_know;
   english_know=req.body.english_know;
   hindi_know=req.body.hindi_know;
   language_know=[]
   language_know.push(hindi_know);
   language_know.push(gujarati_know);
   language_know.push(english_know);
   console.log(language,language_know);
   php_level=req.body.php_level;
   oracle_level=req.body.oracle_level;
   mysq_level=req.body.mysql_level;
   laravel_level=req.body.laravel_level;
  
   console.log(req.body)
  
  
   technology=req.body.technology;
   technology_level=[];
   technology_level.push(php_level,oracle_level,mysq_level,laravel_level);
  console.log(technology,technology_level);
  
  //  console.log(req.)
    
  
    const query = `INSERT INTO basic_details(f_name, l_name,desig,add1,email,pin,phone,city,gender,state,rel_status,dob) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    connection.query(query, [
      fname,
      lname,
      desig,
      add,
      email,
      pin,
      phone,
      city,
      gender,
      state,
      rel_status,
      dob,
    ] ,(err,result)=>{
      if(err)throw err;
      for(let i=0;i<4;i++){
         var q2=`insert into education(emp_id,board,passing_year,percentage) values('${result.insertId}','${req.body.board[i]}','${req.body.passingyear[i]}','${req.body.per[i]}')`;
         if(req.body.board[i]){
          connection.query(q2,(err,result)=>{
            console.log(result);
           })
         }
        
        
      }
      for(let i=0;i<3;i++){
        var q3=`insert into workexp(emp_id,company,designation,from_date,to_date) values('${result.insertId}','${req.body.comp[i]}','${req.body.designation[i]}','${req.body.frm_date[i]}','${req.body.to[i]}')`;
        if(req.body.comp[i]){
          connection.query(q3,(err,result)=>{
            if(err)throw err;
            console.log(result)
          })
        }
      }
      for(let i=0;i<language.length;i++){
        var q4=`insert into language_known(emp_id,language_name,language_level) values('${result.insertId}','${language[i]}','${language_know[i]}')`;
        if(language[i]){
          connection.query(q4,(err,result)=>{
            if(err)throw err;
            console.log(result);
          })
        }
      }
      for(let i=0;i<technology.length;i++){
        var q5=`insert into technology_known(emp_id,technology,technology_level) values('${result.insertId}','${technology[i]}','${technology_level[i]}')`;
        if(technology[i]){
          connection.query(q5,(err,result)=>{
            if(err)throw err;
            console.log(result);
  
          })
        }
      }
      var q6=`insert into reference(emp_id,refname,contact,relation) values('${result.insertId}','${refname}','${contact}','${relation}')`;
      connection.query(q6,(err,result)=>{
        if(err)throw err;
        
      })
  
      var q7=`insert into preference(emp_id,prefloc,noticeperiod,department,exp_ctc,current_ctc) values('${result.insertId}','${prefloc}','${np}','${department}','${exp_ctc}','${current_ctc}')`;
      connection.query(q7,(err,result)=>{
        if(err)throw err;
        
      })
      
      
    });
    res.status(200).send('data inserted succesfully');
  });

  app.post("/update",async(req,res)=>{
    empid=req.body.custId;
    // console.log(empid)
    // console.log(req.body);
  
    const fname1 = req.body.fname;
    const lname = req.body.lname;
    const desig = req.body.desig;
    const add = req.body.add;
    const email = req.body.email;
    const pin = req.body.pin;
    const phone = req.body.phone;
    const city = req.body.city;
    const gender = req.body.gender;
    const state = req.body.state;
    const rel_status = req.body.rel_status;
    const dob = req.body.dob;
    
    if(empid){
      let query=(str)=>{
          return new Promise((resolve,reject)=>{
              connection.query(str,function(err,result){
                  if(err)throw err;
                  else {
                  resolve(result);
              }
                  
              })
          })
      }
     let q3= await query(`UPDATE basic_details set f_name = '${fname1}',l_name='${lname}',desig='${desig}',add1='${add}',email='${email}',pin='${pin}',phone='${phone}',city='${city}',
      
       gender='${gender}',state='${state}',rel_status='${rel_status}',dob='${dob}' WHERE emp_id = '${empid}'`);
       console.log(q3);
  
     
        
        
   }
    res.send("helooo");
  
  });
  app.get("/getdata",async(req,res)=>{
  // res.render("index.ejs")
    var id=(req.query.id);
    console.log(id);
    const obj={}

   if(id){
    let query=(str)=>{
        return new Promise((resolve,reject)=>{
            connection.query(str,function(err,result){
                if(err)throw err;
                else {
                resolve(result);
            }
                
            })
        })
    }
    let emp_det=await query(`select *from basic_details where emp_id=${id}`);
    let edu_det=await query(`select *from education where emp_id=${id}`);
    let work_exp=await query(`select *from workexp where emp_id=${id}`);
    let lang_know=await query(`select *from language_known where emp_id=${id}`);
    let tech_know=await query(`select *from technology_known where emp_id=${id}`);
    let reference=await query(`select *from reference where emp_id=${id}`)
    let preference=await query(`select *from preference where emp_id=${id}`)

    obj.basic_det=emp_det;
    obj.edu_det=edu_det;
    obj.work_exp=work_exp;
    obj.lang_know=lang_know;
    obj.tech_know=tech_know;
    obj.reference=reference;
    obj.preference=preference;
    // var obj1=JSON.stringify(obj)
    // res.render("form")
    // res.render("index.ejs")
    // res.json(obj1
res.json(obj)

   }else {
    res.send("no data found")
   }

    
  })

  
  app.listen(port,(err)=>{
    if(err)throw err;
    console.log(`app is listening on ${port}`)
  });

  
