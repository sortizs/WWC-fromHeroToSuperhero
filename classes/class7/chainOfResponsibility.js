// middlewares/handlers.js
function authenticate(req, res, next) {
  if (!req.headers.Authentication) {
    res.send("User not authenticated");
  } else {
    next();
  }
}

function joiUserValidation(req, res, next) {
  if (joi.isValid(req.body)) {
    next();
  } else {
    res.send(joi.errors);
  }
}

// controllers/userController.js
function createUser(req, res) {
  const user = User.create(req.body);
  res.status(201).json(user);
}

// routes.js
router.post("/users", [authenticate, joiUserValidation], createUser);
