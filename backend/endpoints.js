const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const { BenefitDetail, Benefit, Plan } = require('./models');


router.post('/plans', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[2];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

        for (const row of data) {
            const { Plan: planName, Line, MRC } = row;
            console.log("Adding " + planName)
            const freeLinePromotionValue = row['Free Line Promotion [Y/N]'];
            const combinedMRCExistingValue = row['Combined MRC [Existing]'];
            const combinedMRCNewValue = row['Combined MRC [New]']
            try {
                let existingPlan = await Plan.findOne({ name: planName });
                if (!existingPlan) {
                    const newPlan = { name: planName, benefits: [], linePrices: [] };
                    const result = await Plan.insertMany([newPlan]);
                    existingPlan = result[0];
                }

                // Check if the linePrice entry already exists for the given Line
                const linePriceEntry = existingPlan.linePrices.find(
                    (entry) => entry.line === Line
                );


                if (!linePriceEntry && Number.isInteger(combinedMRCExistingValue)) {
                    // If the linePrice entry doesn't exist, create a new one
                    const newLinePriceEntry = {
                        line: Line,
                        freeLinePromotion: freeLinePromotionValue,
                        combinedMRCExisting: combinedMRCExistingValue,
                        combinedMRCNew: combinedMRCNewValue,
                        MRC: MRC
                    };

                    // Add the new linePrice entry to the linePrices array
                    existingPlan.linePrices.push(newLinePriceEntry);

                    // Save the updated plan document
                    await existingPlan.save();
                } else if (linePriceEntry) {
                    // If the linePrice entry already exists, update its values
                    linePriceEntry.hasPromotion = freeLinePromotionValue;
                    linePriceEntry.fixedPrice = combinedMRCExistingValue;

                    // Save the updated plan document
                    await existingPlan.save();
                }
            } catch (err) {
                console.error('Error inserting data into MongoDB:', err);
                return res.status(500).json({ error: 'Database error' });
            }
        }

        res.status(200).json({ message: 'Data added successfully' });
    } catch (err) {
        console.error('Error processing the uploaded file:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

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

router.post('/benefits', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[1];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let firstBenefit = data[0]?.__EMPTY_1
        for (const row of data) {
            console.log(row)
            const planName = row.__EMPTY;
            let benefitName = row.__EMPTY_1;            
            if (!benefitName || benefitName?.length < 1 || benefitName === '') {
                benefitName = firstBenefit
            } else {
                firstBenefit = benefitName
            }
            const benefitDetailDescription = row.__EMPTY_2;
            console.log("Adding benefits for: " + planName)
            try {
                let existingPlan = await Plan.findOne({ name: planName });
                if (!existingPlan) {
                    const newPlan = { name: planName, benefits: [], linePrices: [] };
                    const result = await Plan.insertMany([newPlan]);
                    existingPlan = result[0]
                }
                const benefitPromises = existingPlan.benefits.map(benefitId =>
                    Benefit.findById(benefitId).exec()
                );

                const existingBenefits = await Promise.all(benefitPromises);
                const benefit = existingBenefits.find(b => b.name === benefitName);
                if (benefit) {
                    await addBenefitDetail(benefit._id, benefitDetailDescription);
                } else {
                    let existingBenefit = null;
                    const newBenefit = { name: benefitName, benefitDetails: [] };
                    const result = await Benefit.insertMany([newBenefit]);
                    existingBenefit = result[0];
                    await addBenefitDetail(existingBenefit._id, benefitDetailDescription);
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

router.delete('/plans', async (req, res) => {
    try {
        await Plan.deleteMany({})
        await Benefit.deleteMany({})
        await BenefitDetail.deleteMany({})
        res.json({ message: "Plans deleted" });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err });
    }
});

module.exports = router;