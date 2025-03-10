// src/utils/constants.js

// ******************************* GLOBAL OFFSET ******************************** //
export const GLOBAL_OFFSET = {
  x: 150, // Default width (right corner)
  y: 150, // Default height (bottom corner)
};

// ************************** DEFAULT SCALE & POSITION ************************** //
export const DEFAULT_SCALE = 1;
export const DEFAULT_POSITION = { x: 0, y: 0 };

export const PARTS_COLORS = {
  BRG: "#FFFFFF",
  // grey color
  BP: "#808080",
  FB: "#00FF00",
  KN: "#FF00FF",
  PP: "#FFFF00",
  PT: "#d08309",
  RG: "#FFFF00",
  ROD: "#e03535",
  RT: "#3063b7",
  SS: "#FF00FF",
  TT: "#FF0000",
  CV: "#000000",
  default: "#000000",
};

// *********************** ANNOTATIONS RELATED CONSTANTS ************************ //
export const ANNOTATION_DEFAULTS = {
  FONT_SIZE: 10.5, // Default font size
  NORMAL_ARROW_SIZE: 6, // Standard arrow size for longer dimensions
  SMALL_ARROW_SIZE: 3, // Smaller arrow size for short dimensions
  ARROW_WIDTH: 2.5, // 🔽 Reduced for a thinner arrowhead
  SMALL_ARROW_WIDTH: 1.5, // 🔽 Reduced for a thinner arrowhead
  TEXT_VERTICAL_OFFSET: 1.5, // Vertical offset for text positioning
  LINE_LENGTH_START: 5, // Length of starting vertical line
  LINE_LENGTH_END: -5, // Length of ending vertical line
  DEFAULT_COLOR: "black", // Default stroke color
  STROKE_WIDTH: 0.5, // Default stroke width
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
