// Generic Initial State
export const getInitialState = (geometry, annotations = []) => ({
  properties: {
    display: true,
    active: true,
    locked: false,
    color: "grey",
    opacity: 1.0,
  },
  geometry,
  annotations,
});

// Generic annotation
export const genericAnnotation = {
  id: "",
  type: "dimension",
  display: true,
  label: "",
  color: "black",
  value: null,
  scale: 1.0,
  position: { x1: 0, y1: 0, x2: 10, y2: 0 },
};

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

// function to create annotation
export const createAnnotation = (id, position, overrides = {}) => ({
  ...genericAnnotation, // Copy generic annotation
  id, // set unique id (IMPORTANT)
  position, // set position of annotation (IMPORTANT)
  ...overrides, // copy overrides
});
