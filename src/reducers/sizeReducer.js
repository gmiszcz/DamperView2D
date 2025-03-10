
export const sizeReducer = (state, action) => {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, width: action.payload.width, height: action.payload.height };
    case "SET_SCALE":
      return { ...state, groupScale: action.payload.groupScale };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};