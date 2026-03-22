const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URL;
const port = url?.split(':')[2]?.split('/')[0];

const database = mongoose.connect(url,{
    
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() =>{
    console.log(`Db is connected successfully on port ${port}`);
}).catch((error) =>{
    console.log("Db is not Connected");
    console.error(error);
    process.exit(1);
})

module.exports = database;