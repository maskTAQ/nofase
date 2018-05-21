export default {
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#f2f2f2"
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
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12
  },
  storeName: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  storeAddr: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold"
  },
  navgation: {
    justifyContent: "center",
    alignItems: "center"
  },
  navgationText: {
    fontSize: 8,
    color: "#fff"
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
  priceWrapper: {
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    padding: 6,
    backgroundColor: "#666",
    alignContent: "center"
  },
  shareBarItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  shareBarItemLabel: {
    fontSize: 14,
    color: "#1a9bfc"
  },
  starScoreWrapper: {
    flexDirection: "row",
    paddingLeft: 6,
    paddingRight: 6,
    height: 40,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  starScorContent: {
    flexDirection: "row"
  },
  starScoreLabel: {
    fontSize: 14,
    color: "#898989"
  },
  starScoreValue: {
    paddingLeft: 4,
    fontSize: 12,
    color: "#1a97df"
  },
  portraitWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  propsWrapper: {
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: "#fff"
  },
  hourSwapper: {
    marginBottom: 4,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: "#fff"
  },
  remarksWrapper: {
    marginBottom: 4,

    backgroundColor: "#fff"
  },
  remarksLabelWrapper: {
    height: 30,
    paddingLeft: 6,

    justifyContent: "center",
    borderBottomWidth: 0.6,
    borderColor: "#bfbfbf"
  },
  remarksLabel: {
    marginBottom: 6,
    fontSize: 14,
    color: "#bfbfbf",
    fontWeight: "bold"
  },
  remarksValue: {
    fontSize: 12,
    paddingLeft: 6,
    lineHeight: 20,
    color: "#bfbfbf"
  },
  timetableTitle: {
    height: 36,
    justifyContent: "center",
    paddingLeft: 12,
    backgroundColor: "#fff"
  },
  timetableTitleText: {
    fontSize: 14,
    //lineHeight:20,
    color: "#bfbfbf"
  },

  table: {
    th: {
      backgroundColor: "#1a9bfc"
    },
    thText: {
      color: "#fff"
    },
    tdText: {
      fontSize: 10,
      color: "red"
    }
  }
};
