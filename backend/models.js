const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Benefit schema
const benefitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Define Plan schema
const planSchema = new Schema({
  name: { type: String, required: true },
  benefits: [{ type: Schema.Types.ObjectId, ref: 'Benefit' }],
});

// Create models for Benefit and Plan
const Benefit = mongoose.model('Benefit', benefitSchema);
const Plan = mongoose.model('Plan', planSchema);

module.exports = {
  Benefit,
  Plan,
};