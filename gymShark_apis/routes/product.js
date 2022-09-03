import express from "express";
import { getProducts, createProduct, findProduct, updateProduct, deleteProduct } from "../controllers/product.js";
const subCategoryRouter = express.Router();

subCategoryRouter.get('/', getProducts)
subCategoryRouter.get('/:id', findProduct)
subCategoryRouter.post('/', createProduct)
subCategoryRouter.put('/:id', updateProduct)
subCategoryRouter.delete('/:id', deleteProduct)

export default subCategoryRouter;