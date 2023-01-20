const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
let Article = require('./Models/article.js');
const app = express();

app.use(express.static('public'));
app.use(express.json);

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.1dnn4wp.mongodb.net/WebsiteContent?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
  // function will activate once to let us know we are connected
  mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
  });

app.post("/create_article", (req, res) => {
    console.log(req.body);
    Article.create(req.body);
    res.send("Good Request")
})


 app.listen(5000, () => {
    console.log('Server is on port 5000')
 });