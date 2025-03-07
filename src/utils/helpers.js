// src/utils/helpers.js
import { genericAnnotation } from "./constants";

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
    color: "grey",
    opacity: 1.0,
  },
  geometry,
  annotations,
});
