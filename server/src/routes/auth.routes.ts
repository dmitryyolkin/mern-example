import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import { User } from "../models/User";

const router = Router();

// /api/auth/register
router.post(
  "/register",
  // middleware to validate user data
  [
    check("email", "Email is not correct").isEmail(),
    check("password", "Min password length is 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Email or password are incorrect",
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({
        message: "User was created",
      });
    } catch (e) {
      res.status(500).json({
        message: "Something was wrong: " + e.message,
      });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  // middleware to validate user data
  [
    check("email", "Please input correct email").normalizeEmail().isEmail(),
    check("password", "Please input password").exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Email or password are incorrect in login",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User is not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Password is not correct",
        });
      }

      // create jwt token
      // https://www.npmjs.com/package/jsonwebtoken
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.status(200).json({
        token,
        userId: user.id,
      });
    } catch (e) {
      res.status(500).json({
        message: "Something was wrong: " + e.message,
      });
    }
  }
);

module.exports = router;
