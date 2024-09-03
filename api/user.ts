import { http } from "../utils/http";

export const getTopAlbumsByUser = async (
  user: string,
  limit = 16,
): Promise<Response> => {
  return await http.get(`user.gettopalbums&user=${user}&limit=${limit}`);
};
