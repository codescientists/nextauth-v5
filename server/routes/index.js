import express from "express";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/auth", authRouter);
// router.use("/users",requireSignIn, userRouter);
// router.use("/admin",requireSignIn, isAdmin, adminRouter);

router.use(express.json())


export default router;