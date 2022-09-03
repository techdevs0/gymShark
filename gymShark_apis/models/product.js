import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    route: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    related_categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag"
    }],
    brand: String,
    price: Number,
    discount: Number,
    download: String
});

const Product = mongoose.model('product', productSchema);

export default Product;