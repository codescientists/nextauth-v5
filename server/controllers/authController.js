import User from "../models/User.js"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      mobile_number
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { 
        id: savedUser._id, 
        email: savedUser.email, 
        isBoarded: savedUser.isBoarded 
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET, // Set JWT_SECRET in your environment variables
        { expiresIn: "1h" } // Token expiration time
      );
  
      // Send response with token
      res.status(200).json({
        message: "Login successful",
        user: { id: user._id, email: user.email, isBoarded: user.isBoarded },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  