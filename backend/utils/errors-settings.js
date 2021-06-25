function error(err) {
   if (process.env.NODE_ENV === "production") {
      return "Ops 😓 something went wrong please try agin later.";
   }

   return err;
}

module.exports = {
   error,
};
