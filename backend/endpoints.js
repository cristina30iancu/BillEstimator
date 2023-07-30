const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const { BenefitDetail, Benefit, Plan } = require('./models');

async function addBenefitDetail(benefitId, description) {
    try {
        let existingDetail = await BenefitDetail.findOne({ description });

        if (!existingDetail) {
            const newDetail = { description };
            const result = await BenefitDetail.insertMany([newDetail]);
            existingDetail = result[0];
        }
        
        await Benefit.updateOne(
            { _id: benefitId },
            { $addToSet: { benefitDetails: existingDetail._id } }
        );

    } catch (err) {
        console.error('Error inserting benefit detail into MongoDB:', err);
        throw new Error('Database error');
    }
}

router.post('/plans', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[1];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of data) {
            const planName = row.__EMPTY;
            const benefitName = row.__EMPTY_1;
            const benefitDetailDescription = row.__EMPTY_2;
            
            try {
                let existingPlan = await Plan.findOne({ name: planName });
                if (!existingPlan) {
                    const newPlan = { name: planName, benefits: [] };
                    const result = await Plan.insertMany([newPlan]);
                    existingPlan = result[0];
                }

                let existingBenefit = await Benefit.findOne({ name: benefitName });
                if (!existingBenefit) {
                    const newBenefit = { name: benefitName, benefitDetails: [] };
                    const result = await Benefit.insertMany([newBenefit]);
                    existingBenefit = result[0];
                }
                
                await addBenefitDetail(existingBenefit._id, benefitDetailDescription);

                if (!existingPlan.benefits.some((b) => b._id.equals(existingBenefit._id))) {
                    await Plan.updateOne(
                        { _id: existingPlan._id },
                        { $addToSet: { benefits: existingBenefit._id } }
                    );
                }
            } catch (err) {
                console.error('Error inserting data into MongoDB:', err);
                return res.status(500).json({ error: 'Database error' });
            }
        }
        
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
        const plans = await Plan.find().populate({
            path: 'benefits',
            populate: {
                path: 'benefitDetails',
                model: BenefitDetail,
            },
        });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err });
    }
});


module.exports = router;