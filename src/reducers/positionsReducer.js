export const rodPositionReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROD_POSITION":
      // Calculate Rod position based on the provided value by the user or predefined position "DL", "EL" or "CL" from Positions provider
      return {
        ...state,
        geometry: {
          ...state.geometry,
          Rod_CurrentPosition:
            action.payload.rodPosition +
            state.geometry.Strut_Position_Offset -
            action.payload.rodLength,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
