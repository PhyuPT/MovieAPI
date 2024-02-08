export interface IUser {
  _id?: Object;
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm?: string;
  favouriteMovies?: [Number];
}
