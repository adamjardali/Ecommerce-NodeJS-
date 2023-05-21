const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/user');

//post requests
userRouter.post("/user/add-to-cart/",UserController.add_to_cart);
userRouter.post("/user/add-to-cart/",UserController.remove_from_cart);
userRouter.post("/user/add-to-cart/",UserController.order_product);

//get requests
userRouter.post("/user/",UserController.get_my_orders);





module.exports = userRouter;