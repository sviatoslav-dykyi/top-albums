import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  container: { flex: 1 },
  topInfoContainer: { flexDirection: "row" },
  image: { width: 120, aspectRatio: 1 },
  artistAlbumBlock: { marginLeft: 10, marginTop: 4, alignItems: "flex-start" },
  albumTitle: { fontSize: 18 },
  artistName: { fontSize: 16, color: "#777777" },
  rows: { padding: 8 },
  row: { flexDirection: "row" },
  firstColumn: { minWidth: "30%", fontWeight: "700" },
  aboutTitle: {
    fontWeight: "700",
    textAlign: "center",
    color: "#333333",
    marginTop: 12,
  },
  aboutTextContainer: { padding: 8 },
  aboutText: { fontSize: 15, color: "#222222", lineHeight: 22 },
});
