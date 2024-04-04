const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    text: {
        type: String,
        required: true
    },
    
});
scheme.set("timestamps",true)
const SchemeReview = mongoose.model('scheme', scheme);

module.exports = SchemeReview

