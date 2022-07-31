require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');
const pastesRouter =require('./routers/pastes.js');


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("MongoDB Error:", error));

mongoose.connection.on('connected', function () {  
  console.log('Mongodb Connected');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.json());
app.use(cors());

app.use('/', pastesRouter);
app.use('/auth', require('./routers/users'));

app.use(express.static(path.resolve(__dirname, "./client/build")));
var PORT=process.env.PORT || 5000;
console.log(PORT)
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
