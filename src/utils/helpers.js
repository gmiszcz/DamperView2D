// src/utils/helpers.js
import { genericAnnotation, DEFAULT_SCALE, DEFAULT_POSITION } from "./constants";

// ********************** HELPER FUNCTIONS FOR ANNOTATIONS ********************** //
/**
 * Creates an annotation relative to the global offset.
 * @param {string} id - Unique identifier
 * @param {number} startX - Start position X relative to the offset
 * @param {number} startY - Start position Y relative to the offset
 * @param {string} direction - "horizontal" or "vertical"
 * @param {number} value - The measurement value
 * @param {object} overrides - Additional properties
 * @returns {object} - New annotation object
 */
export const createAnnotation = (id, startX, startY, direction, value, overrides = {}) => ({
  ...genericAnnotation,
  id,
  startX: startX, // Adjust for right-to-left system
  startY: startY,
  direction,
  value,
  ...overrides,
});

// ******************************* INITIAL STATE ******************************** //
export const getInitialState = (geometry, annotations = []) => ({
  properties: {
    display: true,
    active: true,
    locked: false,
    color: "#5a5a5a",
    opacity: 1.0,
    annotationsVisible: true,
  },
  geometry,
  annotations,
});

// ******************************* ZOOM HANDLING ******************************** //
/**
 * Calculates the new scale and position for zooming.
 * @param {Event} e - The wheel event from Konva
 * @param {Object} stage - The Konva stage reference
 * @param {number} scaleBy - The zoom factor
 * @returns {object} - New scale and position
 */
export const calculateNewScale = (e, stage, scaleBy) => {
  e.evt.preventDefault();
  const oldScale = stage.scaleX();
  const pointer = stage.getPointerPosition();

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

  return {
    scale: newScale,
    newPosition: {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    },
  };
};

// ************************** TOGGLE ANNOTATION HANDLING ************************* //
export const handleToggleAnnotations = (part) => {
  part.dispatch({
    type: "TOGGLE_ANNOTATIONS",
  });
};
