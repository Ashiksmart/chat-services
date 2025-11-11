import { getAllUsers, updateBlock, updateRole } from "../controllers/user.js"
import express from 'express'
import authenticate from "../middleware/auth.js"
import authorizeRole from "../middleware/role.js"

const router = express.Router()

router.get('/all', authenticate, authorizeRole("admin", "manager"), getAllUsers)
router.put('/:id/role', authenticate,  authorizeRole("admin"), updateRole)
router.put('/:id/block', authenticate,  authorizeRole("admin"), updateBlock)

export default router;