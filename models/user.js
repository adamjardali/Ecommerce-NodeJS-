const mongoose = require("mongoose");
const {productSchema} = require("./product");

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	
	email :{
		required:true,
		type:String,
		unique:true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

	},
	user_name:{
		required: true,
		type:String,
		unique: true,
	},

	password:{
		required: true,
		type: String,
	},
	first_name:{
		required: true,
		type: String,
		trim: true,
		default:"New User",

	},
	last_name:{
		required: true,
		type: String,
		trim: true,
		default:"New User",
	},
	avatar:{
		type: String,
		maxlength: 512,
	},
	email_verified:{
		type: Boolean,
		default: false
	},
	is_admin:{
		type:Boolean,
		default: false,
	},
	cart: [
    {
      product: productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

	created_at:{
		type: Date,
		default: Date.now,
	},

});

module.exports = mongoose.model('User',UserSchema);