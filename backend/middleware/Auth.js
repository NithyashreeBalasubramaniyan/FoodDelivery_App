import jwt from 'jsonwebtoken';

const AuthMethod = (req, res, next) => {
  const {token} = req.headers // 🔥 standard header
  console.log("token",token);         // ✅ helpful for debugging

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
  }
  console.log("EXTRACTED TOKEN:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default AuthMethod;

