import {
  View,
  Text,
  TextInput,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getTopAlbumsByArtist } from "../../api/artist";
import debounce from "lodash.debounce";
import { Album } from "../../types";
import FastImage from "react-native-fast-image";
import { Images, USER_NAME_DEFAULT } from "../../utils/constants";
import { getTopAlbumsByUser } from "../../api/user";
import { styles } from "./styles";
import Loader from "../../components/Loader";
import { RootStackParamList, Screens } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ItemCell from "./ItemCell";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [favouriteAlbums, setFavouriteAlbums] = useState<Album[]>([]);
  const [artist, setArtist] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopAlbumsByArtist = useCallback(
    debounce(async (artistName) => {
      setIsLoading(true);
      try {
        const res = await getTopAlbumsByArtist(artistName);
        const json = await res.json();
        setAlbums(json?.topalbums?.album ?? []);
      } catch (error) {
        console.error("Error fetching top albums:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [],
  );

  const fetchTopAlbumsByUser = useCallback(
    debounce(async (userName) => {
      setIsLoading(true);
      try {
        const res = await getTopAlbumsByUser(userName);
        const json = await res.json();
        const newAlbums = json?.topalbums?.album ?? [];
        setFavouriteAlbums(newAlbums);
        setAlbums(newAlbums);
      } catch (error) {
        console.error("Error fetching top albums:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [],
  );

  const resetAlbums = useCallback(() => {
    setAlbums(favouriteAlbums);
  }, [favouriteAlbums]);

  useEffect(() => {
    if (!artist.length) {
      return;
    }
    if (artist.length < 2) {
      resetAlbums();
    } else {
      fetchTopAlbumsByArtist(artist);
    }

    return () => {
      fetchTopAlbumsByArtist.cancel();
    };
  }, [artist, fetchTopAlbumsByArtist, resetAlbums]);

  useEffect(() => {
    fetchTopAlbumsByUser(USER_NAME_DEFAULT);
  }, [fetchTopAlbumsByUser]);

  const filteredAlbums = albums.filter((i) => i.name !== "(null)");

  const renderItem = useCallback<ListRenderItem<Album>>(
    ({ item, index }) => {
      return (
        <ItemCell
          artist={typeof item.artist !== "string" ? item.artist?.name : ""}
          album={item.name}
          imageUrl={item.image[2]["#text"]}
          navigation={navigation}
          filteredAlbumsLength={filteredAlbums.length}
          index={index}
        />
      );
    },
    [navigation, filteredAlbums.length],
  );

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={artist}
        style={styles.textInput}
        placeholder="Seek your favorite artist..."
        onChangeText={setArtist}
      />
      {!isLoading ? (
        <FlatList
          data={filteredAlbums}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListHeaderComponent={() => {
            return <Text style={styles.listHeader}>Top Albums</Text>;
          }}
          ListFooterComponent={() => {
            return <View style={styles.listFooter} />;
          }}
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
          keyExtractor={(item) => item.name + item.mbid}
          initialNumToRender={7}
        />
      ) : (
        <Loader color="#ffffff" />
      )}
    </View>
  );
};

export default HomeScreen;
