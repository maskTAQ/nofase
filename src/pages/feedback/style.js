import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default {
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  header: {
    padding: 15,
    backgroundColor: "#1b9de6"
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "#fff"
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  list: {
    backgroundColor: "#fff"
  },
  listTitleWrapper: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999"
  },
  feedback: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  contact: {
    backgroundColor: "#fff"
  },
  contactItem: {
    padding: 15,
    flexDirection: "row"
  },
  contactItemLabel: {
    flex: 1
  },
  contactItemLabelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999"
  },
  call: {
    flexDirection: "row",
    alignItems: "center"
  },
  callText: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#039DEC"
  },

  //modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalContent: {
    padding: 10,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "#fff",
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    backgroundColor: "#fff"
  },
  modalHeader: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#868686"
  },
  modalLine: {
    height: 1,
    backgroundColor: "#aaa"
  },
  modalDetailsWrapper: {
    height: height - 182
    //padding: 10,
    //paddingTop: 15
  },
  modalDetails: {
    lineHeight: 20,
    color: "#999"
  },
  modalImg: {
    width: "100%",
    height: width * 0.4,
    marginTop: 10,
    marginBottom: 10
  }
};
