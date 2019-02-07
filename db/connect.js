var mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/new-hope",{ useNewUrlParser: true });
 console.log(process.env.DATABASEURL);
mongoose.set('useCreateIndex', true);
module.exports={
    mongoose :mongoose
};