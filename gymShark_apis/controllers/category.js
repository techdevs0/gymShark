import mongoose from "mongoose";
import Category from "../models/category.js"

export const getCategories = async (req,res) =>{
    try {
        const categories = await Category.find().select('-v');
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}
export const createCategory = async (req,res) =>{
    const post = req.body;
    const newCategory = new Category(post);
    try {
        await newCategory.save() 
        
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updateCategory = async (req, res) => {
    const { id: _id } = req.params;
    const category = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateCategory = await Category.findByIdAndUpdate(_id, category, { new : true})

    res.json(updateCategory)
}

export const findCategory = async (req,res) =>{
    const { id: _id } = req.params;

    try {
        const category = await Category.findOne({_id : _id });
    
        res.status(200).json(category);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteCategory = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await Category.findByIdAndDelete(_id, function (err, category) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(category)
        }
    });
}