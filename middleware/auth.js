const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get the token from the Authorization header (if it exists)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return a 401 Unauthorized response
  if (!token) return res.status(401).json({ message: "Authorization denied" });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, add the decoded user data to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: "Token is not valid" });
  }
};
