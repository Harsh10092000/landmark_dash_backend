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

export const logoutUser = async (req, res) => {
  try {
    console.log("Logout request - cookies:", req.headers.cookie);
    const nextUrl = process.env.NEXT_URL || 'https://landmarkplots.com';
    
    // Call NextAuth signout endpoint
    const response = await fetch(`${nextUrl}/api/auth/signout`, {
      method: 'GET',
      headers: {
        Cookie: req.headers.cookie || '', // Forward cookies from browser
      },
      credentials: 'include',
    });

    console.log("Signout response status:", response.status, response);

    // Also cleanup expired sessions
    try {
      await fetch(`${nextUrl}/api/auth/cleanup-sessions`, {
        method: 'POST',
        headers: {
          Cookie: req.headers.cookie || '',
        },
        credentials: 'include',
      });
    } catch (cleanupErr) {
      console.warn('Cleanup sessions error:', cleanupErr);
    }

    // Return success even if signout had issues (cookies might be cleared)
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    // Still return success to allow frontend to proceed with logout
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  }
};