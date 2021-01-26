const express = require('express');
const router = express.Router()
const User = require('../models/user');
const Meetings = require('../models/meetings')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

const JWT_SECRET = 'ndasasuheqdnsjnaksdkandkjnand@32131#@13madsakdsnans';
var nodemailer = require('nodemailer');
var currentUserEmail = null;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zeeshansheray7@gmail.com',
        pass: 'kargin123@',
    }
});

router.post('/signup', async (req, res) => {
    //hasingpassword
    try{
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: password,
    })
    console.log(newUser.username);
    newUser.save()
        .then(data => {
            console.log('user is added');
            res.json(data);
            res.json({ status: 'ok' });
        }).catch(error => {
            if (error.code === 11000) {
                console.log(error);
                console.log('Username already in use');
                res.json({ status: 'error', error: 'Username is already in use' })
            }
        }) }
        catch (error) {
            console.log(error);
        }
})

router.post('/inviteuser', async (req, res) => {
    const email = req.body.email;
    const time = req.body.time;

    var mailOptions = {
        from: 'itourcompanion@gmail.com',
        to: email,
        subject: 'Sending Invite regarding a meeting',
        text: `The meeting time scheduled is ${time} am in PST. Login to accept. ${'https://meetingwebheroku.herokuapp.com/'}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    const newMeeting = new Meetings({
        meetingFrom: currentUserEmail,
        meetingWith: email,
        meetingTime: time,

    })
    newMeeting.save()
        .then(data => {
            console.log('Meeting is saved');
            res.json(data);
            res.json({ status: 'ok' });
        }).catch(error => {
            throw error
        })


})


router.post('/login', async (req, res) => {
    try{
    
        const username = req.body.username;
    const password = req.body.password;
    currentUserEmail = req.body.username;

    
    const user = await User.findOne({ username }).lean();
    if (!user) {
        console.log('Invalid Username/Password')
        return res.json({ status: 'error', error: 'Invalid Username/Password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET)
        console.log('JWT Sucess');
        return res.json({ status: 'ok', Token: token, user: username })
    }
    res.json({ status: 'error', error: 'Invalid Username/Password' }) }
    catch(error){
        console.log(error);
    }

})

//viewInvites

router.get('/viewInvites', (req, res) => {
    console.log("email is " + currentUserEmail)
    Meetings.find({ meetingWith: currentUserEmail }, function (err, data) {
        if (err) console.log(err);
        else {
            res.json(data);
            console.log(data);
        }
    });
});

//accept meeting
router.post('/acceptMeeting', function (req, res) {
    Meetings.update(
        {
            _id: req.body.meetingId,
        },
        {
            accepted: true,
        },
        function (err, user) {
            if (err) {
                return console.error(err);
            }
            console.log('Meeting is sucessfully approved, regards!');
            res.status(200).send();
        }
    );
});

router.post('/deleteMeeting', function (req, res) {
    Meetings.findOneAndDelete(
        {
            _id: req.body.meetingId,
        },
        function (err, user) {
            if (err) {
                return console.error(err);
            }
            console.log('Meeting is sucessfully Removed, regards!');
            res.status(200).send();
        }
    );
});


module.exports = router;