import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");
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
    borderWidth: 1,
    borderColor: "#666",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#fff"
  },
  modalHeader: {
    height: 40,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#666"
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666"
  },
  modalDetailsWrapper: {
    height: height * 0.8,
    padding: 10,
    paddingTop: 15
  },
  modalDetails: {
    color: "#999"
  }
};
