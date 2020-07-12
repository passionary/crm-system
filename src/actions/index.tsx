export const authenticate = (token: string) => {
    return {
      type: "auth",
      payload: token,
    };
  };
export const setToast = (message:string) => {
    return (dispatch: any) => {
      dispatch({
        type: 'set-toast',
        payload: message
      })
      M.toast({html: message})
    }  
  }