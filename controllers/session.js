import "dotenv/config";

export const getSessionData = async (req, res) => {
    try {
      console.log("req.headers.cookie : " , req.headers.cookie);
      console.log("process.env.NEXT_URL : " , process.env.NEXT_URL);
        const response = await fetch(process.env.NEXT_URL + '/api/auth/session', {
          method: 'GET',
          headers: {
            Cookie: req.headers.cookie || '', // Forward cookies from browser
          },
          credentials: 'include', // Include cookies
        });
    

        console.log("response : " , response);

        if (!response.ok) {
          return res.status(401).json({ error: 'Not authenticated' });
        }
    
        const sessionData = await response.json();
        if (!sessionData.user) {
          return res.status(401).json({ error: 'No data found' });
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