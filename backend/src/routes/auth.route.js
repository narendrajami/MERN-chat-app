import express from "express";

import {
  checkAuth,
  cloudinaryTest,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
//protectRoute to check if users are authenticated(made in middleware NOT routes)

router.get("/check", protectRoute, checkAuth);

router.get("/c-test", cloudinaryTest);
export default router;
