const { hexToRgb } = require("../index");

/**
 * Unit tests for the hexToRgb function.
 *
 * @group unit
 */
describe("hexToRgb function", () => {
  test("converts #FFFFFF to rgb(255,255,255)", () => {
    expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
  });

  test("converts #000000 to rgb(0,0,0)", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  test("converts #FF5733 correctly", () => {
    expect(hexToRgb("#FF5733")).toEqual({ r: 255, g: 87, b: 51 });
  });

  test("throws error on invalid hex", () => {
    expect(() => hexToRgb("ZZZZZZ")).toThrow("Invalid hex code");
  });
});
