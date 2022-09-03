import mongoose from "mongoose";

const catgorySchema = mongoose.Schema({
    name: String,
    sub_title: String,
    description: String,
    featured_image: String,
    route: String,
    seo: Object
});

const Category = mongoose.model('Category', catgorySchema);

export default Category;