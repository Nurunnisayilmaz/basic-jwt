const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const port = 3000

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
/* app.use(express.urlencoded({ extended: false })); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://nisa:55785578nN@cluster0.vic2c.mongodb.net/jwtApi?retryWrites=true&w=majority', { useNewUrlParser: true });


const indexRouter = require('./routes/router');
app.use('/api', indexRouter)




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;