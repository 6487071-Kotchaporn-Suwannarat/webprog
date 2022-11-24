const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const port = 3003;
const app = express();
const router = express.Router();
app.use(router);

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection ({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});
connection.connect(function(err) {
        if(err) throw err;
        console.log(`Connect DB: ${process.env.MYSQL_DATABASE}`)
});

/*-------------------------------------------------------------------
                    Testing select admin id 
                    method: GET
                    URL: http://localhost:3003/adminid
                    body: raw JSON
                    {
                        "admin_id": 6487071
                    } 
-------------------------------------------------------------------*/

router.get("/admin/id", function (req, res) {
    let adminid = req.body.admin_id;
    if(!adminid) {
        return res.status(400).send({ error: true, message: "Please provide admin id."});
    }
    connection.query("SELECT * FROM admin_data WHERE admin_id = ?", adminid, function (error, results) {
        if(error) throw error;
        return res.send({ error: false, data: results[0], message: "ID Admin retrieved"});
    });
}); 

/*-------------------------------------------------------------------
                    Testing select admin id 
                    method: GET
                    URL: http://localhost:3003/admin/selectall
                    body: raw JSON
 -------------------------------------------------------------------*/

router.get("/admin/selectall", function (req, res) {
    connection.query("SELECT * FROM admin_data", function (error, results) {
        if(error) throw error;
        return res.send({ error: false, data: results, message: "Student list."});
    });
});

/*-------------------------------------------------------------------
                    Testing insert admin 
                    method: POST
                    URL: http://localhost:3003/admin/insert
                    body: raw JSON
                    {
                        "admin" : {
                            "admin_id" : 6487088,
                            "admin_name" : "Lala Lulu",
                            "tel" : "0854569876",
                            "email" : "lala.lul@student.mahidol.ac.th",
                            "duty" : "Admin",
                            "salary" : 1200,
                            "admin_image" : "-"
                        }
                    }
 -------------------------------------------------------------------*/

router.post("/admin/insert", function (req, res) {
    let admin = req.body.admin;
    console.log(admin);
    if(!admin) {
        return res.status(400).send({ error: true, message: "Please provide admin information"});
    }
    connection.query("INSERT INTO admin_data SET ?", admin, function (error, results) {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: "New admin has been created successfully."});
    });
});

/*-------------------------------------------------------------------
                Testing update admin 
                method: PUT
                URL: http://localhost:3003/admin/update
                body: raw JSON
                {
                    "admin" : {
                        "admin_id" : 6487078,
                        "admin_name" : "Lala Lulu",
                        "tel" : "0854569876",
                        "email" : "lala.lul@student.mahidol.ac.th",
                        "duty" : "Admin",
                        "salary" : 1200,
                        "admin_image" : "-"
                }
                }
 -------------------------------------------------------------------*/

router.put("/admin/update", function (req, res) {
    let admin = req.body.admin;
    let admin_id = req.body.admin.admin_id;
    console.log(admin);
    if(!admin_id || !admin) {
        return res.status(400).send({ error: admin, message: "Please provide admin information"});
    }
    connection.query("UPDATE admin_data set ? WHERE admin_id= ?", [admin, admin_id], function (error, results) {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: "Admin has been updated successfully."});
    });
});

/*-------------------------------------------------------------------
                    Testing delete admin id 
                    method: DELETE
                    URL: http://localhost:3003/admin/delete
                    body: raw JSON
                    {
                        "admin_id": 6487078
                    }
 -------------------------------------------------------------------*/

router.delete("/admin/delete", function (req, res) {
    let admin_id = req.body.admin_id;
    if(!admin_id) {
        return res.status(400).send({ error: true, message: "Please provide personal AdminID"});
    }
    connection.query("DELETE FROM admin_data WHERE admin_id = ?", [admin_id], function (error, results) {
        if(error) throw error;
        return res.send({error: false, data: results.affectedRows, message: "New admin has been deleted successfully."});
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});