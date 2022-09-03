import express from "express";
import { getTags, createTag, findTag, updateTag, deleteTag } from "../controllers/tag.js";
const subCategoryRouter = express.Router();

subCategoryRouter.get('/', getTags)
subCategoryRouter.get('/:id', findTag)
subCategoryRouter.post('/', createTag)
subCategoryRouter.put('/:id', updateTag)
subCategoryRouter.delete('/:id', deleteTag)

export default subCategoryRouter;