'use strict';

const express = require('express');
const cors = require ('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const allChocalateData = require('./data/allChocalateData');
const { default: axios } = require('axios');

mongoose.connect(`${process.env.MONGO_LINK}`, {useNewUrlParser: true,useUnifiedTopology: true});

server.get('/chocolate',getchocolateHandler);


async function getchocolateHandler (request,response){

let seacrchQuery=request.query.seacrchQuery;

let url =`https://ltuc-asac-api.herokuapp.com/allChocolateData`

try { 
axios.get(url).then((chocolateresult)=> { 

let chocolatearray = chocolateresult.data.map((item)=>{ 


return new chocoltess(item);

});
response.send(chocolatearray)
})

} catch (error) {

response.send(error)
}
}

class chocoltess { 

    constructor(chocoooData) {

        this.title=chocoooData.title;
        this.imageUrl=chocoooData.imageUrl;
    }
}




// const choschema =new mongoose.Schema({

// title:String, 
// imageUrl:String
// })


// const choModel = mongoose.model('chocolates',choschema);


// function seedData(){
// const cho1 = new choModel({

//     title:"Ferrero - Rocher 375g",
//     imageUrl: "https://images.shopdutyfree.com/image/upload/c_pad,f_auto,h_350,w_350/v1584691684/030/001/001/9800012701/9800012701_1_default_default.jpg"
// })

// const cho2 = new choModel({

//     title:"Ferrero - Rocher 375g",
//     imageUrl: "https://images.shopdutyfree.com/image/upload/c_pad,f_auto,h_350,w_350/v1584691684/030/001/001/9800012701/9800012701_1_default_default.jpg"
// })
// cho1.save();
// cho2.save();
// }
// seedData();

server.get('/test',(request,response)=>{



        response.send('your server is working');
    });










server.listen(PORT,()=> { 

console.log(`LESTINING ON PORT ${PORT}`)

})