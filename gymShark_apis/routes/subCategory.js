import express from "express";
import { getSubCategories, createSubCategory, findSubCategory, updateSubCategory, deleteSubCategory } from "../controllers/subCategory.js";
const subCategoryRouter = express.Router();

subCategoryRouter.get('/', getSubCategories)
subCategoryRouter.get('/:id', findSubCategory)
subCategoryRouter.post('/', createSubCategory)
subCategoryRouter.put('/:id', updateSubCategory)
subCategoryRouter.delete('/:id', deleteSubCategory)

export default subCategoryRouter;