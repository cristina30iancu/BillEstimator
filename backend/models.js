const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define BenefitDetail schema
const benefitDetailSchema = new Schema({
  description: { type: String, required: true },
});

// Define Benefit schema
const benefitSchema = new Schema({
  name: { type: String, required: true }, benefitDetails: [{ type: Schema.Types.ObjectId, ref: 'BenefitDetail' }]
});

// Define Plan schema
const planSchema = new Schema({
  name: { type: String, required: true },
  benefits: [{ type: Schema.Types.ObjectId, ref: 'Benefit' }],
});

// Create models for Benefit and Plan
const BenefitDetail = mongoose.model('BenefitDetail', benefitDetailSchema);
const Benefit = mongoose.model('Benefit', benefitSchema);
const Plan = mongoose.model('Plan', planSchema);

module.exports = {
  BenefitDetail,
  Benefit,
  Plan,
};