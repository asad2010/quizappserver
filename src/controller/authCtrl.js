const bcrypt = require("bcrypt"); ///
const JWT = require("jsonwebtoken");
const Users = require("../model/userModel");

require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authCtrl = {
  signup: async (req, res) => {
    const {email} = req.body;
    try {
      const existingUser = await Users.findOne({email});
      if(existingUser) {
        return res.status(404).json({message: "User already exist"})
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPassword
      if(req.body.role) {
        req.body.role = Number(req.body.role);
      }
      const user = await Users.create(req.body)
      const token = JWT.sign({email: user.email, id: user._id, role: user.role}, JWT_SECRET_KEY, {expiresIn: "50h"});

      const {password, ...otherDetails} = user._doc;
      res.status(201).json({message: "Signup successfully", user: otherDetails, token})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  login: async (req, res) => {
    const {email} = req.body;
    try {
      const existingUser = await Users.findOne({email});
      if(!existingUser) {
        return res.status(404).json({message: "User not found"})
      }

      const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
      if(!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid credintials!"})
      }

      const token = JWT.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, JWT_SECRET_KEY, {expiresIn: "50h"});

      const {password, ...otherDetails} = existingUser._doc;
      res.status(200).json({message: "login successfully!", user: otherDetails, token})
      
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
}

module.exports = authCtrl
