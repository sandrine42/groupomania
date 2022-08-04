const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({path :'./config/.env'});
 mongoose
 .connect(process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>
    console.log("La connection a réussie avec MongoDb")
    )
    .catch ((err) =>
    console.log("La connexion a échouée avec MongoDB",err)
    )