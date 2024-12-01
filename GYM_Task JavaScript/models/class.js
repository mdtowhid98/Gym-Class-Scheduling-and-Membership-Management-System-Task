const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, default: 120, validate: { // Duration in minutes
      validator: (value) => value === 120,
      message: 'Class duration must be exactly 2 hours (120 minutes)'
    }},
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  trainees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: function(v) {
        return this.trainees.length <= 10;
      },
      message: 'Class cannot have more than 10 trainees'
    }
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model("ClassModel", classSchema);