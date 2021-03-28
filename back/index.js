const express = require('express');
const app = express();
const session = require('express-session');
const server = require("http").createServer(app)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
const authUser = require('./routes/users')
const role = require('./routes/roles')
const company = require('./routes/companies')
const product = require('./routes/products')
const price = require('./routes/prices')
const categoriesCompany = require('./routes/categories_company')
const productCategory = require('./routes/categories_product')
const order = require("./routes/orders")
const orderEntries = require("./routes/order_entries")
/*const collection = db.collection('Product');
const changeStream = collection.watch();
changeStream.on('change', next => {
  console.log('Product stream')
});*/
dotenv.config();

// Connect to DB

mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
     } ,
    
   /* (db) => {
      const changeStream = db("product").collection("Product").watch();
        changeStream.on("change", next => {
          console.log(next);
      });*/
        console.log('connected to database')
);
app.use(cors({credentials: true, origin: ['http://localhost:8100','http://localhost:3000']}));

//Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true, cookie: {
    secure: false,
  }}));
// Route Middleware

app.use('/api/user',authUser);
app.use('/api/role',role);
app.use('/api/company',company);
app.use('/api/price',price);
app.use('/api/product',product);
app.use('/api/productCategory',productCategory);
app.use('/api/categComp',categoriesCompany);
app.use('/api/order',order);
app.use('/api/orderEntries',orderEntries);
//app.use('/api/user',authRoute);

server.listen(3001,() => console.log('server is runing'));

