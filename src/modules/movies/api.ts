import { http } from "../../services";
import { IApi } from "./types";

export const Genre = {
  List: () => http.get<IApi.Genre.List.Response>("/genres"),
};

export const Movie = {
  List: () => http.get<IApi.Movie.List.Response>("/movies"),
  //prettier-ignore
  SingleMovieEpisodes: ({ movieId }: IApi.Movie.Episodes.Request) => http.get<IApi.Movie.Episodes.Response>(`/movies/${movieId}/episodes`),
  //prettier-ignore
  SingleMovieSingleEpisode: ({ movieId, episodeId }: IApi.Movie.SingleEP.Request) => http.get<IApi.Movie.SingleEP.Response>(`/movies/${movieId}/episodes/${episodeId}`),
};
