import { http } from "../utils/http";

export const getAlbum = async (
  artist: string,
  album: string,
): Promise<Response> => {
  return await http.get(`album.getinfo&artist=${artist}&album=${album}`);
};
