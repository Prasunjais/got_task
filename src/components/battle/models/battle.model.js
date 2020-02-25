const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const battleSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: true
  },
  year: {
    type: Number,
    min: 100,
    max: 2020,
    required: true
  },
  battleNumber: {
    type: Number,
    required: true
  },
  attackerKing: {
    type: String,
    required: true
  },
  defenderKing: {
    type: String,
    required: true
  },
  attackers: [{
    name: {
      type: String,
      default: ''
    }
  }],
  defenders: [{
    name: {
      type: String,
      default: ''
    }
  }],
  attackerOutcome: {
    type: String,
    enum: ['win', 'loss'],
    lowercase: true
  },
  battleType: {
    type: String
  },
  majorDeath: {
    type: Number
  },
  MajorCapture: {
    type: Number
  },
  attackerSize: {
    type: Number
  },
  defenderSize: {
    type: Number
  },
  attackerCommander: {
    type: String
  },
  defenderCommander: {
    type: String
  },
  summer: {
    type: Boolean,
    default: false
  },
  location: {
    type: String
  },
  region: {
    type: String
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

battleSchema.index({
  'attackerKing': 1,
});

// exporting the entire module
module.exports = mongoose.model('battles', battleSchema);
