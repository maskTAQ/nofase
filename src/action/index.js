const NAVIGATE_GO = "NAVIGATE_GO";
const NAVIGATE_BACK = "NAVIGATE_BACK";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
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
  NAVIGATE_BACK,
  login(payload) {
    return {
      type: LOGIN,
      payload
    };
  },
  LOGIN,
  logout(payload) {
    return {
      type: LOGOUT,
      payload
    };
  },
  LOGOUT
};
export default action;
