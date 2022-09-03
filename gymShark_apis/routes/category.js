import express from "express";
import { getCategories, createCategory, findCategory, updateCategory, deleteCategory } from "../controllers/category.js";
const categoryRouter = express.Router();

categoryRouter.get('/', getCategories)
categoryRouter.get('/:id', findCategory)
categoryRouter.post('/', createCategory)
categoryRouter.put('/:id', updateCategory)
categoryRouter.delete('/:id', deleteCategory)

export default categoryRouter;