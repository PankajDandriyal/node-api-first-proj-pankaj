
const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
var XLSX = require("xlsx");
const upload = multer({ dest: 'uploads/' });

const verifyToken = require('../middleware/authMiddleware');
// Protected route

router.get('/movie-reviews', verifyToken, async (req, res) => {
    try {
        const reviews = await MovieReview.find()
        // Send the reviews as a JSON response
        res.json(reviews);

    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/scheme-reviews',verifyToken, async (req, res) => {
    try {
        const reviews = await SchemeReview.find()
        // Send the reviews as a JSON response
        res.json(reviews);

    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add-scheme-reviews',verifyToken,async (req, res) => {
    try {
        const { name, text, email } = req?.body
        await SchemeReview.create({
            name,
            text,
            email
        })
        res.json({ "success": true, "status": 200 });
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/upload',verifyToken, upload.single('file'), async (req, res) => {
    console.log(req.file)
    const tempPath = req?.file?.path;

    // Define the path where you want to save the uploaded file
    const targetPath = 'uploads/' + new Date() + req.file.originalname;

    // Create a readable stream
    const src = fs.createReadStream(tempPath);

    // Create a writable stream
    const dest = fs.createWriteStream(targetPath);
    src.pipe(dest);

    await ProfileScheme.create({
        'file': targetPath
    })

    src.on('end', () => {
        // Remove the temporary file
        fs.unlink(tempPath, (err) => {
            if (err) {
                console.error(err);
            }
        });

        res.send('File uploaded successfully!');
    });

    // Handle errors during file transfer
    src.on('error', (err) => {
        console.error(err);
        res.status(500).send('Error uploading file');
    });


    res.send('File uploaded successfully!');

});

router.post('/add-json-to-csv',verifyToken, async (req, res) => {
    try {
        var files = []
        for (each in req?.body) {
            files.push(req?.body[each])
        }
        var obj = files.map((e) => {
            return e
        })

        var newWB = XLSX.utils.book_new()

        var newWS = XLSX.utils.json_to_sheet(obj)

        XLSX.utils.book_routerend_sheet(newWB, newWS, "name")//workbook name as param

        XLSX.writeFile(newWB, "uploads/Sample-Sales-Data.xlsx")//file name as param

        // await SchemeReview.create({
        //     name,
        //     text,
        //     email
        // })
        res.json({ "success": true, "status": 200 });
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;