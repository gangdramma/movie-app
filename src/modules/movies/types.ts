export namespace IEntity {
  export interface ISingle {
    title: string;
    video: string;
    description: string;
    duration: number;
    poster: string;
    id: string;
  }

  export interface IMovie {
    id: string;
    title: string;
    desc: string;
    thumbnail: string;
    rate: number;
    genre: Genre[];
    episodes: Episode[];
    bgThumbnail: string;
  }

  export interface Genre {
    id: string;
    title: string;
  }

  export interface Episode {
    title: string;
    video: string;
    desc: string;
    duration: number;
    poster: string;
    id: string;
  }
}

export namespace IApi {
  export namespace Genre {
    export namespace List {
      export interface Request {}
      export interface Response {}
    }
  }

  export namespace Movie {
    export namespace List {
      export interface Request {}
      export type Response = IEntity.IMovie[];
    }

    export namespace Single {
      export interface Request {
        movieId: string;
      }

      export type Response = IEntity.IMovie[];
    }

    export namespace Episodes {
      export interface Request {
        movieId: string;
      }

      export type Response = IEntity.ISingle[];
    }

    export namespace SingleEP {
      export interface Request {
        movieId: string;
        episodeId: string;
      }

      export type Response = IEntity.ISingle[];
    }
  }
}
