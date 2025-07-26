const router = require ("express").Router();
const { findOne } = require("../models/list");
const User = require("../models/user");
const bcrypt = require("bcryptjs")
//SIGN UP
router.post("/register", async(req,res) =>{
    try {
        const {email,username,password} = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: "Email already exists" });
        }
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        await user.save();

        res.status(201).json({ message:" Sign Up Successfull" });
    } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
    };
});
//SIGN IN 
router.post("/signin", async(req,res) =>{
    try {
        const user =  await User.findOne ({email: req.body.email});
        if (!user){
            return res.status(200).json({message:"this email dosen't exist, please sign up first"});
        }
        const isPasswordcorrect = bcrypt.compareSync(
            req.body.password, 
            user.password
        );
        if (!isPasswordcorrect){
            return res.status(200).json({message:"password is not correct"})
        }
        const {password, ...others} = user._doc;
        res.status(200).json({ others })
    } catch (error) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
    };
});
module.exports = router;