const fs = require("fs");

function safeDeleteAsync(absolutePath) {
   try {
      if (!absolutePath || !fs.existsSync(absolutePath)) return;
      fs.unlinkSync(absolutePath);
   } catch (err) {
      console.log(err);
   }
}

module.exports = {
   safeDeleteAsync,
};
