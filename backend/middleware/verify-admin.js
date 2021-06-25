const jwt = require("jsonwebtoken");

function verifyAdmin(request, response, next) {
   if (!request.headers.authorization)
      return response.status(401).send("You are not logged in");

   const token = request.headers.authorization.split(" ")[1];

   if (!token) return response.status(401).send("You are not logged in");

   jwt.verify(token, config.jwtKey, (err, payload) => {
      if (err && err.message === "jwt expired")
         return response
            .status(403)
            .send("Your session as expired please log in agin.");

      if (err) return response.status(401).send("You are not logged in");

      if (payload.payload.isAdmin === 0)
         return response.status(404).send("You are not authorized");

      next();
   });
}

module.exports = verifyAdmin;
