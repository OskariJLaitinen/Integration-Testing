const express = require("express");
const app = express();

app.use(express.json());

/**
 * Convert a hex color string into an RGB object.
 *
 * @param {string} hex - The hex color code (with or without leading #).
 * @returns {{r: number, g: number, b: number}} The RGB representation.
 * @throws {Error} If the hex code is invalid.
 *
 * @example
 * hexToRgb("#FFFFFF"); // { r: 255, g: 255, b: 255 }
 */
function hexToRgb(hex) {
  const cleaned = hex.replace("#", "");
  if (!/^([0-9A-Fa-f]{6})$/.test(cleaned)) {
    throw new Error("Invalid hex code");
  }
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * GET /hex-to-rgb
 * Converts a hex color (query parameter) into RGB format.
 *
 * @route GET /hex-to-rgb
 * @queryparam {string} hex - The hex color code.
 * @returns {Object} JSON object with the original hex and RGB values.
 * @returns {string} [hex] - The hex code.
 * @returns {{r: number, g: number, b: number}} [rgb] - The RGB values.
 * @returns {string} [error] - Error message if invalid input.
 */
app.get("/hex-to-rgb", (req, res) => {
  try {
    const { hex } = req.query;
    if (!hex) {
      return res.status(400).json({ error: "Missing hex parameter" });
    }
    const rgb = hexToRgb(hex);
    res.json({ hex, rgb });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { app, hexToRgb };

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
