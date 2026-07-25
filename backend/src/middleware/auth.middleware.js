import jwt from "jsonwebtoken"; //to validate token
import User from "../models/user.model.js"; //to validate user

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //bcoz token named as "jwt"
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); //exluding password
    // User is the mongoose model

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in ProtectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
