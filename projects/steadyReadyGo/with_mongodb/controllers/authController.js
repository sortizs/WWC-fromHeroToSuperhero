import jsonwebtoken from "jsonwebtoken";

export async function login(req, res) {
  console.log('Authentication -> login')
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    
    if(!user) {
      res.json({error: "user / password combination does not exists"});
      return
    }
    
    const token = JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )
    
    res.json({token, email: user.email, name: user.getFullName()});
  } catch (e) {
    console.error(e);
    res.send(e);
  }
}

export function restrictedView(_, res) {
  console.log('Authentication -> restrictedView')
  res.status(200).send("Confidential View");
}
