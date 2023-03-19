// -----JS CODE-----
// -----JS CODE-----
// @input Asset.Texture tex
// @input Component.Image image
// @input Component.MaterialMeshVisual recipient
//@input Component.ScriptComponent stateScript

// @input int[] sampleSize
// @input float[] x
// @input float[] y


if (script.stateScript.api.getCurrentStep() != 0){
    return;
}

var channels = 4;
var procTex = ProceduralTextureProvider.createFromTexture(script.tex);

function percentToPixel(p, l) {
  return Math.floor(p * l);
}


function doSampling() {
  var r = 0;
  var g = 0;
  var b = 0;
  var n = 0;
  for (var i = 0; i < script.sampleSize.length; i++) {
    var x = percentToPixel(script.x[i], script.tex.getWidth());
    var y = percentToPixel(script.y[i], script.tex.getHeight());
    var data = new Uint8Array(
      script.sampleSize[i] * script.sampleSize[i] * channels
    );
    procTex.control.getPixels(
      x,
      y,
      script.sampleSize[i],
      script.sampleSize[i],
      data
    );
    for (var j = 0; j < data.length; j += 4) {
      r += data[j];
      g += data[j + 1];
      b += data[j + 2];
      n += 1;
    }
  }
  var color = new vec4(r / n / 255, g / n / 255, b / n / 255, 1);
//   print("detected" color)
  script.image.mainPass.baseColor = color;
//  script.recipient.mainPass.baseColor = color;
    script.stateScript.api.setDetectedSkinTone(color);
}

if (
  script.sampleSize.length > 0 &&
  script.sampleSize.length === script.x.length &&
  script.sampleSize.length === script.y.length
) {
  doSampling();
} else {
  print(
    "Make sure you have at least one sampling area set and that you have specified sample size, x, and y"
  );
}