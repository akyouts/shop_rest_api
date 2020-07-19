const express = require('express');
app = express();
//const bodyparser=require("body-parser");
const mongoose = require("mongoose");

//app.use(bodyparser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost:27017/new-shop",{useUnifiedTopology: true , useNewUrlParser: true})

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if(res.method == 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



const productsRoutes=require("./api/routes/products");
const orderssRoutes=require("./api/routes/orders");

app.use("/products", productsRoutes);
app.use("/orders", orderssRoutes);


app.use((req,res,next)=>{
    const error=new Error("Not Found");
    next(error);
})

app.use((error,req,res,next)=>{
   res.json({
       error: {
           message: error.message 
        }
   });
});

module.exports = app;