
const DEFAULT_STATE = {

};

export const signInReducers = (state = DEFAULT_STATE, action) => {
  console.log('SIGN IN REDUCER', action);
  switch (action.type) {
    default:
      return state;
  }
};

export default signInReducers;
