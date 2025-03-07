// src/utils/constants.js
// ******************************* GLOBAL OFFSET ******************************** //
export const GLOBAL_OFFSET = {
  x: 1000, // Default width (right corner)
  y: 350, // Default height (bottom corner)
};

// *********************** ANNOTATIONS RELATED CONSTANTS ************************ //
export const ANNOTATION_DEFAULTS = {
  FONT_SIZE: 10.5, // Default font size
  NORMAL_ARROW_SIZE: 6, // Standard arrow size for longer dimensions
  SMALL_ARROW_SIZE: 3, // Smaller arrow size for short dimensions
  ARROW_WIDTH: 2.5, // 🔽 Reduced for a thinner arrowhead
  SMALL_ARROW_WIDTH: 1.5, // 🔽 Reduced for a thinner arrowhead
  TEXT_VERTICAL_OFFSET: 1.5, // Vertical offset for text positioning
  LINE_LENGTH_START: 10, // Length of starting vertical line
  LINE_LENGTH_END: -10, // Length of ending vertical line
  DEFAULT_COLOR: "black", // Default stroke color
};

// Initial annotation state
export const genericAnnotation = {
  id: "",
  type: "dimension",
  display: true,
  label: "",
  color: "black",
  value: null,
  scale: 1.0,
  weight: "light",
  startX: 0,
  startY: 0,
  direction: "horizontal", // or "vertical"
};
