export const internetConnection = (
  state = { userConnected: false },
  action: any
) => {
  switch (action.type) {
    case "userConnected":
      return { ...state, userConnected: true };
    case "userConnected":
      return { ...state, userConnected: false };

    default:
      return state;
  }
};
