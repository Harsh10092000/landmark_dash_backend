import express from "express";
import { 
  getUserFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  checkFavorite, 
  getFavoritesCount 
} from "../controllers/userFavorites.js";
import { verifyJwt } from "../controllers/verifyjwt.js";
import { verifySession } from "../middleware/verifySession.js";

const router = express.Router();

// Get user favorites (protected route)
router.get("/getUserFavorites/:user_id", getUserFavorites);

// Add property to favorites (protected route)
router.post("/add", verifySession, addToFavorites);

// Remove property from favorites (protected route)
router.delete("/removeFromFavorites/:user_id/:property_id", removeFromFavorites);

// Check if property is in favorites (protected route)
router.get("/check/:user_id/:property_id", verifySession, checkFavorite);

// Get favorites count for a user (protected route)
router.get("/count/:user_id", verifySession, getFavoritesCount);

export default router;
