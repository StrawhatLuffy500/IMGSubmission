// Requiring Everyting first
const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
const port = process.env.PORT || 5000;
const User = require("./models/userdata"); // The User I exported can be imported like this
require("./");
require("./db/conn"); // require("./f1/folder2")  You can require path like this

// Setting path of html files
const staticpath = path.join(__dirname, "./public");
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routing: http and url and asking If I can read html file, If I can't it follows if condition
app.get("/", (req, res) => {
  res.send("Hi I am Arya");
});

var http = require("http");
var url = require("url");
const { collection } = require("./models/userdata");

http.createServer((req, res) => {
  var q = url.parse(req.url, true);
  var filename = "../contact.html" + q.pathname;
  fs.readfile(filename, function (err, data) {
    if (err) {
      res.send("Sorry this is in res.send");
      return res.end("Page not found");
    }
    res.send("Yes 200 this is in res.send");
    return res.end();
  });
});
// Routing Over Here

// Sending data to Mongo Database
// async promises .save() object for our Test subject
app.post("/index", async (req, res) => {
  try {
    // To see the object created in console in broweser use req.send(req.body)
    res.send("Hello");

    var user1 = await new User(req.body); // User is an something I created in a file named userdata which will save my data and follow my Schema I exported it using module.exports=User; function

    await user1.save();
    user1.save().then((savedDoc) => {
      savedDoc === user1; // Triple equal operator
      res.send("this was done");
    });
    res.status(201).render("/"); // Send 201 code if successfully saved
  } catch (error) {
    res.status(500).send(error); // send 500 code if error is caught
  }
});
// Sending Data is Over

// Login
app.post("/login", async (req, res) => {
  try {
    console.log(req.body.email);
    const check = await User.findOne({ email: req.body.email });
    console.log(check);
    // console.log(req.body.email);
    if (check.password === req.body.password) {
      res.status(200).send("Logged in successfully");
      //   res.send("Logged in successfully")
      // There is an error because of this line
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    console.error(error.message);
    res.send("Something went wrong");
  }
});

// app.post("/login",async(req,res)=>{
// const {name, password} = req.body;
//     console.log(name, password);
//     try {
//       check if user exists already
//       let user = await User.findOne({ name: req.body.name });
//       if(!user){
//         return res
//           .status(400)
//           .json({
//             error: "Please try to login with correct credentials!!!",
//           });
//       }
//       if(check.password===req.body.password){
//                 res.status(202).render('/')
//             }
//             else{
//                 res.send("wrong password")
//             }
//     }
//     catch{
//             res.send("Wrong Details")
//     }
// })
// Login is Over

// Creating Sever
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
