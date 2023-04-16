import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { getUserByEmail, getUserByUsername, checkIfUserExist, create, update, updateUserPassword, getEmailByPasswordResetToken, deletePasswordResetToken } from "../database/userQueries.js";
import { Router } from "express";

/**
 * const router = Router()
 * 
 * The const router = Router() creates a new instance of a router object, which is an object
 * in the Express.js framework that allows you to define routes for your application. You can us
 * the router object to define various HTTP methods like "GET", "POST", "PUT", "DELETE", etc., 
 * and their corresponding URL patterns, and then attach middleware functions to these routes 
 * to handle requests and send responses. Once you have defined your routes and middleware 
 * functions on the router object, you can attach it to your Express application using 
 * "app.use(router)", where app is your Express application instance
 */
const router = Router();

/**
 * is used to define the number of salt rounds used by the bcrypt library. 
 * A "salt" is a randomly generated string that is added to the password before it is hashed. 
 * This helps to make the hash more secure, because even if two users have the same password, 
 * their hashed passwords will look completely different due to the different salts used.
 * 
 * The number of salt rounds determines the computational cost of generating the hash, 
 * which affects the time it takes to brute-force attack the hash. A higher number of 
 * salt rounds increases the computational cost and makes it more difficult 
 * and time-consuming to crack the hash. However, a higher number of salt rounds also 
 * increases the time it takes to generate the hash, so there is a trade-off to consider.
 */
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 12;

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({});
    })
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(404).send({ message: "E-mail or password is incorrect." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).send({ message: "E-mail or password is incorrect." });
    }

    req.session.userId = uuidv4();
    req.session.user = {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
    };

    res.send({ message: "Login successfully", session: req.session });
});

router.post("/signup", async (req, res) => {
    const user = req.body;

    // Check if a user with the given username or email exists
    const userExist = await checkIfUserExist(user.email, user.username);
    if (userExist) {
        return res.status(409).json({ message: "User with this username or e-mail already exists" });
    }

    // Validate user input
    if (!user.fullname || !user.email ||
        !user.username || !user.password ||
        user.password !== user.confirmPassword) {
        return res.status(400).send({ message: 'Invalid input' });
    }

    // Hash the user's password
    user.hashedPassword = await bcrypt.hash(user.password, saltRounds);

    create(user);

    res.status(201).send({ message: 'User successfully created, you may now login' });
});

router.post("/validatepassword", async (req, res) => {
    const { user, password } = req.body;

    if (!user.username || !password) {
        return res.status(400).json({ message: "Email/Username or password is missing." });
    }

    const data = await getUserByUsername(user.username);
    if (!data) {
        return res.status(401).send({ message: "Email/Username or password is incorrect." });
    }

    // check if the entered password matches the user's password
    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (isPasswordMatch) {
        res.status(200).send({ message: 'Password was correct.' });
    } else {
        res.status(401).send({ message: "Email/Username or password is not correct." });
    }
});

router.put("/reset-password", async (req, res) => {
    const { newPassword, confirmPassword, token } = req.body;

    // Validate the new password
    if (newPassword !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords do not match.' });
    }

    // Check if token is valid
    const data = await getEmailByPasswordResetToken(token);
    if (!data) {
        return res.status(401).send({ message: 'Invalid token.' });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password in the database
    await updateUserPassword(encryptedPassword, data.email);
    await deletePasswordResetToken(token);

    res.send({ message: 'Password reset successful.' });
});

// TODO Make Update account
router.patch("/update-account", async (req, res) => {
    const user = req.body;

    // Validate the request body
    if (!user.username || !user.email) {
        return res.status(400).json({ message: "Username and email are required." });
    }

    const data = await getUserByUsername(user.username);
    if (!data) {
        return res.status(401).send({ message: "User not found." });
    }

    const updatedUser = {
        id: data.id,
        fullname: user.fullname || data.foundUser,
        email: user.email || data.email,
        password: user.password ? await bcrypt.hash(user.password, saltRounds) : data.password
    };
    await update(updatedUser);

    req.session.regenerate((error) => {
        if (error) {
            return res.status(500).send({ message: "Failed to regenerate session." });
        }

        req.session.user = {
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            username: data.username,
        };
        res.status(200).send({ message: "Profile updated successfully.", session: req.session });
    });
});


// TODO Make Delete account
router.delete("/delete-account", async (req, res) => {

});

/* router.post("/login", async (req, res, next) => {
    const user = req.body;

    // user password in plaintext is "hunter42"
    const hashedPassword = "$2b$12$wjS6tcjhhvFLG9jVwo9pUO1NfUA3tCUAG4c4.881BBBFSQbNqfT/m";

    const isSame = await bcrypt.compare(
        user.password,
        hashedPassword
    );

    if (isSame) {
        req.session.user = user.email;
        res.status(200).send({ messsage: "User found!", session: req.session });
    } else {
        res.status(404).send({ messsage: "User not found!" });
    }
}); */

export default router;