import express from "express";

const app = express();
app.use(express.json());
const router = express.Router()
const PORT = 8000;

const arr = [];

router.get("/status", (req, res)=>{
    res.status(200).json({message: "Server is running"});
});

router.post("/users", (req, res) => {
    const { name, email, password } = req.body;
    if( !name || !email || !password ){
        return res.status(400).json({message: "Enter values"});
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }
    const userExists = arr.some(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: "Email already exists." });
    }   
    try {
        const newUser = {name, email, password}
        arr.push(newUser);
        res.status(201).json({ message: "User added", users: arr });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

// app.get("/users", (req, res) => {
//     try {
//         res.status(200).json(arr);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.get("/users/:id", (req, res) => {
//     const { id } = req.params;
//     const user = arr[id];
    
//     if (user !== undefined) {
//         return res.status(200).json(user);
//     } else {
//         return res.status(404).json({ message: "User not found" });
//     }
// });

// app.put("/users/:id", (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
    
//     const userIndex = parseInt(id, 10);
//     if (arr[userIndex] !== undefined) {
//         arr[userIndex] = name;
//         res.status(200).json({ message: "User updated", users: arr });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

// app.delete("/users/:id", (req, res) => {
//     const { id } = req.params;
//     const userIndex = parseInt(id, 10);
    
//     if (arr[userIndex] !== undefined) {
//         arr.splice(userIndex, 1);
//         res.status(200).json({ message: "User deleted", users: arr });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });


