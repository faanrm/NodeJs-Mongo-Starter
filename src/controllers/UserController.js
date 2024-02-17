import generateToken from "../helpers/generateToken";
import User from "../models/UserModels";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = generateToken(newUser);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};


export const getUser = async (req, res) => {
    try {
        const User = User.findAll()
            .then((userData) => {
                res.status(200).json(userData)
            })
    } catch (error) {
        res.status(error.status).json({ message: error.message })
    }
}

export const deletUser = async (req, res) => {
    const { id } = req.params
    try {


    } catch (error) {

    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields if provided
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
