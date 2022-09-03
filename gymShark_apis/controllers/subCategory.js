import mongoose from "mongoose";
import SubCategory from "../models/subCategory.js"

export const getSubCategories = async (req,res) =>{
    try {
        const subcategories = await SubCategory.find().populate("parent_id", "-_id -__v -sub_title -description -featured_image -route -seo").select("-__v");
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createSubCategory = async (req,res) =>{
    const post = req.body;
    const newSubCategory = new SubCategory(post);
    try {
        await newSubCategory.save() 
        
        res.status(200).json(newSubCategory);
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updateSubCategory = async (req, res) => {
    const { id: _id } = req.params;
    const category = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateSubCategory = await SubCategory.findByIdAndUpdate(_id, category, { new : true})

    res.status(200).json(updateSubCategory)
}

export const findSubCategory = async (req,res) => {
    const { id: _id } = req.params;

    try {
        const subCategory = await SubCategory.findOne({_id : _id });
    
        res.status(200).json(subCategory);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteSubCategory = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await SubCategory.findByIdAndDelete(_id, function (err, subCategory) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(subCategory)
        }
    });
}