const jwt = require("jsonwebtoken");
const Token = require("./../models/token-model");

class TokenService {
  createToken = async (user) => {
    const createdToken = jwt.sign(
      { user_id: user._id, email: user.email },
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDg1Nzg1NiwiaWF0IjoxNjgwODU3ODU2fQ.kP8nkjnbhShIBQvTQjDw1q2pub-m1Onh_ecynja6tUk",
      { expiresIn: "30m" }
    );
    console.log(createdToken);
  };
}
