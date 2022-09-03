import mongoose from "mongoose";
import Tag from "../models/Tag.js"

export const getTags = async (req,res) =>{
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createTag = async (req,res) =>{
    const post = req.body;
    const newTag = new Tag(post);
    try {
        await newTag.save() 
        
        res.status(200).json(newTag);
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updateTag = async (req, res) => {
    const { id: _id } = req.params;
    const category = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateTag = await Tag.findByIdAndUpdate(_id, category, { new : true})

    res.status(200).json(updateTag)
}

export const findTag = async (req,res) => {
    const { id: _id } = req.params;

    try {
        const tag = await Tag.findOne({_id : _id });
    
        res.status(200).json(tag);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteTag = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await Tag.findByIdAndDelete(_id, function (err, tag) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(tag)
        }
    });
}