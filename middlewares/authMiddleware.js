import jwt from "jsonwebtoken";
import userModal from "../models/userModal.js";

//protected routr || token based

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        messege: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      messege: "Error in admin middleware",
      error,
    });
  }
};
