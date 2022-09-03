import mongoose from "mongoose";
import Variation from "../models/Variation.js"

export const getVariations = async (req,res) =>{
    try {
        const variations = await Variation.find();
        res.status(200).json(variations);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createVariation = async (req,res) =>{
    const variation = req.body;
    const newVariation = new Variation(variation);
    try {
        await newVariation.save() 
        
        res.status(200).json(newVariation);
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updateVariation = async (req, res) => {
    const { id: _id } = req.params;
    const variation = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateVariation = await Variation.findByIdAndUpdate(_id, variation, { new : true})

    res.status(200).json(updateVariation)
}

export const findVariation = async (req,res) => {
    const { id: _id } = req.params;

    try {
        const variation = await Variation.findOne({_id : _id });
    
        res.status(200).json(variation);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteVariation = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await Variation.findByIdAndDelete(_id, function (err, variation) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(variation)
        }
    });
}