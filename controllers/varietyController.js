const Variety = require('../models/Variety');

exports.getAllVarieties = async (req, res) => {
    try {
        const varieties = await Variety.find();
        res.status(200).json(varieties);
    } catch (error) {
        console.error('Error fetching varieties:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createVariety = async (req, res) => {
    const errors = validateVarietyInput(req.body);
    if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

    try {
        const newVariety = new Variety(req.body);
        const saved = await newVariety.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

exports.getVarietyById = async (req, res) => {
    try {
        const variety = await Variety.findById(req.params.id);
        if (!variety) return res.status(404).json({ message: 'Variety not found' });
        res.status(200).json(variety);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateVarietyById = async (req, res) => {
    const errors = validateVarietyInput(req.body);
    if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

    try {
        const updated = await Variety.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: 'Variety not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
};

exports.deleteVarietyById = async (req, res) => {
    try {
        const deleted = await Variety.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Variety not found' });
        res.status(200).json({ message: 'Variety deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Utility: validate req.body
function validateVarietyInput(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string') {
        errors.push('Name is required and must be a string.');
    }

    if (!data.code || typeof data.code !== 'string') {
        errors.push('Code is required and must be a string.');
    }

    if (data.maturity_days && typeof data.maturity_days !== 'number') {
        errors.push('maturity_days must be a number.');
    }

    if (data.yield_per_hectare && typeof data.yield_per_hectare !== 'number') {
        errors.push('yield_per_hectare must be a number.');
    }

    if (data.released_year && typeof data.released_year !== 'number') {
        errors.push('released_year must be a number.');
    }

    if (data.resistance && !Array.isArray(data.resistance)) {
        errors.push('resistance must be an array of strings.');
    }

    return errors;
}