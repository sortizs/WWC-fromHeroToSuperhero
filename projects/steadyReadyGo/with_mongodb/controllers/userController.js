import { User } from "../models/index.js";
import { fullUserSchema, partialUserSchema } from "../models/schema.js";

export async function getAllUsers(req, res) {
  const { offset, limit } = req.query;
  console.log("User -> getAllUsers");
  const users = await User.findAll({
    offset,
    limit,
  });
  res.json(users);
}

export async function createUser(req, res, next) {
  console.log("User -> createUser");
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(new Error(err));
  }
}

export async function getUserById(req, res, next) {
  console.log("User -> getUserById");
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    next(new Error(`No user with id: ${userId}`));
  } else {
    res.json(user);
  }
}

export async function deleteUser(req, res, next) {
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

export async function updateUser(req, res, next) {
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
  } catch (err) {
    next(new Error(err));
  }
}
