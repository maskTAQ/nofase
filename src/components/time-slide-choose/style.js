export default {
  container: {
    marginTop: 40,
    backgroundColor: "#000"
  },
  sliderWrapper: {
    height: 32,
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
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#2fc2d9",
    zIndex: 9
  },
  bar: {
    position: "absolute",
    height: 4,
    zIndex: 1,
    backgroundColor: "#2fc2d9"
  },
  label: {
    flexDirection: "row"
  },
  labelItem: {
    flex: 1,
    fontSzie: 14,
    color: "#fff",
    fontWeigth: "bold"
  }
};
