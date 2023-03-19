// -----JS CODE-----

//@ui {"widget":"separator"}
//@input Component.Text alphaRecipient
//@input Component.MaterialMeshVisual alphaSource

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

if (script.alphaSource) {
    const baseColor = script.alphaSource.mainPass['baseColor'];
    const hexString = rgbToHex(baseColor.r, baseColor.g, baseColor.b);
    script.alphaRecipient.text = hexString;
}


