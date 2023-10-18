export const LoginCheck = (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Required fields are missing or empty." });
    } 
    req.body.username = req.body.username.trim().toLowerCase();
    req.body.password = req.body.password.trim();
    next();
  };
  