import { comparPass, hashPassword } from "../helpers/authHelper.js";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ messege: "Name is Required" });
    }
    if (!email) {
      return res.send({ messege: "Email is Required" });
    }
    if (!password) {
      return res.send({ messege: "Password is Required" });
    }
    if (!phone) {
      return res.send({ messege: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ messege: "Address is Required" });
    }

    //check user
    const existingUser = await userModal.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        messege: "Already Register please login.",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModal({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      messege: "User Register Successfully....",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succsess: false,
      messege: "Error in Registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        messege: "Invalid email or password",
      });
    }
    //check user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: true,
        messege: "Email is not register",
      });
    }

    const match = await comparPass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        messege: "Invalid Password",
      });
    }

    //token
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).send({
      success: true,
      messege: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error in login",
      error,
    });
  }
};

//test controller

export const testController = (req, res) => {
  console.log("Protected route");
  res.send({
    messege: "protected routes",
  });
};
