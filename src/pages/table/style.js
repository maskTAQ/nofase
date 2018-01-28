import { bmLine, bmBG, bmTextNormal } from "hx/colors";
export default {
  container: {
    flex: 1,
    backgroundColor: bmBG
  },
  headerContainer: {
    height: 35,
    flexDirection: "row",
    backgroundColor: "#262a35"
  },
  th: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 4
  },
  thText: {
    fontSize: 14,
    color: "#848484"
  },
  tbody: {
    flex: 1
  },
  row: {
    height: 50,
    flexDirection: "row"
  },
  td: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 4
  },
  tdText: {
    fontSize: 14,
    color: bmTextNormal
  },
  border: {
    height: 1,
    borderTopWidth: 0.5,
    borderColor: bmLine
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
