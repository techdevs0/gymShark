import mongoose from "mongoose";
import VariationValue from "../models/VariationValue.js";

export const getVariationValues = async (req,res) =>{
    try {
        const variationvalues = await VariationValue.find();
        res.status(200).json(variationvalues);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createVariationValue = async (req,res) =>{
    const variationvalue = req.body;
    const newVariationValue = new VariationValue(variationvalue);
    try {
        await newVariationValue.save() 
        
        res.status(200).json(newVariationValue);
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updateVariationValue = async (req, res) => {
    const { id: _id } = req.params;
    const variationvalue = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateVariationValue = await VariationValue.findByIdAndUpdate(_id, variationvalue, { new : true})

    res.status(200).json(updateVariationValue)
}

export const findVariationValue = async (req,res) => {
    const { id: _id } = req.params;

    try {
        const variationvalue = await VariationValue.findOne({_id : _id });
    
        res.status(200).json(variationvalue);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteVariationValue = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await VariationValue.findByIdAndDelete(_id, function (err, variationvalue) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(variationvalue)
        }
    });
}