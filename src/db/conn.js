const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecom_db').then(()=>{
    console.log('connection are connected successfully.......');
}).catch((e)=>{
    console.log('not connected.....',e);
});