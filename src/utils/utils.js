export const changeBrightness = (hex, percent) => {
  // Remove the '#' if present
  hex = hex.replace(/^#/, "");

  // Ensure we have a 6-character hex code (you can extend this for short format like '#123')
  if (hex.length !== 6) {
    throw new Error("Please provide a 6-digit hex color, e.g., '#123456'");
  }

  // Convert hex to a decimal number
  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  // Adjust each color component by the given percentage
  // For positive percent, the color is lightened; for negative percent, it is darkened.
  r = Math.min(255, Math.max(0, r + Math.round(r * percent)));
  g = Math.min(255, Math.max(0, g + Math.round(g * percent)));
  b = Math.min(255, Math.max(0, b + Math.round(b * percent)));

  // Convert the adjusted components back to a hex string
  const newHex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

  return newHex;
};
