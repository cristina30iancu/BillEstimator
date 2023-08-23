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
  linePrices: [
    {
      line: { type: Number, required: false },
      freeLinePromotion: { type: String, enum: ['Y', 'N'], required: false },
      combinedMRCExisting: { type: Number, required: false },
      combinedMRCNew: { type: Number, required: false },
      MRC: { type: Number, required: false },
    },
  ],
  benefits: [{ type: Schema.Types.ObjectId, ref: 'Benefit', required: false }]
});

const passwordSchema = new Schema({
  hashedPassword:  { type: String, required: true },
});

// Create models for Benefit and Plan
const BenefitDetail = mongoose.model('BenefitDetail', benefitDetailSchema);
const Benefit = mongoose.model('Benefit', benefitSchema);
const Plan = mongoose.model('Plan', planSchema);
const Password = mongoose.model('Password', passwordSchema);

module.exports = {
  BenefitDetail,
  Benefit,
  Plan,
  Password
};