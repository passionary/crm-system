export const authenticate = (user: any) => {
  return {
    type: "auth",
    payload: user.api_token,
  };
};
export const setToast = (message: string) => {
  return (dispatch: any) => {
    dispatch({
      type: "set-toast",
      payload: message,
    });
    M.toast({ html: message });
  };
};
export const initUser = (user: any) => {
  return {
    type: "init-user",
    payload: user,
  };
};
