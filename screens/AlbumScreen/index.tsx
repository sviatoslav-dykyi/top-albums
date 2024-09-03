import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { Album, Track } from "../../types";
import { getAlbum } from "../../api/album";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FastImage from "react-native-fast-image";
import { Images, OUTSIDE } from "../../utils/constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import Loader from "../../components/Loader";
import { RootStackParamList, Screens } from "../../types/navigation";
import { styles } from "./styles";

type AlbumScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.Album
>;

const AlbumScreen: React.FC<AlbumScreenProps> = ({ navigation, route }) => {
  const [data, setData] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { artist, album } = route.params || {};

  const topTracks = data?.tracks?.track ?? [];
  const albumImage = data?.image?.[5]?.["#text"];

  const fetchTopTracks = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAlbum(artist, album);
      const json = await res.json();
      setData(json?.album);
    } catch (error) {
      console.error("Error fetching top albums:", error);
    } finally {
      setIsLoading(false);
    }
  }, [artist, album]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artist} - ${album}` ?? "Default Title", // Встановлюємо новий заголовок
    });
  }, [navigation, album, artist]);

  useEffect(() => {
    fetchTopTracks();
  }, [fetchTopTracks]);

  const renderItem = useCallback<ListRenderItem<Track>>(({ item, index }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.index}>{index + 1}</Text>
        <Icon name="play-circle-outline" size={36} color="#000" />
        <View style={styles.infoContainer}>
          <Text
            style={styles.albumTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={styles.artistName}>{item.artist.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const renderHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <FastImage
          source={albumImage ? { uri: albumImage } : Images.NoImage}
          style={styles.headerImage}
        />
        <View style={styles.headerInfoContainer}>
          <Text style={styles.headerArtistName}>
            {typeof data?.artist === "string" && data?.artist}
          </Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.headerAlbumName}>{data?.name}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Screens.AlbumDetails, {
                  data,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [albumImage, data, navigation],
  );

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={{ marginLeft: OUTSIDE }}>
        <Text>No tracks founded ...</Text>
      </View>
    );
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={topTracks}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </>
  );
};

export default AlbumScreen;
