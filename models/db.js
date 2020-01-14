const mongoose = require('mongoose');
const mongoURL2 = process.env.MONGODB_URI || 'mongodb://localhost:27017/hostingdb';


mongoose.connect(mongoURL2, {useNewUrlParser: true,  useUnifiedTopology: true})
.then(db =>{
    console.log('Db now connected');
})
.catch(err => {
    console.log('connection Failed');
})

require('./user.model');
require('./property.model');