import { IEntity } from "./types";
import get from "lodash/get";

export const Genre = (item?: any): IEntity.Genre => ({
  id: get(item, "_id") || "",
  title: get(item, "title") || "",
});

export const Episode = (item?: any): IEntity.Episode => ({
  title: get(item, "title") || "",
  video: get(item, "video") || "",
  desc: get(item, "description") || "",
  duration: get(item, "duration") || 0,
  poster: get(item, "poster") || "",
  id: get(item, "_id") || "",
});

export const Movie = (item?: any): IEntity.IMovie => ({
  id: get(item, "_id") || "",
  title: get(item, "title") || "",
  desc: get(item, "description") || "",
  thumbnail: get(item, "thumbnail") || "",
  rate: get(item, "rate") || 0,
  genre: get(item, "genre", []).map((genreItem: any) => Genre(genreItem)),
  episodes: get(item, "episodes", []).map((episodeItem: any) =>
    Episode(episodeItem)
  ),
  bgThumbnail: get(item, "bgThumbnail") || "",
});
