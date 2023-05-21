const express = require('express');
const categoryRouter = express.Router();
const CategoryController = require("../controllers/category");

// const { isAuth } = require("../middlewares/authentication");

categoryRouter.get("/category/", CategoryController.getCategories);
categoryRouter.get("/category/:categoryId/", CategoryController.getCategory);
// categoryRouter.post("/", isAuth, categoryCTRL.createCategory);
// categoryRouter.put("/:categoryId", isAuth, categoryCTRL.updateCategory);
// categoryRouter.delete("/:categoryId", isAuth, categoryCTRL.deleteCategory);

module.exports = categoryRouter;  