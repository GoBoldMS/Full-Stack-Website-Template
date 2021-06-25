abstract class Global {}

class DevelopmentGlobals extends Global {
   public urlGeneral = "http://localhost:3001";
   public urlAdmin = "http://localhost:3001/api/admin";
   public urlVacations = "http://localhost:3001/api/vacations";
   public urlAuth = "http://localhost:3001/api/auth";
}

class ProductionGlobals extends Global {
   public urlGeneral = " ";
   public urlAdmin = " ";
   public urlVacations = " ";
   public urlAuth = " ";
}

const globals =
   process.env.NODE_ENV === "production"
      ? new ProductionGlobals()
      : new DevelopmentGlobals();

export default globals;
