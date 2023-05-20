import jsonwebtoken from "jsonwebtoken";

export function login(req, res) {
  console.log('Authentication -> login')
  const email = req.body;
  const token = jsonwebtoken.sign({ email: email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    data: {
      token: token,
    },
  });
}

export function restrictedView(_, res) {
  console.log('Authentication -> restrictedView')
  res.status(200).send("Confidential View");
}
