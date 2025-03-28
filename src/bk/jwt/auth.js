import jwt from "jsonwebtoken";
export default verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, "secret");

        req.user = decoded;

        next();
    } catch (err) {
        return res.sendStatus(500);
    }
}