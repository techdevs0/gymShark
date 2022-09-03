import express from "express";
import { getVariationValues, createVariationValue, findVariationValue, updateVariationValue, deleteVariationValue } from "../controllers/variationValue.js";
const subCategoryRouter = express.Router();

subCategoryRouter.get('/', getVariationValues)
subCategoryRouter.get('/:id', findVariationValue)
subCategoryRouter.post('/', createVariationValue)
subCategoryRouter.put('/:id', updateVariationValue)
subCategoryRouter.delete('/:id', deleteVariationValue)

export default subCategoryRouter;