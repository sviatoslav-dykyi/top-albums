import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Album, Artist } from "../../types";
import { SafeAreaView } from "react-native";
import { fetchMyArtistInfo } from "../../api/artist";
import FastImage from "react-native-fast-image";
import { Images } from "../../utils/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "../../types/navigation";
import { styles } from "./styles";

type AlbumScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.AlbumDetails
>;

const AlbumDetailsScreen: React.FC<AlbumScreenProps> = ({ route }) => {
  const { data } = (route.params as { data: Album | null }) || {};
  const albumImage = data?.image?.[5]?.["#text"];
  const [artist, setArtist] = useState<Artist | null>(null);

  const getTopTracks = useCallback(async () => {
    if (typeof data?.artist !== "string" || !data?.artist) {
      return;
    }
    try {
      const res = await fetchMyArtistInfo(data?.artist);
      const json = await res.json();
      setArtist(json?.artist);
    } catch (error) {
      console.error("Error fetching top albums:", error);
    } finally {
    }
  }, [data?.artist]);

  useEffect(() => {
    getTopTracks();
  }, [getTopTracks]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <View style={styles.topInfoContainer}>
          {
            <FastImage
              source={albumImage ? { uri: albumImage } : Images.NoImage}
              style={styles.image}
            />
          }
          <View style={styles.artistAlbumBlock}>
            <Text style={styles.albumTitle}>{data?.name}</Text>
            <Text style={styles.artistName}>
              {typeof data?.artist === "string" && data?.artist}
            </Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text style={styles.firstColumn}>Length</Text>
            <Text>{data?.tracks?.track?.length} tracks</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.firstColumn}>Release Date</Text>
            <Text>{data?.wiki?.published ?? "--"}</Text>
          </View>
        </View>
        {data?.wiki?.summary && (
          <>
            <Text style={styles.aboutTitle}>About album</Text>
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutText}>{data?.wiki?.summary}</Text>
            </View>
          </>
        )}
        {artist?.bio.summary && (
          <>
            <Text style={styles.aboutTitle}>About artist</Text>
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutText}>{artist?.bio.summary}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlbumDetailsScreen;
