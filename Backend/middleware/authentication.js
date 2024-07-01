const secretKey = "your_jwt_secret_key";
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Received auth header:", authHeader);
  console.log("Extracted token:", token);

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err);
      return res
        .status(403)
        .json({ message: "Invalid token", error: err.message });
    }

    console.log("Decoded user from token:", decodedToken);
    
    // Extraer solo la información necesaria del token decodificado
    req.user = {
      id: decodedToken.userId,
      email: decodedToken.email
    };
    
    console.log("User object set on request:", req.user);
    next();
  });
}

module.exports = authenticateToken;