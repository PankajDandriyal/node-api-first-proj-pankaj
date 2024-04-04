const express = require('express')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoutes');
const app = express()

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use(express.json());

mongoose.connect('mongodb+srv://pankajdandriyal:ryPbXTBdNkfB2HuW@cluster0.evk9qjs.mongodb.net/sample_mflix')
    .then(() => console.log('Connected!'));

app.listen(3000)
