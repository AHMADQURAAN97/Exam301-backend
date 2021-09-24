"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const axios = require("axios");

mongoose.connect(`${process.env.MONGO_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const choSchema =new mongoose.Schema({

email:String,
url:String,
title:String,
})

const choModel = mongoose.model("chocolates",choSchema);

//====================ROUTES==================

server.get('/chocolate', getchocolateHandler);
server.get('/getdata',getDataHandler);
server.post('/addData',addDataHandler);
server.delete('/deleteChoco/:id',deleteDataHandler);
server.put('/updateData/:id',updateDataHandler)


//======================Get allChocolate DATA==============
  function getchocolateHandler(request, response) {

  let url = `https://ltuc-asac-api.herokuapp.com/allChocolateData`;
  try {
    axios.get(url).then((chocolateresult) => {
      let chocolatearray = chocolateresult.data.map((item) => {
        return new chocoltess(item);
      });
      response.send(chocolatearray);
    });
  } catch (error) {
    response.send(error);
  }

}


class chocoltess {
 constructor(element) {
   this.title = element.title;
   this.url = element.imageUrl;
 }
}

// let result = await axios.get(`https://ltuc-asac-api.herokuapp.com/allChocolateData`);
// response.send(result.data)

//======================ADD Data Handler==============

async function addDataHandler(request,response){

  let {email,title,url}=request.body;

  await choModel.create({email,title,url});
  // choModel.find({email},function(err,data){

  //   if(err){
  //     console.log('error')
  //   }else {
  //     response.send(data)
  //   }
  // })
 
}


//======================Get Data Handler==============

function getDataHandler(request,response){

  let email = request.query.email;

  choModel.find({email:email},function(err,ownerData){

if (err){

  response.send('Error in geting Data')
} else {
  response.send(ownerData)
}
  })


}



//=========================Delete Data Handler================


async function deleteDataHandler(request,response){

  let email = request.query.email;
  let chocoID = request.params.id;


  choModel.remove({_id:chocoID},(err,ownerData)=>{

   if (err){
     console.log('error in delete data')
   }else {

  choModel.find({email:email},function(err,chocolatesData){

    if (err){console.log('error in deleting chocolate')
  }else {
response.send(chocolatesData)
    
  }
  })
  }
  })

} 


//===========================Update Data=============

async function updateDataHandler(request,response){

let chocoID = request.params.id;
let {email,title,url}=request.body;

choModel.findOne({_id:chocoID},(err,ownerData)=>{


ownerData.title=title;
ownerData.url=url;
ownerData.email=email;

ownerData.save();

if (err) {
  console.log('error in update data')
}else {

  choModel.find({email:email},function(err,chocoData){

   if(err) {
     console.log('error in updaaate data')
   }else {
     response.send(chocoData)
  
  }

  })

}

})

}















server.get("/test", (request, response) => {
  response.send("your server is working");
});

server.listen(PORT, () => {
  console.log(`LESTINING ON PORT ${PORT}`);
});
