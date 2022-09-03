import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: String,
    route: String,
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const Tag = mongoose.model('tag', tagSchema);

export default Tag;