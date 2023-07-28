const initialState = {
    region: null,
    nightMode: false,
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_REGION':
        return {
          ...state,
          region: action.payload,
        };
      case 'TOGGLE_NIGHT_MODE':
        return {
          ...state,
          nightMode: !state.nightMode,
        };
      default:
        return state;
    }
  };
  