import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff"
  },

  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(3,159,238)"
  },
  bgImg: {
    width: "100%",
    height: computeSize(105),
    marginTop: -1,
    transform: [{ rotate: "180deg" }]
  },
  content: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  BalanceWrapper: {
    height: computeSize(100),
    justifyContent: "center",
    alignItems: "center"
  },
  balanceValue: {
    textAlign: "center",
    fontSize: computeSize(16),
    color: "#0399e7"
  },
  balanceLabel: {
    textAlign: "center",
    width: "100%",
    lineHeight: computeSize(45),
    fontSize: computeSize(30),
    color: "#0399e7"
  },
  consume: {
    height: computeSize(60),
    backgroundColor: "#fff",
    margin: computeSize(10),
    padding: computeSize(40),
    borderRadius: computeSize(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  consumeLabel: {
    color: "#0399e7",
    fontSize: computeSize(20)
  },
  consumeValue: {
    color: "#0399e7",
    fontSize: computeSize(20)
  },
  tabItemBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#0399e7"
  },
  tabItemActiveBorder: {
    position: "absolute",
    width: "50%",
    height: computeSize(3),
    backgroundColor: "#0a9ae4",
    bottom: 0
  },
  bjImg: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  list: {
    flex: 1,
    padding: computeSize(10),
    paddingBottom: 0
  },
  item: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: computeSize(80),
    padding: computeSize(10),
    borderRadius: computeSize(10)
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
