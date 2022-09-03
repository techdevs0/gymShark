import mongoose from "mongoose";

const variationSchema = mongoose.Schema({
    code: String,
    color: String,
    in_stock: Boolean,
    description: String,
    featured_image: String,
    images: String,
    route: String,
    variation_values: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "variation_values"
    }],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
});

const Variation = mongoose.model('variation', variationSchema);

export default Variation;