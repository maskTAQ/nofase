const NAVIGATE_GO = "NAVIGATE_GO";
const action = {
  navigate: {
    go({ routeName, params = {} }) {
      return {
        type: NAVIGATE_GO,
        payload: {
          routeName,
          params
        }
      };
    }
  },
  NAVIGATE_GO
};
export default action;
