import { Platform } from "react-native";
const color = "#1b9cee";

export default {
  container: {
    flex: 1,
    backgroundColor: "#a9daf6"
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  contentBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  header: {
    position: "relative"
  },

  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  headerWrapper: {
    paddingTop: 44,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 40
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  portraitWrapper: {
    borderRadius: 60,
    marginRight: 16,
    overflow: "hidden"
  },
  closeWrapper: {
    alignItems: "flex-end"
  },
  editIconButton: {
    marginLeft: 8,
    justifyContent: "center"
  },
  headerContentRight: {
    flex: 1,
    justifyContent: "flex-end"
  },
  usernameWrapper: {
    flexDirection: "row",
    height: 26,
    alignItems: "center"
  },
  username: {
    fontSize: 14,
    color: "#fff"
  },
  userIdWrapper: {
    flexDirection: "row",
    height: 20,
    alignItems: "center"
  },
  userId: {
    fontSize: 14,
    color: "#fff"
  },
  lvWrapper: {
    flex: 1,
    alignItems: "flex-start",
    position: "relative"
  },
  lvImg: {
    marginLeft: 4,
    width: 40,
    height: "100%"
  },
  lvLabel: {
    position: "absolute",
    top: Platform.select({ ios: 8, android: 7 }),
    left: 26,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff"
  },
  list: {
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    backgroundColor: "#46b6ec"
  },
  item: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: 0.4,
    borderColor: "#fff"
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0
  },
  itemLabel: {
    fontSize: 14,
    color: "#fff"
  },
  accountContianer: {
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  accountTitleWrapper: {
    height: 25,
    justifyContent: "center"
  },
  accountTitle: {
    fontSize: 14,
    color
  },
  accountItem: {
    height: 25,
    flexDirection: "row",
    alignItems: "center"
    //backgroundColor:'red'
  },
  accountItemRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  itemButtonText: {
    color: "#f8b84a"
  },
  accountItemText: {
    marginRight: 10,
    color
  },
  button: {
    marginTop: 12,
    marginBottom: 41,
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4cb6ed"
  },
  buttonText: {
    color: "#fff"
  },
  border: {
    height: 1,
    backgroundColor: "#a2d8f5"
  },

  //modal
  modalContianer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,

    borderColor: "#157ffb",
    backgroundColor: "#fff"
  },
  modalItemWrapper: {
    height: 36,
    alignItems: "center",

    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#1681fb"
  },
  modalItemInput: {
    flex: 1,
    height: "100%",
    paddingLeft: 15,
    color: "#1b9cfe"
  },
  codeButotn: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b9cfe"
  },
  codeButotnText: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  sumbit: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#1a9af7"
  },
  sumbitText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1b9cf0"
  },
  modalSubTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ccc",
    textAlign: "center"
  },
  modalInputWrapper: {
    height: 60,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  modalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1b9cf0",
    borderRadius: 6,
    color: "#333",
    paddingLeft: 10
  },
  modalButtonGroupWrapper: {
    height: 76,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20
  },
  modalButtonGroup: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#1b9cf0",
    borderRadius: 12,
    overflow: "hidden"
  },
  modalCancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalCompleteButton: {
    flex: 3,
    backgroundColor: "#1b9cf0",
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold"
  }
};
