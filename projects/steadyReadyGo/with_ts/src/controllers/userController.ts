import { NextFunction, Request, Response } from "express";
import { User } from '../models'

export async function getAllUsers(req: Request, res: Response) {
  const { offset, limit } = req.query;
  console.log("User -> getAllUsers");
  const users = await User.findAll({
    offset: Number(offset ?? 0),
    limit: Number(limit ?? 0)
  });
  res.json(users);
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  console.log("User -> createUser");
  console.log(req.body)
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: any) {
    next(new Error(err.message));
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  console.log("User -> getUserById");
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    next(new Error(`No user with id: ${userId}`));
  } else {
    res.json(user);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  console.log("User -> deleteUser");
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    next(new Error(`No user with id: ${userId}`));
  } else {
    await User.destroy({
      where: { id: user.id },
    });
    res.json({
      code: 200,
      status: "Ok",
      message: `User ${user.username} has been deleted`,
    });
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  console.log("User -> updateUser");
  const { id } = req.params;
  try {
    const user = await User.update(req.body, {
      returning: true,
      where: {
        id,
      },
    });
    res.json(user);
  } catch (err: any) {
    next(new Error(err.message));
  }
}
