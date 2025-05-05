const mongoose = require('mongoose');

const varietySchema = new mongoose.Schema({
    name: { type: String, required: true },                // e.g., IR64
    code: { type: String, required: true },                // e.g., RICE123
    type: { type: String },                                // e.g., indica, japonica
    maturity_days: { type: Number },                       // e.g., 110
    grain_length: { type: String },                        // e.g., long, medium, short
    grain_shape: { type: String },                         // e.g., slender, bold
    amylose_content: { type: String },                     // e.g., high, medium, low
    yield_per_hectare: { type: Number },                   // e.g., 6000 (kg/ha)
    resistance: [{ type: String }],                        // e.g., ['blast', 'bacterial blight']
    recommended_area: { type: String },                    // e.g., lowland, upland, flood-prone
    released_year: { type: Number },                       // e.g., 2010
    description: { type: String },                         // e.g., Brief summary of characteristics
}, {
    timestamps: true                                       // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Variety', varietySchema);
