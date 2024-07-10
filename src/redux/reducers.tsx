const initialState = {
  loads: []
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
  case 'SET_LOADS':
    return {
      ...state,
      loads: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;
