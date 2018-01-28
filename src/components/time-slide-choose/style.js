export default {
  container: {
    backgroundColor: "#1b9ce4",
    padding: 10,
    paddingTop: 0
  },
  sliderWrapper: {
    height: 22,
    justifyContent: "center",
    position: "relative"
  },
  pathway: {
    width: "100%",
    height: 2,
    backgroundColor: "#a8ebf1"
  },
  circle: {
    position: "absolute",
    top: 0,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#2fc2d9",
    zIndex: 9
  },
  bar: {
    position: "absolute",
    height: 8,
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 1,
    backgroundColor: "#2fc2d9"
  },
  label: {
    flexDirection: "row"
  },
  labelItem: {
    flex: 1,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold"
  }
};
