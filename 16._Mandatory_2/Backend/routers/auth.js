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

// TODO Make login
router.post("/login", async (req, res) => {
    const user = req.body;
    console.log(user);

    //req.session.user = userToSend;
    //req.session.userId = uuidv4();
    res.send({ message: "login" });
});

router.post("/signup", async (req, res) => {
    const user = req.body;

    // Check if a user with the given username or email exists
    const userExist = await checkIfUserExist(user.email, user.username);
    if (userExist) {
        return res.status(409).json({ message: "User with this username or e-mail already exists", errorStatus: "400" });
    }

    // Validate user input
    if (!user.fullname || !user.email ||
        !user.username || !user.password ||
        user.password !== user.confirmPassword) {
        return res.status(400).send({ message: 'Invalid input', errorStatus: "400" });
    }

    // Hash the user's password
    user.hashedPassword = await bcrypt.hash(user.password, saltRounds);

    create(user);

    res.status(201).send({ message: 'User successfully created, you may now login' });
});

router.put("/reset-password", async (req, res) => {
    const { newPassword, confirmPassword, token } = req.body;

    // Validate the new password
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.', errorStatus: "400" });
    }

    // Check if token is valid
    const { email } = await getEmailByPasswordResetToken(token);
    if (!email) {
        return res.status(400).json({ message: 'Invalid token.', errorStatus: "400" });
    }
    
    const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password in the database
    await updateUserPassword(encryptedPassword, email);
    await deletePasswordResetToken(token);

    res.json({ message: 'Password reset.' });
});

// TODO Make Update account
router.patch("/update-account", async (req, res) => {
    // getUserByUsername(username);
    // update(updatedUser);

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