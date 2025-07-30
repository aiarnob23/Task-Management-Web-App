import jwt from "jsonwebtoken";

// verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      redirect: "/auth/login",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.realUser = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({
      success: false,
      message: "Forbidden access",
      redirect: "/auth/login",
    });
    return;
  }
};
