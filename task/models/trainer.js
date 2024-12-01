const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
});

module.exports = mongoose.model('Trainer', trainerSchema);


