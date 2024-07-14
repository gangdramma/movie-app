export namespace IEntity {
  export interface IUser {
    user: User;
    token: string;
  }

  export interface User {
    id: string;
    username: string;
    password: string;
    gmail: string;
    favorites: any[];
    genres: string[];
  }
}

export namespace IForm {
  export interface ILogin {
    username: string;
    password: string;
  }
  export interface IRegister extends ILogin {
    gmail: string;
  }
}

export namespace IApi {
  export namespace Login {
    export interface Request extends IForm.ILogin {}
    export type Response = IEntity.IUser;
  }
  export namespace Register {
    export interface Request extends IForm.IRegister {}
    export type Response = IEntity.IUser;
  }
}
