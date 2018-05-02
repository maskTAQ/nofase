export default {
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBar: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent"
  },
  header: {
    position: "relative",
    height: 220,
    justifyContent: "flex-end"
  },
  headerBg: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  storeIntro: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  introTitleBox: {
    flexDirection: "row",
    padding: 10
  },

  shareBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: "#fff"
  },
  shareBarItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  shareBarItemLabel: {
    fontSize: 14,
    color: "#1a9bfc"
  }
};
