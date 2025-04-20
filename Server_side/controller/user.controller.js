const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require ("dotenv").config()

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    // res.send("ok")
    if (req.body.role) { 
        return res.status(401).json({ message: "You can't access the role field." });
    }
    try {
        const isexistingUser = await userModel.findOne({ email });
        // console.log(isexistingUser);
        
        if (isexistingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        bcrypt.hash(password, 5, async(err, hash)=> {
            if (err) {
                return res.status(400).json({ message:err.message });
            }
            
            if (hash) {
                const result = await userModel.create({name,email,password:hash})
                const {password,...rest} = result._doc
                res.status(201).json({ message: "User created successfully",user: rest});
            }
            
        });

    } catch (error) {
        res.status(400).json({message:error.message})
    }    
}

const signin = async (req,res) => {
    const {email,password}=req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    try {
        const isexistingUser = await userModel.findOne({ email });
        // console.log(isexistingUser);
        
        if (!isexistingUser) {
            return res.status(400).json({ message: "Please Create Account first." });
        }
        bcrypt.compare(password,isexistingUser.password , (err, result) => {
            if (err) {
                return res.status(400).json({ message:err.message });
            }
            if (!result) {
                return res.status(400).json({ message:"Invalid Password." });
            }

            const {password,...rest} = isexistingUser._doc
            jwt.sign({ user: rest },process.env.JWT_Private_key , (err, token) => {
                if (err) {
                    return res.status(401).json({ message:err.message });
                }
                if (!token) {
                    return res.status(400).json({ message:"Token is not created." });
                }
                console.log(token);
                res.cookie("Verificationtoken",token).status(200).json({ message:"User login successfully." , user:rest });
              });

        });

    } catch (error) {
        res.status(400).json({message:error?.message})
    }
}

module.exports = {signin , signup}