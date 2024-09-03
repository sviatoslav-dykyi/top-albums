import { http } from "../utils/http";

export const getTopAlbumsByArtist = async (
  artist: string,
  limit = 16,
): Promise<Response> => {
  return await http.get(`artist.gettopalbums&artist=${artist}&limit=${limit}`);
};

export const fetchMyArtistInfo = async (artist: string): Promise<Response> => {
  return await http.get(`artist.getinfo&artist=${artist}`);
};
