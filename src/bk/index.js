import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express();
app.use(express.json());
const router = express.Router()
const PORT = 8000;

import auth from "./jwt/auth";

const max = 10;
let ips = {}
router.get("/message", auth, async(req, res, next) =>{
    let now = new Date();
    let user = ips[req.ip]
    if (user){
        if (user.start_time && now -user.start_time > (60 * 60 * 1000)) {
            user.start_time = now
            user.count = 0
        } else if (user.count === max) {
            return res.status(429)
        }
        user.count++
        ips[req.ip] = user
        return next()
    }
    ips[req.ip] = {
        count: 1,
        start_time: now
    }
    return next()
});

app.use("/api", router);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// router.use(fileUpload());

// router.post("/upload", auth, async (req, res) => {
//     if (!req.files || !req.files.file) {
//         return res.status(422).json({ message: "File not uploaded or empty" });
//     }

//     try {
//         const uploadedFile = req.files.file; 
//         const uploadPath = path.join(uploadDir, uploadedFile.name); 

//         await uploadedFile.mv(uploadPath);

//         res.status(201).json({ message: `File uploaded successfully`, filePath: uploadPath });

//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// });
// app.use("/api", router);
// router.post("/register", async (req, res)=>{
//     const {username, email, password} = req.body;

//     if(!username || !email || !password){
//         return res.status(400).json({message: "Please check values username, email, password"});
//     }
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ message: "Invalid email format." });
//     }
//     try{
//         const salt = await bcrypt.genSalt();
//         const hashPassword = await bcrypt.hash(password, salt);
//         const newUser = "INSERT INTO User (username, email, password) VALUES (?, ?, ?)";
//         db.query(newUser, [username, email, hashPassword], (err, result) =>{
//             if(err){
//                 return err;
//             }
//             return res.status(201).json({message: "User registered success"});
//         });
//     }catch(err){
//         return res.status(500).json({error: err});
//     }
// });

// router.post("/login", (req, res)=>{
//     const {email, password} = req.body;

//     if(!email || !password){
//         return res.status(400).json({message: "Please check your email and password"});
//     }

//     try{
//         const checkEmailPassword = "SELECT * FROM User WHERE email = ?";
//         db.query(checkEmailPassword, [email, password], async (err, result)=>{
//             if(err){
//                 return res.status(500).json({error: err});
//             }
//             if(!result.length){
//                 res.status(404).json({message: "User not found"});
//             }
//             const user = result[0];
//             try{
//                 await bcrypt.compare(password, user.password)
//                 const token = jwt.sign({userID: user.user_id}, "secret", {expiresIn: "1h"});
//                 return res.status(200).json({token: token});;
//             }catch(err){
//                 return res.status(500).json({error: err.message});
//             }
//         });
//     }catch(err){
//         return res.status(500).json({error: err});
//     }
// });

// router.get("/users", auth, async (req, res) =>{
//     try{
//         const getAllUser = "SELECT * FROM User";
//         await db.query(getAllUser, (err, result)=>{
//             if(err){
//                 return res.status(500).json({error: err.message});
//             }
//             if(!result){
//                 return res.status(404).json({message: "Users is not found"});
//             }
//             return res.status(200).json({data: result});
//         });
//     }catch(err){
//         if(err){
//             return res.status(500).json({error: err.message});
//         }
//     }
// });

// router.post("/checkToken", auth, (req, res)=>{
//     return res.status(200).json({userID: user_id, username: username, lastname: lastname, });
// });
// router.get("/status", (req, res)=>{
//     res.status(200).json({message: "Server is running"});
// });

// router.post("/users", async (req, res) => {
//     const { name, email, password } = req.body;
//     const query = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "Enter all values" });
//     }
    
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ message: "Invalid email format." });
//     }
    
//     try {
//         const [existingUsers] = await db.promise().query("SELECT * FROM User WHERE email = ?", [email]);
//         if (existingUsers.length > 0) {
//             return res.status(409).json({ message: "Email already exists." });
//         }

//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const [result] = await db.promise().query(query, [name, email, hashedPassword]);
//         return res.status(201).json({ message: "User added successfully", user_id: result.insertId });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// });

// app.get("/users", (req, res) => {
//     const query = "SELECT * FROM User";
//     try {
//         db.query(query, (err, data) =>{
//             if(err){
//                 res.status(500).json({error: err});
//             }
//             res.status(200).json({message: data});
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.get("/users/:user_id", (req, res) => {
//     const { user_id } = req.params;
//     const  queryUserID = "SELECT * FROM User WHERE user_id = ?";
//     if(!user_id){
//         res.status(400).json({message: "Empty value id"});
//     }
//     try{
//         db.query(queryUserID, [user_id], (err, data)=>{
//             if(err){
//                 res.status(500).json({error: err});   
//             }
//             if(!data.length){
//                 res.status(404).json({message: "User not found"});
//             }
//             res.status(200).json({result: data});
//         });
//     }catch(err){
//         res.status(500).json({error: err});
//     }
// });

// app.put("/users/:user_id", (req, res) => {
//     const { user_id } = req.params;
//     const { name } = req.body;
    
//     const queryUserID = "UPDATE User SET name = ? WHERE user_id = ?";
//     if(!user_id || !name){
//         res.status(400).json({message: "Empty value id or name"});
//     }
//     try{
//         db.query(queryUserID, [name, user_id], (err, result) =>{
//             if(err){
//                 return res.status(500).json({error: err});
//             }
//             if(result.affectedRows === 0){
//                 res.status(404).json({message: "Users is not found"});
//             }
//             return res.status(201).json({message: "User is updated", data: result});
//         });
//     }catch(err){
//         req.status(500).json({error: err});
//     }
// });

// app.delete("/users/:user_id", (req, res) => {
//     const { user_id } = req.params;
//     const userID = parseInt(user_id);

//     if(!user_id){
//         return res.status(400).json({message: "User id is empty"});
//     }

//     const deleteUserID = "DELETE FROM User WHERE user_id = ?";
//     try{
//         db.query(deleteUserID, [userID], (err, result) =>{
//             if(err){
//                 return res.status(500).json({error: err});
//             }
//             if(result.affectedRows === 0){
//                 return res.status(404).json({message: "User not found"});
//             }
//             return res.status(200).json({message: "User is deleted"});
//         });
//     }catch(err){
//         return res.status(500).json({error: err});
//     }
// });

