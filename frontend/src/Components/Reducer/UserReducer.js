export const USER_INITIAL_STATE = {
  login: false,
  error: false,
  customizedFoodCount: 0
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return { ...state, login: action.payload };
    case 'UPDATE_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_CUSTOMIZEDFOODCOUNT':
      return { ...state, customizedFoodCount: action.payload };
  }
};
