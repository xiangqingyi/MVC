const mongoose = require('mongoose')

// 没有mongoose.Promise = global.Promise  这个意思是mongoose自带的promise过期了
// 然后需要v8引擎的promise
mongoose.Promise = global.Promise  
mongoose.connect('mongodb://localhost:27017/usermvc')

const userSchema = new mongoose.Schema({
    username:String,
    email:String
})

const model = mongoose.model('user',userSchema)
module.exports = model;