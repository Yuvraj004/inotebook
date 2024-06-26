var jwt = require("jsonwebtoken");
const JWT_SECRET = "yuvi";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to req object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user.id = data.user.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
