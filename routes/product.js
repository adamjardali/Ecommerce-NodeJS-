const express = require('express');

const auth = require("../middlewares/auth");
const productRouter = express.Router();
const ProductController = require('../controllers/product');
const main_route = '/product/';

//get requests
productRouter.get('/product/',ProductController.home);
productRouter.get('/product/get-products/',ProductController.get_products);
productRouter.get('/product/get-product-name/:name',ProductController.get_product_by_name);
productRouter.get('/product/get-product-id/:product_id',ProductController.get_product_by_id);

//post requests
productRouter.post('/product/create-product/',ProductController.create_product);
productRouter.post('/product/rate-product/',ProductController.rate_product);


//update requests
productRouter.put("/product/update-product-id/:product_id/",ProductController.update_product_by_id);

// delete requests
productRouter.delete("/product/delete-product/:product_id/",ProductController.delete_product_by_id);
module.exports = productRouter;