//Server File

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3600;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const url = require('url');
// const querystring = require('querystring');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())

//Controllers
const homeController = require('./controllers/home_controller');
const registerController = require('./controllers/register_controller');
const propertyController = require('./controllers/property_controller');
const resourcesController = require('./controllers/resources_controller');
const loginController = require('./controllers/login_controller');
const fileController = require('./controllers/file_controller');

app.use('/register', registerController);
app.use('/properties', propertyController);
app.use('/resources', resourcesController);
app.use('/login', loginController);
app.use('/file', fileController);
app.use('/', homeController);

app.get('/', (req, res)=>{
    res.redirect('/home')
})
 
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});






