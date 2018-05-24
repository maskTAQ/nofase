const bmTextNormal = "#000";
export default {
  container: {
    backgroundColor: "#fff",
    margin: 6,
    borderTopWidth: 1.5,
    borderColor: "#efeded"
  },
  headerContainer: {
    height: 35,
    flexDirection: "row",
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "#efeded"
  },
  th: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 1.5,
    borderRightWidth: 1.5,

    borderColor: "#efeded"
  },
  thText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#efeded"
  },
  tbody: {},
  row: {
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: "#efeded"
  },
  td: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 1.5,
    borderRightWidth: 1.5,
    borderColor: "#efeded"
  },
  tdText: {
    fontSize: 10,
    color: "#6f6e6e"
  },
  border: {
    height: 1
  },
  noData: {
    justifyContent: "center",
    alignItems: "center"
  },
  noDataText: {
    fontSize: 14,
    lineHeight: 30,
    color: bmTextNormal
  },
  loading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 30,
    color: bmTextNormal
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 30,
    color: bmTextNormal
  }
};
