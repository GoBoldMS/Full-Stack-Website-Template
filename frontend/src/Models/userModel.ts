class UserModel {
   public uuid: string;
   public firstName: string;
   public lastName: string;
   public userName: string;
   public password: number;
   public captcha: any;
   public token: string;
   public isLoggedIn: boolean;
}

export default UserModel;
