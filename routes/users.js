const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1/demo4");
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    // fatherName: String,
    // motherName: String,
    desc : String,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
      }],
    dateAdded: {
      type:Date,
      default: Date.now()
    },
    // userName: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    // },
    // posts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post'
    // }],
    // dp: {
    //     type: String,
    //     default: 'default.jpg' // Assuming a default image file name
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // fullName: {
    //     type: String,
    //     required: true,
    // }
});
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
