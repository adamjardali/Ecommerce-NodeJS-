const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,

	User:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	products:[
	{
		product:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
		quantity: {
			type:Number,
			default:1
		}
		
		
	},
	],

	total_price:{
		type: Number,
		required: true,
	},

	status:{
		type: String,
		default: "pending"
	},

	created_at: {
		type: Date,
		default: Date.now,
	},



});

module.exports = mongoose.model('Order',OrderSchema);