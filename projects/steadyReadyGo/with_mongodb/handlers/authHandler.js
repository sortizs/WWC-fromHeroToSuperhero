import jsonwebtoken from "jsonwebtoken";

export function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  let decodedToken;

  try {
    decodedToken = jsonwebtoken.verify(auth, process.env.JWT_SECRET_KEY);
    if (decodedToken) {
      next();
    } else {
      res.status(401);
      res.send("Access forbidden");
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send(err.message || "Access forbidden");
    return;
  }
}
