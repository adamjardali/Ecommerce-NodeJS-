const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const auth = require("../middlewares/auth");


const AuthController = {}


//home
AuthController.home = (req,res)=>{
		return res.status(200).json({'Hello':'World!'});
	};


//signup
AuthController.signup= async (req,res,next)=>{
		try{

			const {email,password,user_name} = req.body;
			const existing_user = await User.findOne({email});
			if(existing_user){
				return res.status(400).json({msg:"This email is already used by another user!"});
			};

			const hashed_password = await bcryptjs.hash(password,8);
			let user = new User({
              	_id: new mongoose.Types.ObjectId(),
				email,
				password: hashed_password,
				user_name,
			});
			user = await user.save();
			res.json(user);

		}
		catch(e){
			res.status(500).json({error: e.message});
		}	
	};

//login
AuthController.login=async (req,res)=>{
	try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



//validate token

AuthController.validate_token=async (req,res)=>{
		 try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



module.exports = AuthController;