import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: string
    },
    email: {
        type: String,
        unique: [true],
        //match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3}([.-]?\w+)*)+$/,
    },
    password: {
        type: String,
    },
})

const User = mongoose.model("users", userSchema)
export default User