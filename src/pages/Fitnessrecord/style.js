import { computeSize } from "src/common";
export default {
  contianer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#a7daf7"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  bgTop: {
    height: computeSize(160),
    backgroundColor: "#1b9de6"
  },
  bgBottom: {
    flex: 1,
    backgroundColor: "#e0dede"
  },
  content: {
    flex: 1,
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12),
    paddingTop: computeSize(20)
  },

  banner: {
    width: "100%",
    height: computeSize(180),
    zIndex: computeSize(999),
    marginBottom: computeSize(15)
  },
  item: {
    height: computeSize(90),
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6
  },
  itemLeft: {},
  itemTime: { color: "#777", fontSize: computeSize(14), lineHeight: 30 },
  itemDetail: { color: "#777", fontSize: computeSize(14), lineHeight: 30 },
  rightimg: {
    flexDirection: "row",
    width: computeSize(50),
    justifyContent: "flex-end"
  },
  noData: {
    alignItems: "center"
  },

  shareBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    width: "100%",
    height: computeSize(70),
    backgroundColor: "#fff"
  },
  shareBarItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  shareBarItemLabel: {
    fontSize: computeSize(14),
    color: "#1a9bfc"
  }
};
