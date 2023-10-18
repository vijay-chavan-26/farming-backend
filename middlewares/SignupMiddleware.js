export const SignupCheck = (req, res, next) => {
  console.log(req.body);
  const { name, email, mobile_number, password, type } = req.body;
  if (!name || !email || !mobile_number || !password || !type) {
    return res
      .status(400)
      .json({ error: "Required fields are missing or empty." });
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  } else if (!/^[5-9]\d{9}$/.test(mobile_number)) {
    return res.status(400).json({ error: "Invalid mobile number" });
  } else if (type !== "Admin" && type !== "Farmer" && type !== "Partner") {
    console.log(type !== "Admin" && type !== "Farmer" && type !== "Partner");
    return res.status(400).json({ error: "Invalid type" });
  }
  req.body.name = req.body.name.trim();
  req.body.email = req.body.email.trim().toLowerCase();
  req.body.password = req.body.password.trim();
  req.body.mobile_number = req.body.mobile_number.trim();
  next();
};
