// endpoints.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const { BenefitDetail, Benefit, Plan } = require('./models');


router.post('/plans', upload.single('file'), async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Process the uploaded Excel sheet
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[1]; // Assuming data is in the first sheet
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of data) {
            const planName = row.__EMPTY;
            const benefitName = row.__EMPTY_1;
            const benefitDetailDescription = row.__EMPTY_2;
            console.log(planName, benefitName, benefitDetailDescription)
            try {
                // Check if the plan already exists in the database
                let existingPlan = await Plan.findOne({ name: planName });
                // If the plan doesn't exist, insert it into the database
                if (!existingPlan) {
                    const newPlan = { name: planName, benefits: [] };
                    const result = await Plan.insertMany([newPlan]);
                    existingPlan = result[0];
                }

                // Check if the benefit already exists in the database
                let existingBenefit = await Benefit.findOne({ name: benefitName });

                // If the benefit doesn't exist, insert it into the database
                if (!existingBenefit) {
                    const newBenefit = { name: benefitName, benefitDetails: [] };
                    const result = await Benefit.insertMany([newBenefit]);
                    existingBenefit = result[0];
                }
                let existingDetail = await BenefitDetail.findOne({ description: benefitDetailDescription });
                // Add the detail to the beenfit's details array if not already there
                if (!existingBenefit.benefitDetails.some((b) => b._id.equals(existingDetail._id))) {
                    await Benefit.updateOne(
                        { _id: existingBenefit._id },
                        { $push: { benefitDetails: existingDetail } }
                    );
                }

                // Add the benefit to the plan's benefits array if not already there
                if (!existingPlan.benefits.some((b) => b._id.equals(existingBenefit._id))) {
                    await Plan.updateOne(
                        { _id: existingPlan._id },
                        { $push: { benefits: existingBenefit } }
                    );
                }
            } catch (err) {
                console.error('Error inserting data into MongoDB:', err);
                return res.status(500).json({ error: 'Database error' });
            }
        }

        // Respond with success message
        res.json({ message: 'Data added successfully' });
    } catch (err) {
        console.error('Error processing the uploaded file:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/benefits', async (req, res) => {
    try {
        const benefits = await Benefit.find();
        res.json(benefits);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/plans', async (req, res) => {
    try {
        const plans = await Plan.find().populate('benefits');
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add more endpoints as needed

module.exports = router;