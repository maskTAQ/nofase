import { Platform } from "react-native";
import { computeSize } from "src/common";
const color = "#1b9cee";

export default {
  container: {
    flex: 1,
    backgroundColor: "#a9daf6"
  },
  content: {
    flex: 1,
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10)
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
    paddingTop: computeSize(44),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    paddingBottom: computeSize(40)
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  portraitWrapper: {
    borderRadius: computeSize(60),
    marginRight: computeSize(16),
    overflow: "hidden"
  },
  closeWrapper: {
    alignItems: "flex-end"
  },
  editIconButton: {
    marginLeft: computeSize(8),
    justifyContent: "center"
  },
  headerContentRight: {
    flex: 1,
    justifyContent: "flex-end"
  },
  usernameWrapper: {
    flexDirection: "row",
    height: computeSize(26),
    alignItems: "center"
  },
  username: {
    fontSize: computeSize(14),
    color: "#fff"
  },
  userIdWrapper: {
    flexDirection: "row",
    height: computeSize(20),
    alignItems: "center"
  },
  userId: {
    fontSize: computeSize(14),
    color: "#fff"
  },
  lvWrapper: {
    flex: 1,
    alignItems: "flex-start",
    position: "relative"
  },
  lvImg: {
    marginLeft: computeSize(4),
    width: computeSize(40),
    height: "100%"
  },
  lvLabel: {
    position: "absolute",
    top: Platform.select({ ios: computeSize(8), android: 7 }),
    left: computeSize(26),
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#fff"
  },
  list: {
    marginTop: computeSize(24),
    marginBottom: computeSize(10),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    borderRadius: computeSize(12),
    backgroundColor: "#46b6ec"
  },
  item: {
    height: computeSize(40),
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
    fontSize: computeSize(14),
    color: "#fff"
  },
  accountContianer: {
    marginTop: computeSize(10),
    padding: computeSize(10),
    marginBottom: computeSize(10),
    borderRadius: computeSize(10),
    backgroundColor: "#fff"
  },
  accountTitleWrapper: {
    height: computeSize(25),
    justifyContent: "center"
  },
  accountTitle: {
    fontSize: computeSize(14),
    color
  },
  accountItem: {
    height: computeSize(25),
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
    fontSize: computeSize(12),
    color: "#f8b84a"
  },
  accountItemText: {
    fontSize: computeSize(12),
    marginRight: computeSize(10),
    color
  },
  button: {
    marginTop: computeSize(12),
    marginBottom: computeSize(41),
    width: "100%",
    height: computeSize(40),
    borderRadius: computeSize(8),
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
    borderRadius: computeSize(8),
    padding: computeSize(10),

    borderColor: "#157ffb",
    backgroundColor: "#fff"
  },
  modalItemWrapper: {
    height: computeSize(36),
    alignItems: "center",

    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#1681fb"
  },
  modalItemInput: {
    flex: 1,
    height: "100%",
    paddingLeft: computeSize(15),
    color: "#1b9cfe"
  },
  codeButotn: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b9cfe"
  },
  codeButotnText: {
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15),
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  sumbit: {
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    marginTop: computeSize(30),
    borderRadius: computeSize(8),
    backgroundColor: "#1a9af7"
  },
  sumbitText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },

  modalTitle: {
    fontSize: computeSize(18),
    fontWeight: "bold",
    textAlign: "center",
    color: "#1b9cf0"
  },
  modalSubTitle: {
    fontSize: computeSize(14),
    lineHeight: computeSize(20),
    color: "#ccc",
    textAlign: "center"
  },
  modalInputWrapper: {
    height: computeSize(60),
    padding: computeSize(10),
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15)
  },
  modalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1b9cf0",
    borderRadius: computeSize(6),
    color: "#333",
    paddingLeft: computeSize(10)
  },
  modalButtonGroupWrapper: {
    height: computeSize(76),
    paddingLeft: computeSize(20),
    paddingRight: computeSize(20),
    paddingTop: computeSize(10),
    paddingBottom: computeSize(20)
  },
  modalButtonGroup: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#1b9cf0",
    borderRadius: computeSize(12),
    overflow: "hidden"
  },
  modalCancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalCompleteButton: {
    flex: computeSize(3),
    backgroundColor: "#1b9cf0",
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonText: {
    fontSize: computeSize(16),
    fontWeight: "bold"
  }
};
