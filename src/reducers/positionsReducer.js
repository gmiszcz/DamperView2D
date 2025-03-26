export const rodPositionReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROD_POSITION_BY_BUTTON":
      const newRodPositionAfterButtonClicked =
        calculate_rod_position_based_on_pressed_position_button(
          state,
          action.payload.pressedButtonName,
          action.payload.rodLength
        );
      return {
        ...state,
        geometry: {
          ...state.geometry,
          Rod_CurrentPosition: newRodPositionAfterButtonClicked,
        },
      };
    case "SET_ROD_POSITION_BY_MANUAL_INPUT":
      // TBC
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function calculate_rod_position_based_on_pressed_position_button(
  state,
  pressedButtonName,
  rodLength
) {
  // This function calculates the rod geometry start point. It is also basis for the rest components like Piston, Piston Post and Load Application Point
  if (pressedButtonName.includes("DL")) {
    // console.log("current Rod Length", rodLength);
    return state.geometry.DL + state.geometry.Strut_Position_Offset - rodLength;
  } else if (pressedButtonName.includes("EL")) {
    return state.geometry.EL + state.geometry.Strut_Position_Offset - rodLength;
  } else {
    return state.geometry.CL + state.geometry.Strut_Position_Offset - rodLength;
  }
}
