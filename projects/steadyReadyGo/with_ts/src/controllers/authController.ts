import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../models";

export async function login(req: Request, res: Response) {
  console.log("Authentication -> login");
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    if (!user) {
      res.json({ error: "user / password combination does not exists" });
      return;
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    let token;
    if (JWT_SECRET_KEY) {
      token = jsonwebtoken.sign({ email: user.email }, JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    res.json({ token, email: user.email, name: user.getFullName() });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
}

export function restrictedView(req: Request, res: Response) {
  console.log("Authentication -> restrictedView");
  res.status(200).send("Confidential View");
}
