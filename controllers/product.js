const mongoose = require("mongoose");

const {Product} = require("../models/product");
const Order = require("../models/order");
const admin = require("../middlewares/admin");

const ProductController = {}


/**
 * @desc    Products Home
 * @param   { String } productId - Product ID
 * @param   { Object } images - Product images
 * @returns { Object<type|message|statusCode|product> }
 */ProductController.home = async (req,res)=>{
	return res.status(200).json({"Home":"Page"});

};


//Get All products
ProductController.get_products = async (req,res)=>{
	try{
		const products = await Product.find({});
		res.json(products);
	}
	catch(e){
		res.status(500).json({error:e.message});
	}
};

//Create New Product
ProductController.create_product = async (req,res)=>{
	try{
		const{name,description,images,quantity,price,category} = req.body;
		let product = new Product({
			_id: new mongoose.Types.ObjectId(),
			name,
			description,
			images,
			quantity,
			price,
			category,
		});

		product = await product.save();
		res.status(201).json({"Product":"Create!"});
	}
	catch(e){
		res.status(500).json({error:e.message});
	}
};

//get product by name
ProductController.get_product_by_name = async (req,res) =>{
	try{
		const products = await Product.find({
			name: {$regex: req.params.name,$options:"i"},
		});
		res.json(products);
	}
	catch(e){
		res.status(500).json({error:e.message});
	}	
};

//rate a product
ProductController.rate_product = async (req, res) => {
  try {
    const {product_id, user_id,rating } = req.body;
    let product = await Product.findById(product_id);
    const ratingSchema = {
	  user_id: user_id,
      rating:rating,
    };
    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].user_id == user_id) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


//get product by id
ProductController.get_product_by_id = async(req,res)=>{
	try{
		const {product_id} = req.body;
		let product = await Product.findById(req.params.product_id);
		res.json(product);
	}
	catch(e){
		res.status(404).json({error:e.message});
	}
}

//update product
ProductController.update_product_by_id = async(req,res)=>{
	try{
		const{product_id} = req.params;
		let product = await Product.findByIdAndUpdate(product_id,req.body,{new:true});
		res.status(201).json({
			ok:true,
			product,
		});
	}
	catch(e){
		res.status(500).json({error:e.message});
	}
}

// delete product
ProductController.delete_product_by_id = async(req,res)=>{
	try{
		const{product_id} = req.params;
		const product = await Product.findById(product_id);
		await Product.findByIdAndRemove(product_id);
		res.status(200).json({
			product:product,
		});
	}
	catch(e){
		res.status(500).json({error:e.message});
	}
}



module.exports = ProductController;