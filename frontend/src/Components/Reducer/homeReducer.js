export const INIITIAL_STATE = {
  data: [],
  foodNumber: {},
  calculateResult: {
    carbonhydrate: 0,
    protein: 0,
    fat: 0,
    calory: 0
  }
};

export const homeReducer = (state, action) => { // action = {type, payload}
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload }; // ...state -> keep last state
    case 'UPDATE_FOODNUMBER':
      return { ...state, foodNumber: action.payload };
    case 'UPDATE_CALCULATERESULT':
      return { ...state, calculateResult: action.payload };
  }
};
