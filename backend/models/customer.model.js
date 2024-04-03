const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    profilePic: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);