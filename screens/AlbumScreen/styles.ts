import { StyleSheet } from "react-native";
import { OUTSIDE } from "../../utils/constants";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  item: {
    flexDirection: "row",
    marginHorizontal: OUTSIDE,
    alignItems: "center",
  },
  index: { minWidth: 24 },
  infoContainer: {
    marginLeft: 10,
    flexShrink: 1,
    flexGrow: 1,
  },
  albumTitle: {
    fontSize: 16,
  },
  artistName: { fontSize: 14, color: "#444444" },
  itemSeparator: { height: OUTSIDE },
  headerContainer: { marginBottom: OUTSIDE },
  headerImage: { width: "100%", aspectRatio: 1 },
  headerInfoContainer: { paddingTop: 8, paddingHorizontal: 10 },
  headerArtistName: { color: "#777777", fontSize: 16 },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAlbumName: { fontSize: 25, fontWeight: "400", flexShrink: 1 },
  button: {
    backgroundColor: "pink",
    padding: 4,
    borderRadius: 6,
  },
  buttonText: {
    textTransform: "uppercase",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
