import bcrypt from "bcrypt";

const saltRounds = 12;

const passwordPlaintext = "hunter42";
const passwordPlaintext2 = "notHunter";
const hashedPassword = "$2b$12$wjS6tcjhhvFLG9jVwo9pUO1NfUA3tCUAG4c4.881BBBFSQbNqfT/m";

const encryptedPassword = await bcrypt.hash(passwordPlaintext, saltRounds);
console.log("PasswordPlaintext: ", encryptedPassword);
//const encryptedPassword2 = await bcrypt.hash(passwordPlaintext2, saltRounds);
//console.log("PasswordPlaintext2: ", encryptedPassword2);

const isSame = await bcrypt.compare(
    passwordPlaintext,
    encryptedPassword
);

console.log(isSame);