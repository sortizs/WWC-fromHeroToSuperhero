export function healthCheck(_, res) {
  res.json({ status: "ok", message: "healthy" });
}

export function welcomePage(_, res) {
  res.send("Welcome!");
}
