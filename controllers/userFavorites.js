import { db } from "../connect.js";

// Get user favorites
export const getUserFavorites = (req, res) => {
  const { user_id } = req.params;
  console.log("user_id : " , user_id);
  const q = `
    SELECT 
      uf.id,
      uf.user_id,
      uf.property_id,
      uf.created_at,
      uf.updated_at,
      property_module.pro_ad_type, 
      property_module.pro_amt, 
      property_module.pro_locality, 
      property_module.pro_washrooms, 
      property_module.pro_bedroom, 
      property_module.pro_area_size , 
      property_module.pro_area_size_unit, 
      property_module.pro_user_id, 
      property_module.pro_user_type, 
      property_module.pro_url, 
      property_module.listing_id, 
      property_module.pro_type, 
      property_module.pro_city, 
      property_module.pro_state, 
      property_module.pro_cover_image, 
      property_module.pro_creation_date
    FROM user_favorites uf
    LEFT JOIN property_module ON uf.property_id = property_module.listing_id
    WHERE uf.user_id = ?
    ORDER BY uf.created_at DESC
  `;

  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user favorites:", err);
      return res.status(500).json({ error: "Failed to fetch favorites" });
    }
    
    res.status(200).json(data);
  });
};

// Add property to favorites
export const addToFavorites = (req, res) => {
  const { user_id, property_id } = req.body;
  
  if (!user_id || !property_id) {
    return res.status(400).json({ error: "User ID and Property ID are required" });
  }

  const q = "INSERT INTO user_favorites (user_id, property_id) VALUES (?, ?)";
  
  db.query(q, [user_id, property_id], (err, data) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Property already in favorites" });
      }
      console.error("Error adding to favorites:", err);
      return res.status(500).json({ error: "Failed to add to favorites" });
    }
    
    res.status(201).json({ 
      message: "Property added to favorites successfully",
      id: data.insertId 
    });
  });
};

// // Remove property from favorites
// export const removeFromFavorites = (req, res) => {
//   const { user_id, property_id } = req.params;
//   console.log("user_id : " , user_id);
//   console.log("property_id : " , property_id);
//   const q = "DELETE FROM user_favorites WHERE user_id = ? AND property_id = ?";
  
//   db.query(q, [user_id, property_id], (err, data) => {
//     if (err) {
//       console.error("Error removing from favorites:", err);
//       return res.status(500).json({ error: "Failed to remove from favorites" });
//     }
    
//     if (data.affectedRows === 0) {
//       return res.status(404).json({ error: "Favorite not found" });
//     }
    
//     res.status(200).json({ message: "Property removed from favorites successfully" });
//   });
// };



export const removeFromFavorites = (req, res) => {
  const q = "DELETE FROM user_favorites WHERE user_id = ? AND property_id = ?";
  db.query(q, [req.params.user_id, req.params.property_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};

// Check if property is in favorites
export const checkFavorite = (req, res) => {
  const { user_id, property_id } = req.params;
  
  const q = "SELECT id FROM user_favorites WHERE user_id = ? AND property_id = ?";
  
  db.query(q, [user_id, property_id], (err, data) => {
    if (err) {
      console.error("Error checking favorite:", err);
      return res.status(500).json({ error: "Failed to check favorite status" });
    }
    
    res.status(200).json({ 
      isFavorite: data.length > 0,
      favoriteId: data.length > 0 ? data[0].id : null
    });
  });
};

// Get favorites count for a user
export const getFavoritesCount = (req, res) => {
  const { user_id } = req.params;
  
  const q = "SELECT COUNT(*) as count FROM user_favorites WHERE user_id = ?";
  
  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.error("Error getting favorites count:", err);
      return res.status(500).json({ error: "Failed to get favorites count" });
    }
    
    res.status(200).json({ count: data[0].count });
  });
};
