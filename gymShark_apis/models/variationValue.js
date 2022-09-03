import mongoose from "mongoose";

const variationValueSchema = mongoose.Schema({
    name: String,
    route: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const variationValue = mongoose.model('variation_values', variationValueSchema);

export default variationValue;