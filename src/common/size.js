import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const computeSize = s => {
  return Platform.OS === "ios" ? Math.round(s * width / 400) : s;
};

export default computeSize;
