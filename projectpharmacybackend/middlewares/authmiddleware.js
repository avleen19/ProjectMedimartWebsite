
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization; 
  
    if (token === 'admin_token') {
      // If the token is correct, proceed to the next middleware or route handler
      next();
    } else {
      // If the token is incorrect, return an unauthorized error
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };
  
  module.exports = isAdmin;
  