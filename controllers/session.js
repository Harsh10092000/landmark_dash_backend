export const getSessionData = async (req, res) => {
    try {
        const response = await fetch(process.env.NEXT_URL + '/api/auth/session', {
          method: 'GET',
          headers: {
            Cookie: req.headers.cookie || '', // Forward cookies from browser
          },
          credentials: 'include', // Include cookies
        });
    
        if (!response.ok) {
          return res.status(401).json({ error: 'Not authenticated' });
        }
    
        const sessionData = await response.json();
        if (!sessionData.user) {
          return res.status(401).json({ error: 'Not authenticated' });
        }
    
        console.log("sessionData 11 : " , sessionData);
        // Optionally fetch plain email from database or keep encrypted
        res.json({
          user: {
            id: sessionData.user.id,
            name: sessionData.user.name,
            email: sessionData.user.email, // Still encrypted
          },
        });
      } catch (error) {
        console.error('Session fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};