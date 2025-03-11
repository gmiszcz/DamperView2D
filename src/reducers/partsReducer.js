// Generic Reducer
export const partsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, properties: { ...state.properties, ...action.payload } };
    case "SET_GEOMETRY":
      return { ...state, geometry: { ...state.geometry, ...action.payload } };
    case "SET_CENTER_POSITION":
      return { ...state, calculatedValues: { ...state.calculatedValues, centerPosition: action.payload } };
    case "ADD_ANNOTATION":
      return { ...state, annotations: [action.payload, ...state.annotations] };
    case "DELETE_ANNOTATION":
      return { ...state, annotations: state.annotations.filter((ann) => ann.id !== action.id) };
    case "UPDATE_ANNOTATION_BY_ID":
      return {
        ...state,
        annotations: state.annotations.map((ann) => (ann.id === action.id ? { ...ann, ...action.payload } : ann)),
      };
    case "TOGGLE_ANNOTATIONS":
      return {
        ...state,
        properties: {
          ...state.properties,
          annotationsVisible: !state.properties.annotationsVisible,
        },
        annotations: state.annotations.map((ann) => ({
          ...ann,
          display: !state.properties.annotationsVisible,
        })),
      };
    case "UPDATE_OR_CREATE_ANNOTATION":
      const existingIndex = state.annotations.findIndex((ann) => ann.id === action.payload.id);

      if (existingIndex !== -1) {
        // If exists → update
        return {
          ...state,
          annotations: state.annotations.map((ann, index) => (index === existingIndex ? { ...ann, ...action.payload } : ann)),
        };
      } else {
        // If does not exists → create new
        return {
          ...state,
          annotations: [...state.annotations, action.payload],
        };
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
