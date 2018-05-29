import { computeSize } from "src/common";
const mainColor = "#1a9bfc";
export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#1b9de6"
  },
  box: {
    flex: 1,
    padding: computeSize(20),
    paddingBottom: computeSize(50)
  },
  content: {
    flex: 1,
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15),
    backgroundColor: "#fff",
    borderRadius: computeSize(12)
  },
  chunk: {
    marginLeft: computeSize(12),
    marginRight: computeSize(12),
    height: computeSize(14),
    borderBottomLeftRadius: computeSize(10),
    borderBottomRightRadius: computeSize(10),
    backgroundColor: "#8dcffc"
  },
  headerWrapper: {
    //paddingTop: computeSize(50),
    padding: computeSize(4),
    paddingBottom: 0
  },
  header: {
    flexDirection: "row"
  },
  rightIconWrapepr: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerItemWrapper: {
    flex: 1,
    paddingTop: computeSize(12),
    paddingLeft: computeSize(4)
  },
  headerItemRight: {
    paddingRight: computeSize(6),
    alignItems: "flex-end"
  },
  headerItemLabel: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  headerItemValue: {
    fontSize: computeSize(14),
    color: mainColor
  },
  storeInfoWrapper: {
    height: computeSize(40)
  },
  storeInfo: {
    flex: 1,
    paddingLeft: computeSize(8),
    paddingRight: computeSize(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  storeName: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  timeCount: {
    height: computeSize(26),
    lineHeight: computeSize(26),
    justifyContent: "center",
    paddingLeft: computeSize(4),
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  tWrapper: {
    padding: computeSize(4),
    paddingTop: computeSize(10),
    paddingBottom: 1
  },
  t: {
    flexDirection: "row",
    paddingLeft: computeSize(4),
    paddingRight: computeSize(4)
  },
  tItem: {
    flex: 1
  },
  tItemLabel: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  tItemValueWrapper: {
    //flexDirection:'row',
    height: computeSize(40),
    justifyContent: "center"
  },
  tItemValue: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  starScore: {
    padding: computeSize(8),
    paddingTop: 0,
    paddingBottom: 0
  },
  starScoreTitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  starScoreBox: {
    height: computeSize(40),
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between"
  },
  submit: {
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    height: computeSize(22),
    borderRadius: computeSize(6),
    justifyContent: "center",
    backgroundColor: mainColor
  },
  submitText: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#fff"
  },
  starScoreEvaluate: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: mainColor
  },
  starScoreExpend: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  QR: {
    flex: 1,
    marginTop: computeSize(13),
    marginBottom: computeSize(10),
    justifyContent: "center",
    alignItems: "center"
  },
  QRImg: {
    width: computeSize(100),
    height: computeSize(100)
  },
  itemBorder: {
    paddingLeft: computeSize(6),
    paddingRight: computeSize(6)
  },
  itemBorderIcon: {
    width: "100%"
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
  },

  notif: {
    height: computeSize(24),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8b84a"
  },
  notifText: {
    fontSize: computeSize(14),
    color: "#fff"
  }
};
