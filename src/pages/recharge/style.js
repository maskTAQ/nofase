import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#f9f9f9"
  },
  paddingContainer: {
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15)
  },
  rechargeLabel: {
    lineHeight: computeSize(70),
    color: "#333"
  },
  inputContainer: {
    flexDirection: "row",
    height: computeSize(60),
    paddingTop: computeSize(10),
    paddingBottom: computeSize(10),
    borderColor: "#1e89e4",
    borderWidth: 1,
    borderRadius: computeSize(5)
  },
  input: {
    width: "80%",
    borderRightWidth: 1,
    borderColor: "#1e89e4"
  },
  inputLabelWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  itemBorder: {
    height: 1,
    backgroundColor: "#1a98e0"
  },
  inputLabel: {
    fontSize: computeSize(16),
    color: "#039DEB",
    fontWeight: "600"
  },
  balanceWrapper: {
    flexDirection: "row-reverse",
    height: computeSize(70),
    alignItems: "center"
  },
  checkbox: {
    marginTop: computeSize(20),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#fff"
  },
  itemLabelWraper: {
    flex: 1,
    flexDirection: "row",
    height: computeSize(60),
    alignItems: "center"
  },
  itemIcon: {
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10)
  },
  itemTitle: {
    color: "#333333",
    fontSize: computeSize(12),
    lineHeight: computeSize(20)
  },
  itemSubtitle: {
    fontSize: computeSize(12),
    color: "#999999"
  },
  //充值成功
  wrapper: {
    marginTop: computeSize(6),
    paddingTop: computeSize(30),
    alignItems: "center",
    backgroundColor: "#fff"
  },
  notTitlewrapper: {
    height: computeSize(60),
    justifyContent: "center",
    alignItems: "center"
  },
  itemWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemLabel: {
    color: "#333333",
    lineHeight: computeSize(35)
  },
  itemValue: {
    color: "#333333",
    lineHeight: computeSize(35)
  },
  rechargeButton: {
    marginTop: computeSize(15),
    height: computeSize(40),
    borderRadius: computeSize(6),
    backgroundColor: "#1b9de6",
    justifyContent: "center",
    alignItems: "center"
  }
};
