import { hashPassword } from "../helpers/authHelper.js";
import userModal from "../models/userModal.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    //check user
    const existingUser = await userModal.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
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
