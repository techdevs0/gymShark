import mongoose from "mongoose";

const subCatgorySchema = mongoose.Schema({
    name: String,
    sub_title: String,
    description: String,
    featured_image: String,
    route: String,
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    seo: Object
});

const SubCategory = mongoose.model('SubCategory', subCatgorySchema);

export default SubCategory;