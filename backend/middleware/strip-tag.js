const stripTags = require("striptags");

function stripTag(request, response, next) {
   for (const prop in request.body) {
      if (typeof request.body[prop] === "string") {
         request.body[prop] = stripTags(request.body[prop]);
      }
   }
   next();
}

module.exports = stripTag;
