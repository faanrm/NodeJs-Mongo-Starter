import express from "express"
import { createUser, deletUser, getUser, updateUser } from "../controllers/UserController.js"
const router = express.Router()

router.post('/create-user',createUser)
router.get('/get-user',getUser)
router.put('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deletUser)

export default router