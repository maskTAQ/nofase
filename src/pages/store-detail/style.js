import { computeSize } from "src/common";
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
    height: computeSize(220),
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
    padding: computeSize(4),
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12)
  },
  storeName: { fontSize: computeSize(16), color: "#fff", fontWeight: "bold" },
  storeAddr: {
    marginTop: computeSize(4),
    fontSize: computeSize(12),
    color: "#fff",
    fontWeight: "bold"
  },
  navgation: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  navgationText: {
    fontSize: computeSize(10),
    color: "#fff"
  },
  shareBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: computeSize(999),
    flexDirection: "row",
    width: "100%",
    height: computeSize(70),
    backgroundColor: "#fff"
  },
  priceWrapper: {
    marginTop: computeSize(4),
    marginBottom: computeSize(4),
    flexDirection: "row",
    padding: computeSize(6),
    backgroundColor: "#666",
    alignContent: "center"
  },
  shareBarItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  shareBarItemLabel: {
    fontSize: computeSize(14),
    color: "#1a9bfc"
  },
  starScoreWrapper: {
    flexDirection: "row",
    paddingLeft: computeSize(6),
    paddingRight: computeSize(6),
    height: computeSize(40),
    alignItems: "center",
    backgroundColor: "#fff"
  },
  starScorContent: {
    flexDirection: "row",
    justifyContent: "center"
  },
  starScoreLabel: {
    fontSize: computeSize(14),
    color: "#898989"
  },
  starScoreValue: {
    paddingLeft: computeSize(4),
    fontSize: computeSize(12),
    color: "#1a97df"
  },
  portraitWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
    //alignItems: "flex-end"
  },
  propsWrapper: {
    marginTop: computeSize(4),
    marginBottom: computeSize(4),
    flexDirection: "row",
    justifyContent: "space-around",
    height: computeSize(40),
    alignItems: "center",
    paddingLeft: computeSize(6),
    paddingRight: computeSize(6),
    backgroundColor: "#fff"
  },
  hourSwapper: {
    marginBottom: computeSize(4),
    flexDirection: "row",
    height: computeSize(40),
    alignItems: "center",
    paddingLeft: computeSize(6),
    paddingRight: computeSize(6),
    backgroundColor: "#fff"
  },
  remarksWrapper: {
    marginBottom: computeSize(4),

    backgroundColor: "#fff"
  },
  remarksLabelWrapper: {
    height: computeSize(40),
    paddingLeft: computeSize(6),

    justifyContent: "center"
    // borderBottomWidth: 0.computeSize(6),
    // borderColor: "#bfbfbf"
  },
  remarksLabel: {
    //marginBottom: computeSize(6),
    fontSize: computeSize(14),
    color: "#bfbfbf",
    fontWeight: "bold"
  },
  remarksValue: {
    fontSize: computeSize(14),
    paddingLeft: computeSize(6),
    lineHeight: computeSize(20),
    color: "#bfbfbf"
  },
  timetableTitle: {
    height: computeSize(36),
    justifyContent: "center",
    paddingLeft: computeSize(6),
    backgroundColor: "#fff"
  },
  timetableTitleText: {
    fontSize: computeSize(14),
    //lineHeight:computeSize(20),
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
      fontSize: computeSize(10),
      color: "red"
    }
  }
};
