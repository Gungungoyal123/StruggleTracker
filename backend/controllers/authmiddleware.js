import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET_kEY);

        // 3. Attach the user ID to the request object
        req.user = { id: decoded.id }; 
        
        next(); // Move to the next function (addProblem)
    } catch (error) {
        res.status(401).json({ message: "Token failed" });
    }
};

