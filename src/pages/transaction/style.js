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
    height: 105,
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
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  balanceValue: {
    textAlign: "center",
    fontSize: 16,
    color: "#0399e7"
  },
  balanceLabel: {
    textAlign: "center",
    width: "100%",
    lineHeight: 45,
    fontSize: 30,
    color: "#0399e7"
  },
  consume: {
    height: 60,
    backgroundColor: "#fff",
    margin: 10,
    padding: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  consumeLabel: {
    color: "#0399e7",
    fontSize: 20
  },
  consumeValue: {
    color: "#0399e7",
    fontSize: 20
  },
  tabItemBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#0399e7"
  },
  tabItemActiveBorder: {
    position: "absolute",
    width: "50%",
    height: 3,
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
    padding: 10,
    paddingBottom: 0
  },
  item: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 80,
    padding: 10,
    borderRadius: 10
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
