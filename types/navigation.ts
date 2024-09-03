import { Album as TAlbum } from ".";

import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type Navigation = NavigationProp<ParamListBase> | undefined;

export enum Screens {
  Home = "Home",
  Album = "Album",
  AlbumDetails = "AlbumDetails",
  Login = "Login",
}

export type RootStackParamList = {
  [Screens.Home]: undefined;
  [Screens.Album]: { artist: string; album: string };
  [Screens.AlbumDetails]: { data: TAlbum | null };
  [Screens.Login]: undefined;
};
