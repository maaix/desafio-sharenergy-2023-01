const mongoose = require('mongoose');

const SharenergyDataSchema = new mongoose.Schema({
    title: String,
    notes: String,
    priority: Boolean,
});

module.exports = mongoose.model('Sharenergy', SharenergyDataSchema);