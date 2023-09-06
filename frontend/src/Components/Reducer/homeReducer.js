export const INIITIAL_STATE = {
  page: 0,
  data: []
};

export const homeReducer = (state, action) => { // action = {type, payload}
  switch (action.type) {
    case 'INCREASE_PAGE':
      return { ...state, page: state.page + action.payload }; // ...state -> keep last state
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
  }
};
