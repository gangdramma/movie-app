import get from "lodash/get";

import { IEntity } from "./types";

export const User = (item?: any): IEntity.User => ({
  id: get(item, "_id") || "",
  username: get(item, "username") || "",
  password: get(item, "password") || "",
  gmail: get(item, "gmail") || "",
  favorites: get(item, "favorites") || [],
  genres: get(item, "genres") || [],
});
