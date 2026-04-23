import { Request, Response, NextFunction } from "express";
import { verifyFirebaseIdToken } from "../services/firebase.service.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // בדיקה שה-Header קיים ובפורמט הנכון לפי הסטנדרט (Bearer TOKEN)
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false, 
      message: "Access denied. No token provided." 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await verifyFirebaseIdToken(token);
    
    // הזרקת המשתמש המאומת לאובייקט ה-Request
    (req as any).user = decodedUser;
    
    next(); // מעבר לנתיב המבוקש
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token." 
    });
  }
};