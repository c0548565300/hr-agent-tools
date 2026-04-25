import { Request, Response, NextFunction } from "express";
import { verifyFirebaseIdToken } from "../services/firebase.service.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false, 
      message: "Access denied. No token provided." 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await verifyFirebaseIdToken(token);
     
    req.user = decodedUser;
    
    next(); 
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token." 
    });
  }
};