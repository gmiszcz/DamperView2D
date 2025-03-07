// Generic Reducer
export const genericReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, properties: { ...state.properties, ...action.payload } };
    case "SET_GEOMETRY":
      return { ...state, geometry: { ...state.geometry, ...action.payload } };
    case "ADD_ANNOTATION":
      return { ...state, annotations: [action.payload, ...state.annotations] };
    case "DELETE_ANNOTATION":
      return { ...state, annotations: state.annotations.filter((ann) => ann.id !== action.id) };
    case "UPDATE_ANNOTATION_BY_ID":
      return {
        ...state,
        annotations: state.annotations.map((ann) => (ann.id === action.id ? { ...ann, ...action.payload } : ann)),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
