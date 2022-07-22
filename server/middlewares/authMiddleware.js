const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) return res.status(401).json({ msg: "you are not authorized" });
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.sub;
    next();
  } catch (error) {
    res.status(500).json({ err: "invalid token" });
  }
};

module.exports = authMiddleware;
