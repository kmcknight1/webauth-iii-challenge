const jwt = require("jsonwebtoken");

const secrets = require("../secret");

module.exports = (req, res, next) => {
  //get the token from Authorization header (usually)
  const token = req.headers.authorization;

  //verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //invalid token
        res
          .status(401)
          .json({ message: "You shall not pass!! Invalid token :(" });
      } else {
        //valid token
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You shall not pass!! No token :(" });
  }
};
