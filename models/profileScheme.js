const mongoose = require('mongoose');

const profile = new mongoose.Schema({
    file: {
        type: String,
        required: true
    }
});
profile.set("timestamps",true)
const ProfileScheme = mongoose.model('profile', profile);

module.exports = ProfileScheme
