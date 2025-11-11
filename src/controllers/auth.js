import User from "../models/user.js"
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js'

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ name, email, password: hashedPassword })
        res.json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name })
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isBlocked) return res.status(403).json({ message: "User is blocked" })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: "Invalid password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        const { _id, email, role, isBlocked } = user
        res.json({ accessToken, user: { _id, name: user.name, email, role, isBlocked } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { register, login }