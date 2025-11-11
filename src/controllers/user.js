import User from "../models/user.js"


const getAllUsers = async (req, res) => {
    const users = await User.find({}).select("-password")
    res.json(users)
}

const updateRole = async (req, res) => {
    await User.findByIdAndUpdate( req.params.id, { role: req.body.role })
    res.json({ message: "Role updated" })
}

const updateBlock = async (req, res) => {
    await User.findByIdAndUpdate( req.params.id, { isBlocked: req.body.block })
    res.json({ message: "User status updated" })
}

export {
    getAllUsers,
    updateRole,
    updateBlock
}