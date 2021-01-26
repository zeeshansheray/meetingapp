const mongoose = require('mongoose');
const Meetings = new mongoose.Schema({
    meetingFrom: {
        type: String,
        required: true,
    },
    meetingWith: {
        type: String,
        required: true,
    },
    meetingTime: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userMeetings', Meetings);