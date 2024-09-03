import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Navigation, Screens } from "../../types/navigation";
import { Images } from "../../utils/constants";
import FastImage from "react-native-fast-image";
import { styles } from "./styles";

type ItemCellProps = {
  artist: string;
  album: string;
  imageUrl: string;
  navigation: Navigation;
  filteredAlbumsLength: number;
  index: number;
};

const ItemCell: React.FC<ItemCellProps> = ({
  artist,
  album,
  imageUrl,
  navigation,
  filteredAlbumsLength,
  index,
}) => {
  console.log('rendered')
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation?.navigate(Screens.Album, {
          artist,
          album,
        });
      }}
    >
      <FastImage
        source={imageUrl ? { uri: imageUrl } : Images.NoImage}
        style={[
          {
            width:
              index === filteredAlbumsLength - 1 &&
              filteredAlbumsLength % 2 !== 0
                ? "50%"
                : "100%",
          },
          styles.image,
        ]}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {album}
        </Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ItemCell);
