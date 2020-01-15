const mongoose = require('mongoose');
const mongoURL2 = process.env.MONGODB_URI || 'mongodb://localhost:27017/hostingdb';

const liveDB = 'mongodb+srv://dapsdb:dskull@cluster0-33qxu.mongodb.net/hostingdblive?retryWrites=true&w=majority'
// DB hostingdblive


mongoose.connect(liveDB, {useNewUrlParser: true,  useUnifiedTopology: true})
.then(db =>{
    console.log('Db now connected');
})
.catch(err => {
    console.log('connection Failed');
})

require('./user.model');
require('./property.model');