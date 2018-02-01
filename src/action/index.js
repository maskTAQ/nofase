const NAVIGATE_GO = "NAVIGATE_GO";
const NAVIGATE_BACK = "NAVIGATE_BACK";
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
    },
    back({ params = {} } = {}) {
      return {
        type: NAVIGATE_BACK,
        payload: {
          params
        }
      };
    }
  },
  NAVIGATE_GO,
  NAVIGATE_BACK
};
export default action;
