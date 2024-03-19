
var express = require("express");
var app = express();
var mysql = require("mysql2");

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




// Define your GET endpoint to fetch data
app.get('/getdata', async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: 'No ID provided' });
    }

    // Function to execute SQL queries
    const query = (str) => {
      return new Promise((resolve, reject) => {
        connection.query(str, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Fetch data from different tables based on the provided ID
    const emp_det = await query(`SELECT * FROM basic_details WHERE emp_id=${id}`);
    const edu_det = await query(`SELECT * FROM education WHERE emp_id=${id}`);
    const work_exp = await query(`SELECT * FROM workexp WHERE emp_id=${id}`);
    const lang_know = await query(`SELECT * FROM language_known WHERE emp_id=${id}`);
    const tech_know = await query(`SELECT * FROM technology_known WHERE emp_id=${id}`);
    const reference = await query(`SELECT * FROM reference WHERE emp_id=${id}`);
    const preference = await query(`SELECT * FROM preference WHERE emp_id=${id}`);

    // Construct the response object
    const response = {
      basic_det: emp_det,
      edu_det: edu_det,
      work_exp: work_exp,
      lang_know: lang_know,
      tech_know: tech_know,
      reference: reference,
      preference: preference
    };
    console.log(response)

    // Send the response
    res.json(response);
    // res.redirect("index.ejs")
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 

});
app.get("/update",(req,res)=>{
    res.render("index.ejs");
})
// app.get("getdata:id",(rew,res)=>{
//     res.render("index.ejs")
// })

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

