const express=require("express");
const session=require('express-session');
const cookieParser=require('cookie-parser');
const path=require("path");
const app=express();
 
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('!@#$%^&*()전은수는예쁘다'));
app.use(session({
  name:'JES_SID',
  timeout:30,
  resave:false,
  saveUninitialized:false,
  secret:'!@#$%^&*()전은수는예쁘다',
  cookie:{
    httpOnly:true,
    secure:false   
  }
  }));

const contact=require('./routes/contact');
app.use('/contact', contact);
const medical=require('./routes/medical');
app.use('/medical', medical);
  
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
 
app.listen(9000,function(){
    console.log("9000 server ready...");
});
