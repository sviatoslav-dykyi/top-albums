import { StyleSheet } from "react-native";
import { OUTSIDE } from "../../utils/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    padding: 10,
    marginVertical: OUTSIDE,
    marginHorizontal: OUTSIDE,
  },
  listHeader: {
    paddingLeft: OUTSIDE,
    paddingBottom: OUTSIDE,
    fontSize: 18,
    fontWeight: "600",
  },
  listFooter: { height: 50 },
  item: {
    flex: 1,
    marginHorizontal: OUTSIDE / 2,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
  },
  infoContainer: { marginTop: 6 },
  albumTitle: { fontSize: 16, fontWeight: "500" },
  artistName: { fontSize: 14, color: "#444444" },
  itemSeparator: { height: 18 },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
