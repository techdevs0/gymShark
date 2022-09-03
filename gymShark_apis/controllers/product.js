import mongoose from "mongoose";
import Product from "../models/product.js";
import Variation from "../models/variation.js";

export const getProducts = async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createProduct = async (req,res) => {
    const session = await mongoose.startSession();
    // console.log(session,"session")
    // res.status(300).json({ message: session})
    const product = req.body;
    let variations = JSON.parse(JSON.stringify(product.variations))
    delete product.variations;
    try {
        session.startTransaction();

        let newProduct = await Product.create([product], { session });
        
        variations.forEach(variation => {
            variation.product = newProduct._id
        });
        
        await Variation.insertMany(variations,{ session });
        
        await session.commitTransaction();
        
        res.status(200).json(newProduct);
    } catch (error) {
        await session.abortTransaction();
        res.status(409).json({ message: error.message})
    }
    session.endSession();
}

export const updateProduct = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    const updateProduct = await Product.findByIdAndUpdate(_id, product, { new : true})

    res.status(200).json(updateProduct)
}

export const findProduct = async (req,res) => {
    const { id: _id } = req.params;

    try {
        const product = await Product.findOne({_id : _id });
    
        res.status(200).json(product);
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no data found");

    await Product.findByIdAndDelete(_id, function (err, product) {
        if (err){
            res.send(err)
        }
        else{
            res.status(200).json(product)
        }
    });
}