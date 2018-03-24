export default function CreateReduxField() {
  const keys = ["adminAddressList", "adminAddressInfo", "storeBusInfoByDate"];
  return {
    keys,
    action(key, status, data) {
      return {
        type: key,
        payload: {
          status,
          data
        }
      };
    },
    reducers() {
      const r = {};
      keys.forEach(item => {
        r[item] = (state = {}, action) => {
          const { type, payload } = action;
          if (type === item) {
            return { ...state, ...payload };
          }
          return state;
        };
      });
      return r;
    },
    store() {
      const r = {};
      keys.forEach(item => {
        r[item] = {
          status: "init",
          data: null
        };
      });
      return r;
    }
  };
}
Object.assign(CreateReduxField, CreateReduxField());
