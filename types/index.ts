export type Album = {
  name: string;
  playcount: number;
  mbid: string;
  url: string;
  artist: ArtistShort | string;
  image: AlbumImage[];
  tracks: { track: Track[] }
  wiki: {
    published: string;
    summary: string;
  }
};

export type AlbumImage = {
  '#text': string;
  size: string;
};

export type Track = {
  streamable: {
    fulltrack: string;
    '#text': string;
  };
  duration: number;
  url: string;
  name: string;
  '@attr': {
    rank: number;
  };
  artist: ArtistShort;
};

export type ArtistShort = Pick<Artist, 'url' | 'name' | 'mbid'>

export type Artist = {
  url: string;
  name: string;
  mbid: string;
  bio: { summary: string };
};
