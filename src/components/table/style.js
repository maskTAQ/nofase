const bmTextNormal = "#000";
export default {
  container: {
    backgroundColor: "#fff",
    margin: 6,
    borderTopWidth: 1.5,
    borderColor: "#1a97df"
  },
  headerContainer: {
    height: 35,
    flexDirection: "row",
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "#1a97df"
  },
  th: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 4,
    borderRightWidth: 1.5,
    borderColor: "#1a97df"
  },
  thText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a97df"
  },
  tbody: {},
  row: {
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: "#1a97df"
  },
  td: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 4,
    borderRightWidth: 1.5,
    borderColor: "#1a97df"
  },
  tdText: {
    fontSize: 14,
    color: bmTextNormal
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
