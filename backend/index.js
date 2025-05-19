const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 3001;


app.get('/ping',(req,res) => {
    res.send("pong")
})

 
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
    
})

 
 