const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const student = require('./Schema/Student');
const cors = require('cors');

const corsorgin = { origin: 'http://localhost:3000' };

mongoose.connect('mongodb://localhost:27017/StudentDetails')
.then(() => {
    console.log('Connected');
})
.catch((err) => {
    console.log(err);
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsorgin));

app.post('/create', async (req, res) => {
    const data = await student.create({
        Name: req.body.Name,
        Course: req.body.Course,
        CertificateNo: req.body.CertificateNo,
    });
    res.send(data);
});

app.get('/find', async (req, res) => {
    const data = await student.find(req.body);
    res.send(data);
});

app.get('/find/:_id', async (req, res) => {
    const data = await student.findById(req.params._id);
    res.send(data);
});

app.put('/edit/:_id', async (req, res) => {
    const data = await student.updateOne(
        { _id: req.params._id },
        {
            $set: {
                Name: req.body.Name,
                Course: req.body.Course,
                CertificateNo: req.body.CertificateNo,
            },
        }
    );
    res.send(data);
});
app.delete('/delete/:_id', async (req, res) => {
    const data = await student.deleteOne({_id: req.params._id})
    res.send(data)
});
app.listen(2824, () => {
    console.log("server is running")
});