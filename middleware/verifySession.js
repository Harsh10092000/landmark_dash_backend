export const verifySession = async (req, res, next) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/session', {
        method: 'GET',
        headers: {
          Cookie: req.headers.cookie || '', // Forward cookies from browser
        },
        credentials: 'include', // Include cookies
      });
  
      if (!response.ok) {
        return res.status(401).json(false);
      }
  
      const sessionData = await response.json();
      if (!sessionData.user) {
        return res.status(401).json(false);
      }
  
      // Attach user ID to request object
      req.user = { id: sessionData.user.id };
  
      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error('Session verification error:', error);
      res.status(500).json(error);
    }
  };